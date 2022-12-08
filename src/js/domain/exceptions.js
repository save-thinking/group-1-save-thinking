/** Domain Service - Exceptions
 @module domain/exceptions
 */
/**
 * Validation Error
 * @class ValidationError
 */
export class ValidationError extends Error {
  constructor (message) {
    super(message)
    this.name = 'ValidationError'
  }
}
/**
 * MissingFieldError
 * @class MissingFieldError
 */
export class MissingFieldError extends ValidationError {
  constructor (property) {
    super('Missing: ' + property)
    this.name = 'ValidationError'
    this.property = property
  }
}
/**
 * FormattingError
 * @class FormattingError
 */
export class FormattingError extends ValidationError {
  constructor (property) {
    super('Format Error: ' + property)
    this.name = 'ValidationError'
    this.property = property
  }
}

export class InvalidAmountError extends ValidationError {
  constructor (property) {
    super('Invalid Amount: ' + property)
    this.name = 'InvalidAmountError'
    this.property = property
  }
}
