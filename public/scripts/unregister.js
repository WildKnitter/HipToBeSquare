"use strict";
//This script contains code to unregister a team member and post it to a JSON file.
//Author:  Pam Belknap

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

    $("#btnUnRegisterForTeam").on("click", unRegisterForTeam);
    $("#btnCancel").on("click", cancelUpdates);
}); // end of Ready Load

//when Unregister button is clicked:
function unRegisterForTeam() {
    alert("Are you sure you wish to delete this member?");
    $.ajax({
            url: "/api/teams/" + $("#teamid").val() + "/members/" + $("#memberid").val(),
            type: "DELETE",
            data: $("#unRegisterForm").serialize()
        }) // end of AJAX
        .done(function(data, status, xhr) {
            alert("Team Member Deleted!");
            location.href = "teamdetails.html?teamid=" + $("#teamid").val();
        })
        .fail(function() {
            alert("FAIL: Team Member NOT Deleted!");
        });
    return false;
} // end of unRegisterForteam function

//when CANCEL button is clicked:
function cancelUpdates() {
    location.reload();
    location.href = "teamdetails.html?teamid=" + $("#teamid").val();
}; // end of Cancel Function