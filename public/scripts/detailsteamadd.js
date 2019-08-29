"use strict";
//This script contains code to post a new team to a JSON file.
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

    let orgs;

    //Starts the communication to the server
    $.getJSON(
        "/api/leagues",
        //This function doesn't necessarily run instantaneously
        function(data) {
            orgs = data;
            //load dropdown lists here (code)
            for (let i = 0; i < orgs.length; i++) {
                let leagueOption = $("<option>", { text: orgs[i].Name, value: orgs[i].Code });
                $("#leagueChoice").append(leagueOption);
            } // end of for
        } // end of CALLBACK function
    ); // end of call to $.getJSON      

    $("#btnAddTeam").on("click", addNewTeam);
    $("#btnCancelAdd").on("click", cancelAdd);

}); // end of Ready Load

//when ADD button is clicked:
function addNewTeam() {
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
    $.post("/api/teams", $("#detailsInputForm").serialize(), function(data) {
        location.href = "teams.html";
        //        location.href = "teamdetails.html?teamid=" + data.TeamID;
    }); // end of post
    return false;
} // end of registerForTeam function

//Validate the form
// Note: Need to add the forward slash to the front and back of regular 
// expressions to make them behave correctly when code is run. 
function validateForm() {
    let errMsgs = [];
    let emailReg = /^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/;
    let phoneReg = /^\d{3}-\d{3}-\d{4}/;
    let ageReg = /^[1-9]+[0-9]*$/;
    if ($("#teamName").val().trim() == "") {
        errMsgs[errMsgs.length] = "Team Name is REQUIRED";
    }
    if ($("#managerName").val().trim() == "") {
        errMsgs[errMsgs.length] = "Manager Name is REQUIRED";
    }
    if ($("#managerPhone").val().trim() == "") {
        errMsgs[errMsgs.length] = "Manager Phone Number is REQUIRED";
    }
    if ($("#managerEmail").val().trim() == "") {
        errMsgs[errMsgs.length] = "Manager Email Address is REQUIRED";
    }
    if ($("#maxTeamMembers").val().trim() == "") {
        errMsgs[errMsgs.length] = "Maximum Number of Team Members is REQUIRED";
    }
    if ($("#minMemberAge").val().trim() == "") {
        errMsgs[errMsgs.length] = "Minimum Member Age is REQUIRED";
    }
    if ($("#maxMemberAge").val().trim() == "") {
        errMsgs[errMsgs.length] = "Maximum Member Age is REQUIRED";
    }
    if (emailReg.test($("#managerEmail").val()) == false) {
        errMsgs[errMsgs.length] = "Manager Email needs to be the correct format!";
    }
    if (phoneReg.test($("#managerPhone").val()) == false) {
        errMsgs[errMsgs.length] = "Manager Phone Number needs to be the correct format!";
    }
    if (ageReg.test($("#maxTeamMembers").val()) == false) {
        errMsgs[errMsgs.length] = "Maximum Number of Team Members needs to be an integer!";
    }
    if (ageReg.test($("#minMemberAge").val()) == false) {
        errMsgs[errMsgs.length] = "Minimum Member Age needs to be an integer!";
    }
    if (ageReg.test($("#maxMemberAge").val()) == false) {
        errMsgs[errMsgs.length] = "Maximum Member Age needs to be an integer!";
    }
    return errMsgs;
} // end of validateForm function

//when CANCEL button is clicked:
function cancelAdd() {
    location.reload();
    location.href = "teams.html";
}; // end of Cancel Function