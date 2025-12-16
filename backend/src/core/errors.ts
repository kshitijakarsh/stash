export class AppError extends Error {
  status: number;
  code: string;

  constructor(message: string, status = 400, code = "BAD_REQUEST") {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export class AuthError extends AppError {
  constructor(message = "Authentication failed") {
    super(message, 401, "AUTH_ERROR");
  }
}

export class InvalidCredentialsError extends AuthError {
  constructor() {
    super("Invalid email or password");
    this.code = "INVALID_CREDENTIALS";
  }
}

export class EmailAlreadyExistsError extends AppError {
  constructor() {
    super("Email already registered", 409, "EMAIL_EXISTS");
  }
}

export class ValidationError extends AppError {
  constructor(message = "Invalid request data") {
    super(message, 422, "VALIDATION_ERROR");
  }
}

export class DatabaseError extends AppError {
  constructor(message = "Database operation failed") {
    super(message, 500, "DATABASE_ERROR");
  }
}
