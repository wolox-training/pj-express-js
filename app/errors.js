const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.EXTERNAL_API_ERROR = 'external_api_error';
exports.externalApiError = message => internalError(message, exports.EXTERNAL_API_ERROR);

exports.SERVER_ERROR = 'server_error';
exports.serverError = message => internalError(message, exports.EXTERNAL_API_ERROR);

exports.INVALID_PARAMS = 'invalid_params';
exports.invalidParams = message => internalError(message, exports.INVALID_PARAMS);

exports.AUTHENTICATION_ERROR = 'authentication_error';
exports.authenticationError = () =>
  internalError("The password and mail combination doesn't match", exports.AUTHENTICATION_ERROR);

exports.HASH_ERROR = 'hash_error';
exports.hash_error = message => internalError(message, exports.HASH_ERROR);
