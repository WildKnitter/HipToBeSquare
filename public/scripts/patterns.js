"use strict";
//Patterns page script for the Hip to be Square Capstone Project. 
//This scripts contains code to alternate patterns for either knitting or crocheting.
//Author:  Pamela Belknap

$(function() {

        $("#knitPatterns").hide();
        $("#crochetPatterns").hide();
        $("#btnKnitting").on("click", showKnittingPatterns);
        $("#btnCrocheting").on("click", showCrochetingPatterns);
        $("#btnReset").on("click", resetPage);

        function showKnittingPatterns() {
            $("#knitPatterns").show();
            $("#crochetPatterns").hide();
        }

        function showCrochetingPatterns() {
            $("#crochetPatterns").show();
            $("#knitPatterns").hide();
        }

        function resetPage() {
            $("#knitPatterns").hide();
            $("#crochetPatterns").hide();
        }

    }) // end of READY EVENT HANDLER