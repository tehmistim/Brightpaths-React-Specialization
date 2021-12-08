// JavaScript Document

// var foundYou = document.getElementsByName('description');
//     console.log(foundYou[1].innerHTML);
//     foundYou[1].innerHTML = "I changed you fa realz<<"

// var newOptions = ["Orange", "Red", "Blue"];

// var foundYou = document.getElementById('myForm');
// console.log(foundYou);

// var selectArray = foundYou.getElementsByTagName('option');
// console.log(selectArray);

// for (let i = 0; i < selectArray.length; i++) {
//     selectArray[i].innerText = newOptions[i];

// };

var foundYou = document.getElementById('myForm');
console.log(foundYou);

var selectArray = foundYou.getElementsByTagName('input');
console.log(selectArray);

for (let i = 0; i < selectArray.length; i++) {
    console.log(selectArray[i].value)
};

