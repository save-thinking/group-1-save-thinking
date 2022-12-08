/** Storage Service - Exceptions
 @module storage/exceptions
 */
/**
 * Storage Error
 * @class StorageError
 */
export class StorageError extends Error {
  constructor (message) {
    super(message)
    this.name = 'StorageError'
    this.message = message
  }
}
