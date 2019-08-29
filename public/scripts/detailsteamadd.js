"use strict";
//This script contains code to post a new course to a JSON file.
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
    let categ;

    //Starts the communication to the server
    $.getJSON(
        "/api/categories",
        //This function doesn't necessarily run instantaneously
        function(data) {
            categ = data;
            //load dropdown lists here (code)
            for (let i = 0; i < categ.length; i++) {
                let categoryOption = $("<option>", { text: categ[i].Category, value: categ[i].Category });
                $("#categoryChoice").append(categoryOption);
            } // end of for
        } // end of CALLBACK function
    ); // end of call to $.getJSON      

    $("#btnAddCourse").on("click", addNewCourse);
    $("#btnCancelAdd").on("click", cancelAdd);

}); // end of Ready Load

//when ADD button is clicked:
function addNewCourse() {
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
    $.post("api/courses", $("#detailsInputForm").serialize(), function(data) {
        location.href = "details.html?courseid=" + $("#courseId").val();
    }); // end of post
    return false;
} // end of registerForCourse function

//Validate the form
// Note: Need to add the forward slash to the front and back of regular 
// expressions to make them behave correctly when code is run. 
function validateForm() {
    let errMsgs = [];
    let dateReg = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    let numReg = /^\d{0,9}(\.\d{0,2})?$/;
    if ($("#courseId").val().trim() == "") {
        errMsgs[errMsgs.length] = "Course Number is REQUIRED";
    }
    if ($("#title").val().trim() == "") {
        errMsgs[errMsgs.length] = "Course Name is REQUIRED";
    }
    if ($("#location").val().trim() == "") {
        errMsgs[errMsgs.length] = "Location is REQUIRED";
    }
    if ($("#startDate").val().trim() == "") {
        errMsgs[errMsgs.length] = "Start Date is REQUIRED";
    }
    if (dateReg.test($("#startDate").val()) == false) {
        errMsgs[errMsgs.length] = "Start Date needs to be in mm/dd/yy format!";
    }
    if ($("#endDate").val().trim() == "") {
        errMsgs[errMsgs.length] = "End Date is REQUIRED";
    }
    if (dateReg.test($("#endDate").val()) == false) {
        errMsgs[errMsgs.length] = "End Date needs to be in mm/dd/yy format!";
    }
    if ($("#meets").val().trim() == "") {
        errMsgs[errMsgs.length] = "Day and Time Information is REQUIRED";
    }
    if ($("#fee").val().trim() == "") {
        errMsgs[errMsgs.length] = "Class Fee is REQUIRED";
    }
    if (numReg.test($("#fee").val()) == false) {
        errMsgs[errMsgs.length] = "Fee is numeric and needs to be in a 9999.99 format!";
    }
    return errMsgs;
} // end of validateForm function

//when CANCEL button is clicked:
function cancelAdd() {
    location.reload();
    $("#msgDiv").html("Action Canceled");
    location.href = "courses.html";
}; // end of Cancel Function