"use strict";
//detailsmemberedit page script for the Hip to be Square Capstone Project.
//This script contains code to edit a team member and post it to a JSON file.
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
    $("#deleteCancelChoice").hide();

    //Buttons
    $("#btnEditMember").on("click", editTeamMember);
    $("#btnCancel").on("click", cancelUpdates);
    $("#btnUnRegisterForTeam").on("click", (function() {
        $("#deleteCancelChoice").show();
        $("#btnYesDeleteMember").on("click", unRegisterForTeam);
        $("#btnCancelAction").on("click", cancelAction);
    }));
}); // end of Ready Load

//when Update button is clicked:
function editTeamMember() {
    let errMsgs = validateForm();
    $("#msgDiv").empty();
    if (errMsgs.length > 0) {
        let msg = "";
        for (let i = 0; i < errMsgs.length; i++) {
            msg = msg + errMsgs[i] + "<br>"
        }
        $("#msgDiv").html(msg);
        return false;
    }
    // EDIT A Member
    $.ajax({
            url: "/api/teams/" + $("#teamid").val() + "/members", // your api url
            type: "PUT", // method is any HTTP method
            data: $("#memberDetailsFormEdit").serialize(), // id of your form
        }) // end of AJAX
        .done(function() {
            location.href = "teamdetails.html?teamid=" + $("#teamid").val();
        }) // end of done function
        .fail(function() {
            $("#msgDivEdit").html("ERROR: Team was not updated!");
            location.href = "teamdetails.html?teamid=" + $("#teamid").val();
        }); // end of fail function
    return false;
} // end of editTeamMember function

//when Unregister button is clicked:
function unRegisterForTeam() {
    $.ajax({
            url: "/api/teams/" + $("#teamid").val() + "/members/" + $("#memberid").val(),
            type: "DELETE",
            data: $("#memberDetailsFormEdit").serialize()
        }) // end of AJAX
        .done(function(data, status, xhr) {
            location.href = "teamdetails.html?teamid=" + $("#teamid").val();
        })
        .fail(function() {
            $("#msgDivDelete").html("ERROR: Team was not deleted!");
        });
    return false;
} // end of unRegisterForTeam function


//Validate the form
function validateForm() {
    let errMsgs = [];
    let urlParams = new URLSearchParams(location.search);
    let minmemberage = urlParams.get("minmemberage");
    let maxmemberage = urlParams.get("maxmemberage");
    let teamgender = urlParams.get("teamgender");
    let emailReg = /^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/;
    let phoneReg = /^\d{3}-\d{3}-\d{4}/;
    let ageReg = /^(0|(\+)?[1-9]{1}[0-9]{0,8}|(\+)?[1-3]{1}[0-9]{1,9}|(\+)?[4]{1}([0-1]{1}[0-9]{8}|[2]{1}([0-8]{1}[0-9]{7}|[9]{1}([0-3]{1}[0-9]{6}|[4]{1}([0-8]{1}[0-9]{5}|[9]{1}([0-5]{1}[0-9]{4}|[6]{1}([0-6]{1}[0-9]{3}|[7]{1}([0-1]{1}[0-9]{2}|[2]{1}([0-8]{1}[0-9]{1}|[9]{1}[0-5]{1})))))))))$/;
    if ($("#membername").val().trim() == "") {
        errMsgs[errMsgs.length] = "Name is REQUIRED";
    }
    if ($("#phone").val().trim() == "") {
        errMsgs[errMsgs.length] = "Phone Number is REQUIRED";
    }
    if ($("#email").val().trim() == "") {
        errMsgs[errMsgs.length] = "Email Address is REQUIRED";
    }
    if ($("#age").val().trim() == "") {
        errMsgs[errMsgs.length] = "Member Age is REQUIRED";
    }
    if (emailReg.test($("#email").val()) == false) {
        errMsgs[errMsgs.length] = "Email needs to be the correct format!";
    }
    if (phoneReg.test($("#phone").val()) == false) {
        errMsgs[errMsgs.length] = "Phone Number needs to be the correct format!";
    }
    if (ageReg.test($("#age").val()) == false) {
        errMsgs[errMsgs.length] = "Age needs to be an integer!";
    }
    if (($("#gender").val() != "Male") && ($("#gender").val() != "Female")) {
        errMsgs[errMsgs.length] = "Gender should be Male or Female";
    }
    if (Number($("#age").val()) > (Number(maxmemberage))) {
        errMsgs[errMsgs.length] = "Age is greater than the team maximum age.";
    }
    if (Number($("#age").val()) < (Number(minmemberage))) {
        errMsgs[errMsgs.length] = "Age is less than the team minimum age.";
    }
    if ((Number($("#age").val()) < 18) && ($("#contactname").val() == "")) {
        errMsgs[errMsgs.length] = "A minor requires a parent/guardian contact name.";
    }
    if ((teamgender == "Male") && ($("#gender").val() == "Female")) {
        errMsgs[errMsgs.length] = "This is a male team.";
    }
    if ((teamgender == "Female") && ($("#gender").val() == "Male")) {
        errMsgs[errMsgs.length] = "This is a female team.";
    }
    return errMsgs;
} // end of validateForm function

//when CANCEL button is clicked:
function cancelUpdates() {
    location.href = "teamdetails.html?teamid=" + $("#teamid").val();
} // end of cancelUpdates Function

function cancelAction() {
    $("#deleteCancelChoice").hide();
} // end of cancelAction Function