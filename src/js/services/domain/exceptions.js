class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = "ValidationError";
    }
}

class MissingFieldError extends ValidationError {
  constructor(property) {
    super("Missing: " + property);
    this.name = "ValidationError";
    this.property = property;
  }
}

class FormattingError extends ValidationError {
  constructor(property) {
    super("Format Error: " + property);
    this.name = "ValidationError";
    this.property = property;
  }
}

class InvalidAmountError extends ValidationError {
  constructor(property) {
    super("Invalid Amount: " + property);
    this.name = "ValidationError";
    this.property = property;
  }
}

class StorageError extends Error {
    constructor(message) {
      super(message);
      this.name = "StorageError";
      this.property = property;
    }
}
