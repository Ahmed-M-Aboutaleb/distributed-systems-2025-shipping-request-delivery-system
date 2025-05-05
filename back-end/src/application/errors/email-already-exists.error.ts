class EmailAlreadyExistsError extends Error {
  constructor(message: string = "Email already in use") {
    super(message);
    this.name = "EmailAlreadyExistsError";
  }
}
export default EmailAlreadyExistsError;
