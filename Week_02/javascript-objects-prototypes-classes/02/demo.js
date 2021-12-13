'use strict'; 
(function() {
  // let person = {
  //   firstName: 'Jim',
  //   lastName: 'Cooper',
  //   age: 29,
  //   isAdult: function() { return this.age > 18; }
  // };
  
  function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.isAdult = function() { return this.age > 21; }
  }

  let jim = new Person('Jim', 'Cooper', 29);
  let sofia = new Person('Sofia', 'Cooper', 17);

  display(jim.isAdult());
  display(sofia.isAdult());

})();