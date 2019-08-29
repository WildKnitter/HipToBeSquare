"use strict";
//This script contains code to post student registrations for courses to a JSON file.
//Author:  Pam Belknap

/*
Key for understanding how to access the fields in the JSON file:
objs
objs.length
objs[i].CourseId
objs[i].Title
objs[i].Category
objs[i].Location
objs[i].StartDate
objs[i].EndDate
objs[i].Meets
objs[i].Fee
objs[i].Students (its own array)
*/

//Ready Load
$(function() {
    let urlParams = new URLSearchParams(location.search);
    let courseid = urlParams.get("courseid");
    $("#courseid").val(courseid);
    $("#btnRegisterForCourse").on("click", registerForCourse);
    $("#btnCancel").on("click", cancelUpdates);

}); // end of Ready Load

//when ADD button is clicked:
function registerForCourse() {
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
    $.post("api/register", $("#registrationForm").serialize(), function(data) {
        location.href = "details.html?courseid=" + $("#courseid").val();
    }); // end of post
    return false;
} // end of registerForCourse function

//Validate the form
function validateForm() {
    let errMsgs = [];
    let emailReg = /^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/;
    if ($("#studentname").val().trim() == "") {
        errMsgs[errMsgs.length] = "Name is REQUIRED";
    }
    if ($("#email").val().trim() == "") {
        errMsgs[errMsgs.length] = "Email Address is REQUIRED";
    }
    if (emailReg.test($("#email").val()) == false) {
        errMsgs[errMsgs.length] = "Email needs to be the correct format!";
    }
    return errMsgs;
} // end of validateForm function

//when CANCEL button is clicked:
function cancelUpdates() {
    location.reload();
    $("#msgDiv").html("Action Canceled");
    location.href = "details.html?courseid=" + $("#courseid").val();
}; // end of Cancel Function