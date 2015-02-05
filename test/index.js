var jsInterface = require('../');

require('should');

var if1 = jsInterface.define({name:'if1', methods:['method1'], properties:['prop1']});
var if2 = jsInterface.define({name:'if2', methods:['method2'], properties:['prop2']});

var obj1 = {
  method1: function() {},
  method2: function() {},
  prop1: 'prop1',
  prop2: 'prop2'
};

var obj2 = {
  method1: function() {},
  prop2: 'prop2'
};

var obj3 = {
  method2: function() {},
  prop1: 'prop1'
};

var obj4 = {
  method2: function() {},
  prop2: 'prop2'
};

var obj5 = {
  method2: function() {},
};

var obj6 = {
  prop2: 'prop2'
};

describe('complies', function() {

  it('should return true if methods and props exist', function() {
    var result1 = if1.complies(obj1);
    var result2 = jsInterface.complies(obj1, 'if1');

    result1.should.be.true;
    result2.should.be.true;
  });

  it('should return false if methods dont exist', function() {
    var result1 = if1.complies(obj2);
    var result2 = jsInterface.complies(obj2, 'if1');

    result1.should.be.false;
    result2.should.be.false;
  });


  it('should return false if props dont exist', function() {
    var result1 = if1.complies(obj3);
    var result2 = jsInterface.complies(obj3, 'if1');

    result1.should.be.false;
    result2.should.be.false;
  });

});

describe('checkComplies', function() {

  it('should succeed false if all methods and properties exist', function(done) {

    try {
      if1.checkComplies(obj1);
      done();
    } catch(err) {
      done(err);
    }
  });


  it('should throw error false if methods dont exist', function(done) {

    try {
      if1.checkComplies(obj3);
      done(new Error('Should have thrown error'));
    } catch(err) {
      if (err.name === 'MissingMethodError') done();
      else done(err);
    }

  });


  it('should throw error false if properties dont exist', function(done) {

    try {
      if1.checkComplies(obj2);
      done(new Error('Should have thrown error'));
    } catch(err) {
      if (err.name === 'MissingPropertyError') done();
      else done(err);
    }

  });


  it('should throw missing method error false if both properties and errors dont exist', function(done) {

    try {
      if1.checkComplies(obj4);
      done(new Error('Should have thrown error'));
    } catch(err) {
      if (err.name === 'MissingMethodError') done();
      else done(err);
    }

  });

});

describe('wrap', function() {

  it('should expose only interface methods and properties', function(done) {

    var wrapped = if1.wrap(obj1);

    (typeof obj1.method1).should.be.equal('function');
    (typeof wrapped.method1).should.be.equal('function');

    (typeof obj1.method2).should.be.equal('function');
    (typeof wrapped.method2).should.be.equal('undefined');

    (typeof obj1.prop1).should.not.be.equal('undefined');
    (obj1.prop1).should.be.equal(wrapped.prop1);
    
    (typeof wrapped.prop2).should.be.equal('undefined');
    (obj1.prop2).should.not.be.equal(wrapped.prop2);

    done();
  });

  it('should throw error false if methods or properties dont exist', function(done) {

    try {
      if1.wrap(obj3);
      done(new Error('Should have thrown error'));
    } catch(err) {
      if (err.name === 'MissingMethodError') done();
      else done(err);
    }

  });

});
