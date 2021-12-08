/*jslint browser:true */
"use strict";

function addMonths(elem) {
var annualUseKw = 0, dailyUseKw = 0, i = 0, x = 0;
var months = document.getElementById(elem).getElementsByTagName('input');
    // console.log(months);

for (let i = 0; i < months.length; i++) {
    x = Number(months[i].value);
    annualUseKw += x;
};

    dailyUseKw = annualUseKw/365

// console.log(dailyUseKw);
    return dailyUseKw;
}

// addMonths('mpc');

function sunHours() {
var hrs;
var theZone = document.forms.solarForm.zone.selectedIndex;
theZone =+ 1;
    switch(theZone) {
        case 1:
            hrs = 6;
            break;
        case 2:
            hrs = 5.5;
            break;
        case 3:
            hrs = 5;
            break;
        case 4:
            hrs = 4.5
            break;
        case 5:
            hrs = 4.2;
            break;
        case 6:
            hrs = 3.5;
            break;
        default:
            hrs = 0;
    }  // end switch
    return hrs;
}  // end sunHours function



function calculateSolar() {

    var dailyUseKw = addMonths('mpc');
    console.log(dailyUseKw);

    var sunHoursPerDay = sunHours();
    console.log(sunHoursPerDay);

    var minKwNeeds = dailyUseKw/sunHoursPerDay
    console.log(minKwNeeds);

}  // end calculateSolar function