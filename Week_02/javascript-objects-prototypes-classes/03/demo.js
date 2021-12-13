'use strict'; 
(function() {

  let person = {
    name: {
      first: 'Jim',
      last: 'Cooper'
    },
    age: 29
  };

  Object.defineProperty(person, 'fullName', 
  {
    get: function() { 
      return this.name.first + ' ' + this.name.last;
    },
    set: function(value) { 
      var nameParts = value.split(' ');
      this.name.first = nameParts[0];
      this.name.last = nameParts[1];
    }

  });

  person.fullName = 'Fred Jones';

  display(person.fullName);

  display(person.name.first);
  display(person.name.last);

})();