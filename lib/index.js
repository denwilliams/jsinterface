var errors = require('./errors');

module.exports = new JsInterfaceContainer();

function JsInterfaceContainer() {
  this._definitions = {};
}

JsInterfaceContainer.prototype.createContainer = function() {
  return new JsInterfaceContainer();
};

JsInterfaceContainer.prototype.define = function(interface) {
  if (!interface) throw new errors.ArgumentNullError('Argument cannot be null: interface');
  if (!interface.name) throw new errors.ArgumentNullError('Argument cannot be null: interface.name');

  var result = this._definitions[interface.name] = createInterface(interface);
  return result;
};

JsInterfaceContainer.prototype.complies = function(obj, interface) {
  return this._definitions[interface].complies(obj);
};

JsInterfaceContainer.prototype.checkComplies = function(obj, interface) {
  this._definitions[interface].checkComplies(obj);
};

JsInterfaceContainer.prototype.wrap = function(obj, interface) {
  this._definitions[interface].wrap(obj);
};


// -- private --

function createInterface(interface) {

  return {
    complies: complies.bind(null, false),
    checkComplies: complies.bind(null, true),
    wrap: wrapInterface
  };

  function complies(throwError, obj) {

    var ok = true;

    if (interface.methods) {
      interface.methods.forEach(function(method) {
        if (typeof obj[method] !== 'function') {
          if (throwError) throw new errors.MissingMethodError('Missing required method: ' + method);
          ok = false;
        }
      });
    }

    if (interface.properties) {
      interface.properties.forEach(function(prop) {
        if (typeof obj[prop] === 'undefined') {
          if (throwError) throw new errors.MissingPropertyError('Missing required property: ' + prop);
          ok = false;
        }
      });
    }

    return ok;

  }

  function wrapInterface(obj) {
    var wrapper = {};
    complies(true, obj);
    if (interface.methods) {
      interface.methods.forEach(function(method) {
        wrapper[method] = obj[method].bind(obj);
      });
    }
    if (interface.properties) {
      interface.properties.forEach(function(prop) {
        Object.defineProperty(wrapper, prop, {get: function() { return obj[prop]; }});
      });
    }
    return wrapper;
  }
}
