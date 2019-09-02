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

let obj;

$(function() {
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

                    //This function dynamically creates the team table.
                    function createDetailTable() {
                        let url = "register.html?teamid=" + chosenDetail +
                            "&minmemberage=" + obj.MinMemberAge +
                            "&maxmemberage=" + obj.MaxMemberAge +
                            "&maxteammembers=" + obj.MaxTeamMembers +
                            "&teamgender=" + obj.TeamGender +
                            "&membercount=" + obj.Members.length;
                        let urledit = "detailsteamedit.html?teamid=" + chosenDetail;

                        $("#teamTableBody").empty();
                        let markupBody0 = "<tr><td class='firstRow'>Team ID</td><td class='firstRow'>" + obj.TeamId + "</td></tr>";
                        $("#teamTableBody").append(markupBody0);

                        let markupBody1 = "<tr><td>Team Name</td><td id='teamName'>" + obj.TeamName + "</td></tr>";
                        $("#teamTableBody").append(markupBody1);

                        let markupBody2 = "<tr><td>Organization</td><td id='league'>" + obj.League + "</td></tr>";
                        $("#teamTableBody").append(markupBody2);

                        let markupBody3 = "<tr><td>Team Type</td><td id='teamType'>" + obj.TeamType + "</td></tr>";
                        $("#teamTableBody").append(markupBody3);

                        let markupBody4 = "<tr><td>Team Manager Name</td><td id='managerName'>" + obj.ManagerName + "</td></tr>";
                        $("#teamTableBody").append(markupBody4);

                        let markupBody5 = "<tr><td>Manager Phone Number</td><td id='managerPhone'>" + obj.ManagerPhone + "</td></tr>";
                        $("#teamTableBody").append(markupBody5);

                        let markupBody6 = "<tr><td>Manager Email Address</td><td id='managerEmail'>" + obj.ManagerEmail + "</td></tr>";
                        $("#teamTableBody").append(markupBody6);

                        let markupBody7 = "<tr><td>Maximum Members to a Team</td><td id='maxTeamMembers'>" + obj.MaxTeamMembers + "</td></tr>";
                        $("#teamTableBody").append(markupBody7);

                        let markupBody8 = "<tr><td>Minimum Member Age</td><td id='minMemberAge'>" + obj.MinMemberAge + "</td></tr>";
                        $("#teamTableBody").append(markupBody8);

                        let markupBody9 = "<tr><td>Maximum Member Age</td><td id='maxMemberAge'>" + obj.MaxMemberAge + "</td></tr>";
                        $("#teamTableBody").append(markupBody9);

                        let markupBody10 = "<tr><td>Team Gender</td><td id='teamGender'>" + obj.TeamGender + "</td></tr>";
                        $("#teamTableBody").append(markupBody10);

                        let markupBody11 = "<tr><td>" + "Members Registered" + "</td><td id='memberCnt'></td></tr>";
                        $("#teamTableBody").append(markupBody11);

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
                        let markupHeader = "<tr><th>Member Name</th><th>Member Id</th><th>Member Email</th><th>Edit/Unregister</th></tr>";
                        $("#memberTableHead").append(markupHeader);
                        $("#memberTableHead").css("font-weight", "bold");
                        $("#memberTableBody").empty();
                        for (let j = 0; j < obj.Members.length; j++) {
                            // urlunreg creates a url with information contatenated to bring into the unregister page.
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

                            // urlMemEdit creates a url with information contatenated to bring into the Edit Member page.
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

                            //populates the member table
                            let markupBody11 = "<tr><td>" + obj.Members[j].MemberName + "</td><td>" +
                                obj.Members[j].MemberId + "</td><td>" +
                                obj.Members[j].Email + "</td><td><a class='edit mr-2' title='Edit' href=" +
                                encodedEditURI + "><i class='fa fa-pencil-alt fa-lg' aria-hidden='true'></i></a><a class='mr-2' title='Unregister' href=" +
                                encodedURI + "><i class='fas fa-trash-alt fa-lg' aria-hidden='true'></i></a></tr>";
                            $("#memberTableBody").append(markupBody11);
                        } // end of if for member table load                 

                        $("#btnRegister").on("click", registerForTeam);
                        // when the REGISTER button is clicked, the url created in 
                        // the function createDetailTable sends the user to the
                        // registration page.
                        $("#btnEditTeamDetails").on("click", editTeamDetails);
                        // when the Edit Team Details button is clicked, the urledit created in 
                        // the function createDetailTable sends the user to the
                        // detailsteamedit page.

                        $("#btnDeleteTeam").on("click", deleteTeam);
                        // when the Edit Team Details button is clicked, the urledit created in 
                        // the function createDetailTable sends the user to the
                        // detailsteamedit page.

                        function registerForTeam() {
                            location.href = url;
                        } // end of registerForTeam Function

                        function editTeamDetails() {
                            location.href = urledit;
                        } // end of editTeamDetails Function

                        function showDeleteMemberCard {
                            let cardTitle = $("#cardTitle");
                            cardTitle.html(objs[i].Members[j].MemberName);
                            $(".card-body").append(
                                $("<p />")
                                .attr("class", "card-text")
                                .attr("id", "cardtext1")
                                .html("Member ID: " + objs[i].Members[j].MemberId)
                            ); // end of cardtext1 append parenthesis
                            $(".card-body").append(
                                $("<p />")
                                .attr("class", "card-text")
                                .attr("id", "cardtex2")
                                .html("Member Contact Name: " + objs[i].Members[j].ContactName)
                            ); // end of cardtext2 append parenthesis
                            $(".card-body").append(
                                $("<p />")
                                .attr("class", "card-text")
                                .attr("id", "cardtext3")
                                .html("Member Email: " + objs[i].Members[j].Email)
                            ); // end of cardtext3 append parenthesis
                            $(".card-body").append(
                                $("<p />")
                                .attr("class", "card-text")
                                .attr("id", "cardtext4")
                                .html("Member Phone: " + objs[i].Members[j].Phone)
                            ); // end of cardtext4 append parenthesis
                            $(".card-body").append(
                                $("<p />")
                                .attr("class", "card-text")
                                .attr("id", "cardtext5")
                                .html("Member Age: " + objs[i].Members[j].Age)
                            ); // end of cardtext5 append parenthesis
                            $(".card-body").append(
                                $("<p />")
                                .attr("class", "card-text")
                                .attr("id", "cardtext6")
                                .html("Member Gender: " + objs[i].Members[j].Gender)
                            ); // end of cardtext6 append parenthesis
                            $(".card-body").append(
                                $("<input />")
                                .attr("class", "card-text btn btn-md btn-danger")
                                .attr("id", "btnUnRegisterForTeam")
                                .attr("name", "btnUnRegisterForTeam")
                                .attr("type", "button")
                                .attr("value", "UNREGISTER")
                            ); // end of btnUnRegisterForTeam append parenthesis
                            $(".card-body").append(
                                $("<input />")
                                .attr("class", "card-text btn btn-md btn-secondary")
                                .attr("id", "btnCancel")
                                .attr("name", "btnCancel")
                                .attr("type", "button")
                                .attr("value", "Cancel")
                            ); // end of btnUnRegisterForTeam append parenthesis
                            $("#memberCard").show();

                        }

                        function deleteTeam() {
                            alert("Are you sure you wish to delete this team?");
                            $.ajax({
                                    url: "/api/teams/" + chosenDetail,
                                    type: "DELETE",
                                    data: $("#detailsForm").serialize()
                                }) // end of AJAX
                                .done(function(data, status, xhr) {
                                    alert("Team Deleted!");
                                    location.href = "teams.html";
                                })
                                .fail(function() {
                                    alert("FAIL: Team NOT Deleted!");
                                });
                            return false;
                        } // end of deleteTeam Function
                    } // end of createDetailTable function
                } // end of function(data)
            ) // end of .getJSON

    }) // end of READY EVENT HANDLER