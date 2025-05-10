class GeneralError extends Error {
  constructor(message: string = "Invalid Request") {
    super(message);
    this.name = "GeneralError";
  }
}

export default GeneralError;
