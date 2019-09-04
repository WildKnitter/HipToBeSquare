"use strict";
//Unregister page script for the Hip to be Square Capstone Project.
//This script contains code to unregister a team member and post it to a JSON file.
//Author:  Pamela Belknap

/*
Key for understanding the fields in the JSON file:

/api/leagues
/api/teams
/api/teams/:id
/api/teams/byleague/:id
/api/teams/:teamid/members/:memberid
/api/teams/:id/members
*/

//Ready Load
// decodeURI used to decode the url string to get the team member information.
$(function() {
    $("#deleteCancelChoice").hide();
    let urlParams = new URLSearchParams(location.search);
    let teamid = urlParams.get("teamid");
    let memberid = urlParams.get("memberid");
    let membername = urlParams.get("membername");
    let email = urlParams.get("email");
    let contactname = urlParams.get("contactname");
    let age = urlParams.get("age");
    let gender = urlParams.get("gender");
    let phone = urlParams.get("phone");
    $("#teamid").val(teamid);
    $("#memberid").val(memberid);
    $("#membername").val(membername);
    $("#email").val(email);
    $("#contactname").val(contactname);
    $("#age").val(age);
    $("#gender").val(gender);
    $("#phone").val(phone);

    // Brings up choice to delete the member.
    $("#btnUnRegisterForTeam").on("click", (function() {
        $("#deleteCancelChoice").show();
        $("#btnYesDelete").on("click", unRegisterForTeam);
        $("#btnCancelAction").on("click", cancelUpdates);
    }));
    $("#btnCancel").on("click", cancelUpdates);
}); // end of Ready Load

//when Unregister button is clicked:
function unRegisterForTeam() {
    $.ajax({
            url: "/api/teams/" + $("#teamid").val() + "/members/" + $("#memberid").val(),
            type: "DELETE",
            data: $("#unRegisterForm").serialize()
        }) // end of AJAX
        .done(function(data, status, xhr) {
            location.href = "teamdetails.html?teamid=" + $("#teamid").val();
        })
        .fail(function() {
            $("#msgDivDelete").html("ERROR: Team was not deleted!");
        });
    return false;
} // end of unRegisterForTeam function

//when CANCEL button is clicked:
function cancelUpdates() {
    location.href = "teamdetails.html?teamid=" + $("#teamid").val();
}; // end of Cancel Function