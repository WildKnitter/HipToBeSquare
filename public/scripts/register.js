"use strict";
//This script contains code to post member registrations for teams to a JSON file.
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
$(function() {
    let urlParams = new URLSearchParams(location.search);
    let teamid = urlParams.get("teamid");
    let teamname = urlParams.get("teamname");
    $("#teamid").val(teamid);
    $("#teamname").val(teamname);
    $("#btnRegisterForTeam").on("click", registerForTeam);
    $("#btnCancel").on("click", cancelUpdates);

}); // end of Ready Load

//when ADD button is clicked:
function registerForTeam() {
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
    $.post("/api/teams/" + $("#teamid").val() + "/members", $("#registrationForm").serialize(), function(data) {}) // end of post
        .done(function() {
            location.href = "teamdetails.html?teamid=" + $("#teamid").val();
        }) // end of done function
        .fail(function() {
            $("#msgAdd").html("ERROR: Member was not added!");
        }); // end of fail function
    return false;
} // end of registerForteam function

//Validate the form
function validateForm() {
    let errMsgs = [];
    let urlParams = new URLSearchParams(location.search);
    let minmemberage = urlParams.get("minmemberage");
    let maxmemberage = urlParams.get("maxmemberage");
    let maxteammembers = urlParams.get("maxteammembers");
    let teamgender = urlParams.get("teamgender");
    let membercount = urlParams.get("membercount");
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
    if ((Number(membercount) == Number(maxteammembers))) {
        errMsgs[errMsgs.length] = "This group has reached the maximum number of members";
    }
    if (Number($("#age").val()) > (Number(maxmemberage))) {
        errMsgs[errMsgs.length] = "Age is greater than the team maximum age.";
    }
    if (Number($("#age").val()) < (Number(minmemberage))) {
        errMsgs[errMsgs.length] = "Age is less than the team minimum age.";
    }
    if ((Number($("#age").val()) < 18) && ($("#contactname").empty())) {
        errMsgs[errMsgs.length] = "A minor requires a parent/guardian contact name.";
    }
    if ((teamgender == "Male") && ($("#female").prop("checked"))) {
        errMsgs[errMsgs.length] = "This is a male team.";
    }
    if ((teamgender == "Female") && ($("#male").prop("checked"))) {
        errMsgs[errMsgs.length] = "This is a female team.";
    }
    return errMsgs;
} // end of validateForm function

//when CANCEL button is clicked:
function cancelUpdates() {
    location.reload();
    location.href = "teamdetails.html?teamid=" + $("#teamid").val();
}; // end of Cancel Function