class DatabaseServerError extends Error {
  constructor(message: string = "Database server error") {
    super(message);
    this.name = "DatabaseServerError";
  }
}

export default DatabaseServerError;
