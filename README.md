# jsinterface
Implement duck-type interfaces in Node JS

```js
var jsInterface = require('jsinterface');

jsInterface.define({name: 'interface1', methods: 'method1', properties: 'prop1'});
```

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
jsInterface.complies(module1, 'interface1');

// throws error
jsInterface.checkComplies(module2, 'interface1');

// returns false
jsInterface.complies(module2, 'interface1');

// only interface fields & properties will be available on if1Module1
var if1Module1 = jsInterface.compile(module1, 'interface1');

// throws error
var if1Module2 = jsInterface.compile(module2, 'interface1');
```
