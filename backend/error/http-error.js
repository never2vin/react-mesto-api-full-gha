class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.message = message;
  }

  static BadRequestError(message) {
    return new HttpError(400, message);
  }

  static UnauthorizedError(message = 'Email или пароль неверный') {
    return new HttpError(401, message);
  }

  static ForbiddenError(message) {
    return new HttpError(403, message);
  }

  static NotFoundError(message) {
    return new HttpError(404, message);
  }

  static ConflictError(message) {
    return new HttpError(409, message);
  }
}

module.exports = HttpError;
