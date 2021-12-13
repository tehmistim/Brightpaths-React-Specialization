'use strict'; 
(function() {

  function findAlerts(logData) {
    let regex = /ERROR(.*?):(.*?);/g;
    
    let result = regex.exec(logData);
    while(result !== null) {
      display(result[1]);
      display(result[2]);
      display('---------------------------');
      result = regex.exec(logData);    
    }
  }
   
  let logData = 'INFO:Ok;ERROR(HIGH):Something broke;ERROR(LOW):Something fishy;ERROR(HIGH):So many errors;';
   
  findAlerts(logData);
  
})();