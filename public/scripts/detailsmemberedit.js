"use strict";
//This script contains code to edit a team member and post it to a JSON file.
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

    $("#btnEditMember").on("click", editTeamMember);
    $("#btnCancel").on("click", cancelUpdates);
}); // end of Ready Load

//when ADD button is clicked:
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
    {
        $.ajax({
                url: "/api/teams/" + $("#teamid").val() + "/members", // your api url
                data: $("#memberDetailsFormEdit").serialize(), // id of your form
                method: "PUT", // method is any HTTP method
                success: function() {
                        alert("Member Updated!");
                        location.href = "teamdetails.html?teamid=" + $("#teamid").val();
                    } // end of success function
            }) // end of ajax PUT
            .fail(function() {
                alert("Didn't Update!");
                location.href = "teamdetails.html?teamid=" + $("#teamid").val();
            }); // end of fail function
    } // end of EDIT A Team
} // end of editTeamMember function

//Validate the form
function validateForm() {
    let errMsgs = [];
    let emailReg = /^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/;
    let phoneReg = /^\d{3}-\d{3}-\d{4}/;
    let ageReg = /^[1-9]+[0-9]*$/;
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
    return errMsgs;
} // end of validateForm function

//when CANCEL button is clicked:
function cancelUpdates() {
    location.reload();
    location.href = "teamdetails.html?teamid=" + $("#teamid").val();
}; // end of Cancel Function