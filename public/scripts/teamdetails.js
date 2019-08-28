"use strict";
//This script contains code to dynamically create information on different teams from a JSON file.
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
                        let url = "register.html?teamid=" + chosenDetail;

                        $("#teamTableBody").empty();
                        for (let i = 0; i < objs.length; i++) {
                            if (chosenDetail == objs[i].TeamId) {
                                let markupBody0 = "<tr><td class='firstRow'>Team ID</td><td class='firstRow'>" + objs[i].TeamId + "</td></tr>";
                                $("#teamTableBody").append(markupBody0);
                                let markupBody1 = "<tr><td>Team Name</td><td id='teamName'>" + objs[i].TeamName + "</td></tr>";
                                $("#teamTableBody").append(markupBody1);
                                let markupBody2 = "<tr><td>Organization</td><td id='league'>" + objs[i].League + "</td></tr>";
                                $("#teamTableBody").append(markupBody2);
                                let markupBody3 = "<tr><td>Team Type</td><td id='teamType'>" + objs[i].TeamType + "</td></tr>";
                                $("#teamTableBody").append(markupBody3);
                                let markupBody4 = "<tr><td>Team Manager Name</td><td id='managerName'>" + objs[i].ManagerName + "</td></tr>";
                                $("#teamTableBody").append(markupBody4);
                                let markupBody5 = "<tr><td>Manager Phone Number</td><td id='managerPhone'>" + objs[i].ManagerPhone + "</td></tr>";
                                $("#teamTableBody").append(markupBody5);
                                let markupBody6 = "<tr><td>Manager Email Address</td><td id='managerEmail'>" + objs[i].ManagerEmail + "</td></tr>";
                                $("#teamTableBody").append(markupBody6);
                                let markupBody7 = "<tr><td>Maximum Members to a Team</td><td id='maxTeamMembers'>" + objs[i].MaxTeamMembers + "</td></tr>";
                                $("#teamTableBody").append(markupBody7);
                                let markupBody8 = "<tr><td>Minimum Member Age</td><td id='minMemberAge'>" + objs[i].MinMemberAge + "</td></tr>";
                                $("#teamTableBody").append(markupBody8);
                                let markupBody9 = "<tr><td>Maximum Member Age</td><td id='maxMemberAge'>" + objs[i].MaxMemberAge + "</td></tr>";
                                $("#teamTableBody").append(markupBody9);
                                let markupBody10 = "<tr><td>Team Gender</td><td id='teamGender'>" + objs[i].TeamGender + "</td></tr>";
                                $("#teamTableBody").append(markupBody10);
                                let markupBody11 = "<tr><td>" + "Members Registered" + "</td><td id='memberCnt'></td></tr>";
                                $("#teamTableBody").append(markupBody11);
                                if (objs[i].Members.length == 0) {
                                    $("#memberCnt").html("No Members Registered");
                                    $("#membersTable").hide();
                                } else {
                                    $("#memberCnt").html(objs[i].Members.length);
                                }
                                $("#memberTableHead").empty();
                                let markupHeader = "<tr><th>Member Name</th><th>Member Email</th><th>Unregister</th></tr>";
                                $("#memberTableHead").append(markupHeader);
                                $("#memberTableHead").css("font-weight", "bold");
                                $("#memberTableBody").empty();
                                for (let j = 0; j < objs[i].Members.length; j++) {
                                    let urlunreg = "unregister.html?teamid=" + chosenDetail + "&membername=" + objs[i].Members[j].MemberName + "&email=" + objs[i].Members[j].Email;
                                    //encode URI to be able to pass the string with spaces, email, etc.
                                    let encodedURI = encodeURI(urlunreg);
                                    let markupBody9 = "<tr><td>" + objs[i].Members[j].MemberName + "</td><td>" + objs[i].Members[j].Email + "</td><td><a class='mr-2' title='Unregister' href=" + encodedURI + "><i class='fas fa-trash-alt fa-lg' aria-hidden='true'></i></a></tr>";
                                    $("#memberTableBody").append(markupBody9);
                                } // end of if for member table load
                            } // end of if for table load
                        } // end of for (table)

                        $("#btnRegister").on("click", registerForTeam);
                        // when the REGISTER button is clicked, the url created in 
                        // the function createDetailTable sends the user to the
                        // registration page.
                        function registerForTeam() {
                            location.href = url;
                        } // end of registerForCourse Function
                    } // end of function
                } // end of function(data)
            ) // end of .getJSON

    }) // end of READY EVENT HANDLER