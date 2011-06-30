var response = require('../data/response.json');

exports.get = function(from, message) {
  // Array of existing registered numbers
  var whitelist = ['7732094313'];
  var words;

  if (from.indexOf(whitelist) != "-1") {
    switch(message) {
      case 'code':
        words = response.update[from].key; 
      break;
   
      case 'status':
        words = response.update[from].status;
      break;

      default:
        words = response.update[from].id; 
    };
  } else {
    words = 'You haven\'t signed up yet.'; 
  } 
  
  return words;
};

