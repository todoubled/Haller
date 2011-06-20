var response = require('../data/response.json');

exports.get = function(from, message) {
  // Array of existing registered numbers
  var whitelist = ['7732094313'];
 
  if (from.indexOf(whitelist) != "-1") {
    switch(message) {
      case 'code':
        var words = response.update[from].key; 
      break;
   
      case 'status':
        var words = response.update[from].status;
      break;

      default:
        var words = response.update[from].id; 
    };
  } else {
    var words = 'You haven\'t signed up yet.'; 
  } 
  
  return words;
};

