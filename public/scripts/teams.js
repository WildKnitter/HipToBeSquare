"use strict";
//This scripts contains code to dynamically create information on different teams from a JSON file.
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

        let craftType = ["Crocheting", "Knitting"];

        let orgs;

        //Starts the communication to the server
        $.getJSON(
            "/api/leagues",
            //This function doesn't necessarily run instantaneously
            function(data) {
                orgs = data;
                //load dropdown lists here (code)
                for (let i = 0; i < orgs.length; i++) {
                    let teamOption = $("<option>", { text: orgs[i].Name, value: orgs[i].Code });
                    $("#teamChoice").append(teamOption);
                } // end of for
            } // end of CALLBACK function
        ); // end of call to $.getJSON                 

        //load craft dropdown list (Team Type)
        for (let i = 0; i < craftType.length; i++) {
            let craftOption = $("<option>", { text: craftType[i], value: craftType[i] });
            $("#teamType").append(craftOption);
        }

        $("#teamChoice").on("change", createTeamTable);
        $("#teamType").on("change", createTeamTableType);
        $("#btnAllTeams").on("click", createTeamTableAll);

        // Function to create a table for teams.
        function createTeamTable() {
            let objs;
            //Starts the communication to the server
            $.getJSON(
                "/api/teams/byleague/" + $("#teamChoice").val(),
                //This function doesn't necessarily run instantaneously
                function(data) {
                    objs = data;
                    $("#teamTableHead").empty();
                    let markupHeader = "<tr><th>Organization Type</th><th>Team Type</th><th>Team ID</th><th>Team Name</th><th>View/Edit</th></tr>";
                    $("#teamTableHead").append(markupHeader);
                    $("#teamTableHead").css("font-weight", "bold");
                    $("#teamTableBody").empty();
                    for (let i = 0; i < objs.length; i++) {
                        let url = "teamdetails.html?teamid=" + objs[i].TeamId;
                        let urledit = "teamdetailsedit.html?teamid=" + objs[i].TeamId;
                        let markupBody = "<tr><td>" + objs[i].League + "</td><td>" + objs[i].TeamType + "</td><td>" + objs[i].TeamId + "</td><td>" + objs[i].TeamName + "</td><td><a class='mr-2' title='View' href=" + url + "><i class='fas fa-binoculars fa-lg' aria-hidden='true'></i></a><a class='edit mr-2' title='Edit' href=" + urledit + "><i class='fa fa-pencil-alt fa-lg' aria-hidden='true'></i></a></td></tr>";
                        $("#teamTableBody").append(markupBody);
                    } // end of for
                } // end of CALLBACK function
            ); // end of call to $.getJSON     add the .fail after the parenthesis
        } // end of createTeamTable function

        // Function to create a table for specific craft teams (knitting or crocheting).
        function createTeamTableType() {
            let objs;
            //Starts the communication to the server
            $.getJSON(
                "/api/teams",
                //This function doesn't necessarily run instantaneously
                function(data) {
                    objs = data;
                    let chosenCraft = $("#teamType").val();
                    $("#teamTableHead").empty();
                    let markupHeader = "<tr><th>Organization Type</th><th>Team Type</th><th>Team ID</th><th>Team Name</th><th>View/Edit</th></tr>";
                    $("#teamTableHead").append(markupHeader);
                    $("#teamTableHead").css("font-weight", "bold");
                    $("#teamTableBody").empty();
                    for (let i = 0; i < objs.length; i++) {
                        if (chosenCraft == objs[i].TeamType) {
                            let url = "teamdetails.html?teamid=" + objs[i].TeamId;
                            let urledit = "teamdetailsedit.html?teamid=" + objs[i].TeamId;
                            let markupBody = "<tr><td>" + objs[i].League + "</td><td>" + objs[i].TeamType + "</td><td>" + objs[i].TeamId + "</td><td>" + objs[i].TeamName + "</td><td><a class='mr-2' title='View' href=" + url + "><i class='fas fa-binoculars fa-lg' aria-hidden='true'></i></a><a class='edit mr-2' title='Edit' href=" + urledit + "><i class='fa fa-pencil-alt fa-lg' aria-hidden='true'></i></a></td></tr>";
                            $("#teamTableBody").append(markupBody);
                        } // end of if statement
                    } // end of for
                } // end of CALLBACK function
            ); // end of call to $.getJSON     
        } // end of createTeamTableType function

        // Function to create a table for ALL teams.
        function createTeamTableAll() {
            let objs;
            //Starts the communication to the server
            $.getJSON(
                "/api/teams",
                //This function doesn't necessarily run instantaneously
                function(data) {
                    objs = data;
                    $("#teamTableHead").empty();
                    let markupHeader = "<tr><th>Organization Type</th><th>Team Type</th><th>Team ID</th><th>Team Name</th><th>View/Edit</th></tr>";
                    $("#teamTableHead").append(markupHeader);
                    $("#teamTableHead").css("font-weight", "bold");
                    $("#teamTableBody").empty();
                    for (let i = 0; i < objs.length; i++) {
                        let url = "teamdetails.html?teamid=" + objs[i].TeamId;
                        let urledit = "detailsteamedit.html?teamid=" + objs[i].TeamId;
                        let markupBody = "<tr><td>" + objs[i].League + "</td><td>" + objs[i].TeamType + "</td><td>" + objs[i].TeamId + "</td><td>" + objs[i].TeamName + "</td><td><a class='mr-2' title='View' href=" + url + "><i class='fas fa-binoculars fa-lg' aria-hidden='true'></i></a><a class='edit mr-2' title='Edit' href=" + urledit + "><i class='fa fa-pencil-alt fa-lg' aria-hidden='true'></i></a></td></tr>";
                        $("#teamTableBody").append(markupBody);
                    } // end of for
                } // end of CALLBACK function
            ); // end of call to $.getJSON     
        } // end of createTeamTableAll function

    }) // end of READY EVENT HANDLER