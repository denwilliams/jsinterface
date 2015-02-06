var jsInterface = require('./index.js');

jsInterface.define({name: 'interface1', methods: ['method1'], properties: ['prop1']});

var module1 = {
  method1: function() { },
  method2: function() { },
  prop1: 'test',
  prop2: false
};

var module2 = {
  method1: function() { },
  prop2: false
};

// runs - no error
jsInterface.checkComplies(module1, 'interface1');

// returns true
console.log(jsInterface.complies(module1, 'interface1')); // true

// throws error
try {
  jsInterface.checkComplies(module2, 'interface1');
} catch(err) {
  console.log(err.name); // MissingPropertyError
}

// returns false
console.log(jsInterface.complies(module2, 'interface1')); // false

// only interface fields & properties will be available on if1Module1
var wrapped1 = jsInterface.wrap(module1, 'interface1');
console.log(typeof wrapped1.method1); // function
console.log(typeof wrapped1.method2); // undefined

// throws error
try {
  var wrapped2 = jsInterface.wrap(module2, 'interface1');
} catch(err) {
  console.log(err.name); // MissingPropertyError
}