var errorBuilder = require('error-builder');
module.exports = exports = {
  ArgumentNullError: errorBuilder.create('ArgumentNullError', -101, 'Argument cannot be null'),
  MissingMethodError: errorBuilder.create('MissingMethodError', -201, 'Missing method'),
  MissingPropertyError: errorBuilder.create('MissingPropertyError', -202, 'Missing property')
};
