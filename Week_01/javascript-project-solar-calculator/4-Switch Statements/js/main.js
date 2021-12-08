// JavaScript Document
function myFunction() {
    var elem = document.getElementById("chooseMe");
    var dateShort = elem.options[elem.selectedIndex].text;
    var dayName;
    console.log(dateShort);

switch (dateShort) {  //could be written as (Number(dateShort)) then place the number without " "
    case "1":
        dayName = "Sunday";
        break;
    case "2":
        dayName = "Monday";
        break;
    case "3":
        dayName = "Tuesday";
        break;
    case "4":
        dayName = "Wednesday";
        break;
    case "5":
        dayName = "Thursday";
        break;
    case "6":
        dayName = "Friday";
        break;
    case "7":
        dayName = "Saturday";
        break;
    default:
        dayName = "Out of Range";
} //end of switch statement

    document.getElementById('feedback').innerHTML = dayName;
}

//fortune exercise
function myFortune() {
    var elem = document.getElementById("chooseMe2");
    var fortuneNum = elem.options[elem.selectedIndex].value;
    var fortuneMessage;
    console.log(fortuneNum);

switch (Number(fortuneNum)) {
    case 1:
    case 6:
        fortuneMessage = "Toilets flush randomly nearby";
        break;
    case 2:
    case 7:
        fortuneMessage = "You will win a new car";
        break;
    case 3:
        fortuneMessage = "Boobie prize is your life";
        break;
    case 4:
    case 8:
        fortuneMessage = "All your base are belong to us";
        break;

    default:
        fortuneMessage = "Hours pass like minutes when studying code"
}
    document.getElementById('feedback2').innerHTML = fortuneMessage;

}