"use strict";
//This script contains code to dynamically create a team edit form from a JSON file.
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

$(function() {
        let objs;

        //Starts the communication to the server
        $.getJSON(
                "/api/teams",
                //This function doesn't necessarily run instantaneously
                function(data) {
                    objs = data;

                    createDetailTable();

                    //This function dynamically creates the team table.
                    function createDetailTable() {
                        let urlParams = new URLSearchParams(location.search);
                        let chosenDetail = urlParams.get("teamid");
                        $("#detailsFormCreate").empty();
                        for (let i = 0; i < objs.length; i++) {
                            if (chosenDetail == objs[i].TeamId) {
                                let markupBody0 = "<div class='form-group'><label for='teamId'>Team ID:</label><input type='text' class='form-control' id='teamId' name='teamid' value = '" + objs[i].TeamId + "' readonly></div>";
                                $("#detailsFormCreate").append(markupBody0);

                                let markupBody1 = "<div class='form-group'><label for='teamName'>Team Name:</label><input type='text' class='form-control' id='teamName' name='teamname' value = '" + objs[i].TeamName + "' ></div>";
                                $("#detailsFormCreate").append(markupBody1);

                                let markupBody2 = "<div class='form-group'><label for='league'>Organization:</label><input type='text' class='form-control' id='league' name='leaguecode' value = '" + objs[i].League + "' readonly></div>";
                                $("#detailsFormCreate").append(markupBody2);

                                let markupBody3 = "<div class='form-group'><label for='teamType'>Team Type:</label><input type='text' class='form-control' id='teamType' name='teamtype' value = '" + objs[i].TeamType + "' ></div>";
                                $("#detailsFormCreate").append(markupBody3);

                                let markupBody4 = "<div class='form-group'><label for='managerName'>Team Manager Name:</label><input type='text' class='form-control' id='managerName' name='managername' value = '" + objs[i].ManagerName + "' ></div>";
                                $("#detailsFormCreate").append(markupBody4);

                                let markupBody5 = "<div class='form-group'><label for='managerPhone'>Manager Phone Number:</label><input type='tel' class='form-control' id='managerPhone' name='managerphone' value = '" + objs[i].ManagerPhone + "' ></div>";
                                $("#detailsFormCreate").append(markupBody5);

                                let markupBody6 = "<div class='form-group'><label for='managerEmail'>Manager Email Address:</label><input type='email' class='form-control' id='managerEmail' name='manageremail' value = '" + objs[i].ManagerEmail + "' ></div>";
                                $("#detailsFormCreate").append(markupBody6);

                                let markupBody7 = "<div class='form-group'><label for='maxTeamMembers'>Maximum Members to a Team:</label><input type='number' class='form-control' id='maxTeamMembers' name='maxteammembers' value = '" + objs[i].MaxTeamMembers + "' ></div>";
                                $("#detailsFormCreate").append(markupBody7);

                                let markupBody8 = "<div class='form-group'><label for='minMemberAge'>Minimum Member Age:</label><input type='number' class='form-control' id='minMemberAge' name='minmemberage' value = '" + objs[i].MinMemberAge + "' ></div>";
                                $("#detailsFormCreate").append(markupBody8);

                                let markupBody9 = "<div class='form-group'><label for='maxMemberAge'>Maximum Member Age:</label><input type='number' class='form-control' id='maxMemberAge' name='maxmemberage' value = '" + objs[i].MaxMemberAge + "' ></div>";
                                $("#detailsFormCreate").append(markupBody9);

                                let markupBody10 = "<div class='form-group'><label for='teamGender'>Team Gender:</label><input type='text' class='form-control' id='teamGender' name='teamgender' value = '" + objs[i].TeamGender + "' ></div>";
                                $("#detailsFormCreate").append(markupBody10);
                            } // end of if for table load
                        } // end of for (table)
                    } // end of createDetailTable function
                } // end of function(data)

            ) // end of .getJSON

        $("#btnUpdateTeam").on("click", updateTeam);
        $("#btnCancelUpdate").on("click", cancelUpdates);

        //when ADD button is clicked:
        function updateTeam() {
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
            // EDIT A Team
            {
                $.ajax({
                        url: "api/teams", // your api url
                        data: $("#detailsFormEdit").serialize(), // id of your form
                        method: "PUT", // method is any HTTP method
                        success: function() {
                                alert("Updated!");
                                location.href = "teamdetails.html?teamid=" + $("#teamId").val();
                            } // end of success function
                    }) // end of ajax PUT
                    .fail(function() {
                        alert("Didn't Update!");
                        location.href = "teamdetails.html?teamid=" + $("#teamId").val();
                    }); // end of fail function
            } // end of EDIT A Team
        } // end of updateTeam function

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
            if ($("#teamType").val().trim() == "") {
                errMsgs[errMsgs.length] = "Team Craft Type is REQUIRED";
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
            if ($("#teamGender").val().trim() == "") {
                errMsgs[errMsgs.length] = "Team Gender is REQUIRED";
            }
            if (($("#teamType").val() != "Knitting") && ($("#teamType").val() != "Crocheting")) {
                errMsgs[errMsgs.length] = "Team Type should be Knitting or Crocheting";
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
            if (($("#teamGender").val() != "Male") && ($("#teamGender").val() != "Female") && ($("#teamGender").val() != "Any")) {
                errMsgs[errMsgs.length] = "Team Gender should be Male, Female, or Any";
            }
            return errMsgs;
        } // end of validateForm function

        //when CANCEL button is clicked:
        function cancelUpdates() {
            location.reload();
            location.href = "teamdetails.html?teamid=" + $("#teamId").val();
        }; // end of Cancel Function

    }) // end of READY EVENT HANDLER