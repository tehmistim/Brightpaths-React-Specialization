// REST PARAMETER

// function greet(message, ...names) {
//     console.log(message + ' everyone!');
//     names.forEach(name => console.log
//                             ('Hi' + name));

// }

// greet('Welcome', 'Mary', 'John', 'James');

// //SPREAD OPERATOR

// function greet(person1, person2) {
//     console.log('Hello' + person1 + ' and ', person2);

// }

// let names = ['John', 'Mary'];

// greet(...names);

// //EXAMPLE TWO

// function display(char1, char2, char3, char4) {
//     console.log(char1, char2, char3, char4);

// }

// let letters = 'abcd';
// display(...letters);

//EXAMPLE THREE - with more than 4 parameters

// function display(char1, char2, char3, char4, ...others) {
//     console.log(others);
//     console.log(char1, char2, char3, char4);

// }

// let letters = 'abcdefg';
// display(...letters);


function sumOfCubes (a, b) {

    let aCubed = a*a*a;
    let bCubed = b*b*b;
    let sum = aCubed + bCubed;

    return sum;
};

console.log(sumOfCubes(4, 9));

function multiplyTrio (a, b, c) {

    let sum = a*b*c;
  
    return sum;
  
};

console.log(multiplyTrio(4, 88, 10));