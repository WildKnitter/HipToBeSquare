"use strict";
// This script contains code to dynamically create dropdown information on different organizations from a JSON file.
// Author:  Pam Belknap

/*
Key for understanding the fields in the JSON file:
leagues
leagues.length
leagues[i].Name
leagues[i].Code
leagues[i].Description

/api/leagues
/api/teams
/api/teams/:id
/api/teams/byleague/:id
/api/teams/:teamid/members/:memberid
/api/teams/:id/members
*/

$(function() {
    getLeaguesList();
});

function getLeaguesList() {
    let objs;
    //Starts the communication to the server
    $.getJSON("/api/leagues", data => {
        objs = data;
        $("#leagueList").empty();
        for (let i = 0; i < objs.length; i++) {
            const markupList = `<ul><li> ${objs[i].Name} </li></ul>`;
            $("#leagueList").append(markupList);
        } // end of for
    }); // end of call to $.getJSON     
} // end of getLeaguesList function