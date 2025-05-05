class AccountDeactivatedError extends Error {
  constructor(message: string = "Account is deactivated") {
    super(message);
    this.name = "AccountDeactivatedError";
  }
}

export default AccountDeactivatedError;
