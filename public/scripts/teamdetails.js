"use strict";
//teamdetails page script for the Hip to be Square Capstone Project.
//This script contains code to dynamically create information on different teams from a JSON file.
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

let obj;

$(function() {
        $("#deleteCancelChoice").hide();
        let urlParams = new URLSearchParams(location.search);
        let chosenDetail = urlParams.get("teamid");

        //Starts the communication to the server
        //This API gets a particular team by ID, using /api/teams/:id
        $.getJSON(
                "/api/teams/" + chosenDetail,
                //This function doesn't necessarily run instantaneously
                function(data) {
                    obj = data;

                    createDetailTable();

                    //This function dynamically creates the team information using bootstrap formatting.
                    function createDetailTable() {
                        let url = "register.html?teamid=" + chosenDetail +
                            "&teamname=" + obj.TeamName +
                            "&minmemberage=" + obj.MinMemberAge +
                            "&maxmemberage=" + obj.MaxMemberAge +
                            "&maxteammembers=" + obj.MaxTeamMembers +
                            "&teamgender=" + obj.TeamGender +
                            "&membercount=" + obj.Members.length;
                        let urledit = "detailsteamedit.html?teamid=" + chosenDetail;

                        $("#detailsTeam").empty();
                        let markupBody1 = "<div class='row justify-content-md-center firstRow'><div class='col-md-5'><p>Team Name</p></div><div class='col-md-5'><p id='teamName'>" + obj.ManagerName + "</p></div></div>";
                        $("#detailsTeam").append(markupBody1);
                        let markupBody2 = "<div class='row justify-content-md-center'><div class='col-md-5'><p>Organization</p></div><div class='col-md-5'><p id='league'>" + obj.League + "</p></div></div>";
                        $("#detailsTeam").append(markupBody2);
                        let markupBody3 = "<div class='row justify-content-md-center'><div class='col-md-5'><p>Team Type</p></div><div class='col-md-5'><p id='teamType'>" + obj.TeamType + "</p></div></div>";
                        $("#detailsTeam").append(markupBody3);
                        let markupBody4 = "<div class='row justify-content-md-center'><div class='col-md-5'><p>Team Manager</p></div><div class='col-md-5'><ul id='managerList'><li id='managerName'>" + obj.ManagerName + "</li><li id='managerPhone'>" + obj.ManagerPhone + "</li><li id='managerEmail'>" + obj.ManagerEmail + "</li></ul></div></div>";
                        $("#detailsTeam").append(markupBody4);
                        let markupBody5 = "<div class='row justify-content-md-center'><div class='col-md-5'><p>Maximum Members to a Team</p></div><div class='col-md-5'><p id='maxTeamMembers'>" + obj.MaxTeamMembers + "</p></div></div>";
                        $("#detailsTeam").append(markupBody5);
                        let markupBody6 = "<div class='row justify-content-md-center'><div class='col-md-5'><p>Team Age Range</p></div><div class='col-md-5'><p><span id='minMemberAge'>" + obj.MinMemberAge + " to </span><span id='maxMemberAge'>" + obj.MaxMemberAge + "</span></p></div></div>";
                        $("#detailsTeam").append(markupBody6);
                        let markupBody7 = "<div class='row justify-content-md-center'><div class='col-md-5'><p>Team Gender</p></div><div class='col-md-5'><p id='teamGender'>" + obj.TeamGender + "</p></div></div>";
                        $("#detailsTeam").append(markupBody7);
                        let markupBody8 = "<div class='row justify-content-md-center'><div class='col-md-5'><p>Members Registered</p></div><div class='col-md-5'><p id='memberCnt'></p></div></div>";
                        $("#detailsTeam").append(markupBody8);

                        //Member Count
                        if (obj.Members.length == 0) {
                            $("#memberCnt").html("No Members Registered");
                            $("#memberTable").hide();
                        } else {
                            $("#memberCnt").html(obj.Members.length);
                        }
                        // end Member Count

                        //member load
                        $("#memberTableHead").empty();
                        let markupHeader = "<tr><th>Member Name</th><th>Age</th><th>Gender</th><th>Email</th><th>Edit/Unregister</th></tr>";
                        $("#memberTableHead").append(markupHeader);
                        $("#memberTableHead").css("font-weight", "bold");
                        $("#memberTableBody").empty();
                        for (let j = 0; j < obj.Members.length; j++) {
                            // urlunreg creates a url with information contatenated to bring into 
                            // the unregister page.
                            let urlunreg = "unregister.html?teamid=" + chosenDetail +
                                "&membername=" + obj.Members[j].MemberName +
                                "&memberid=" + obj.Members[j].MemberId +
                                "&email=" + obj.Members[j].Email +
                                "&contactname=" + obj.Members[j].ContactName +
                                "&age=" + obj.Members[j].Age +
                                "&gender=" + obj.Members[j].Gender +
                                "&phone=" + obj.Members[j].Phone;
                            //encode URI to be able to pass the string with spaces, email, etc.
                            let encodedURI = encodeURI(urlunreg);

                            // urlMemEdit creates a url with information contatenated to bring into 
                            // the Edit Member page.
                            let urlMemEdit = "detailsmemberedit.html?teamid=" + chosenDetail +
                                "&membername=" + obj.Members[j].MemberName +
                                "&memberid=" + obj.Members[j].MemberId +
                                "&email=" + obj.Members[j].Email +
                                "&contactname=" + obj.Members[j].ContactName +
                                "&age=" + obj.Members[j].Age +
                                "&gender=" + obj.Members[j].Gender +
                                "&phone=" + obj.Members[j].Phone +
                                "&minmemberage=" + obj.MinMemberAge +
                                "&maxmemberage=" + obj.MaxMemberAge +
                                "&teamgender=" + obj.TeamGender;
                            //encode URI to be able to pass the string with spaces, email, etc.
                            let encodedEditURI = encodeURI(urlMemEdit);

                            // load the member information to the page.
                            let markupBody9 = "<tr><td>" + obj.Members[j].MemberName + "</td><td>" +
                                obj.Members[j].Age + "</td><td>" +
                                obj.Members[j].Gender + "</td><td>" +
                                obj.Members[j].Email + "</td><td><a class='edit mr-2' title='Edit' href=" +
                                encodedEditURI + "><i class='fa fa-pencil-alt fa-lg' aria-hidden='true'></i></a><a class='mr-2' title='Unregister' href=" +
                                encodedURI + "><i class='fas fa-trash-alt fa-lg' aria-hidden='true'></i></a></tr>";
                            $("#memberTableBody").append(markupBody9);
                        } // end of if for member table load                 

                        $("#btnRegister").on("click", registerForTeam);
                        // when the REGISTER button is clicked, the url created in 
                        // the function createDetailTable sends the user to the
                        // registration page.
                        $("#btnEditTeamDetails").on("click", editTeamDetails);
                        // when the Edit Team Details button is clicked, the urledit created in 
                        // the function createDetailTable sends the user to the
                        // detailsteamedit page.

                        // Brings up choice to delete the team or cancel.
                        $("#btnDeleteTeam").on("click", (function() {
                            $("#deleteCancelChoice").show();
                            $("#btnYesDelete").on("click", deleteTeam);
                            $("#btnCancelAction").on("click", cancelAction);
                        }));

                        function registerForTeam() {
                            location.href = url;
                        } // end of registerForTeam Function

                        function editTeamDetails() {
                            location.href = urledit;
                        } // end of editTeamDetails Function

                        function deleteTeam() {
                            $.ajax({
                                    url: "/api/teams/" + chosenDetail,
                                    type: "DELETE",
                                    data: $("#detailsForm").serialize()
                                }) // end of AJAX
                                .done(function(data, status, xhr) {
                                    location.href = "teams.html";
                                })
                                .fail(function() {
                                    $("#msgDivDelete").html("ERROR: Team was not deleted!");
                                });
                            return false;
                        } // end of deleteTeam Function

                        function cancelAction() {
                            $("#deleteCancelChoice").hide();
                        } // end of cancelAction Function
                    } // end of createDetailTable function
                } // end of function(data)
            ) // end of .getJSON

    }) // end of READY EVENT HANDLER