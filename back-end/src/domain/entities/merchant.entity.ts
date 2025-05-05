import Address from "@domain/value-objects/Address";
import { ObjectId } from "mongodb";
import IMerchant from "../interfaces/IMerchant";

class Merchant {
  private readonly _id: ObjectId;
  private _name: string;
  private _email: string;
  private _passwordHash: string;
  private _companyName: string;
  private _phoneNumber: string;
  private _businessAddress: Address;
  private _isActive: boolean;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: ObjectId | null,
    name: string,
    email: string,
    passwordHash: string,
    companyName: string,
    phoneNumber: string,
    businessAddress: Address,
    isActive: boolean = true,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this._id = id || new ObjectId();
    if (!name || name.trim().length === 0) throw new Error("Name is required");
    if (!email || email.trim().length === 0)
      // TODO: Implement real-world email validation logic
      throw new Error("Email is required");
    if (!passwordHash || passwordHash.trim().length === 0)
      throw new Error("Password hash is required");
    if (!companyName || companyName.trim().length === 0)
      throw new Error("Company name is required");
    if (!phoneNumber || phoneNumber.trim().length === 0)
      throw new Error("Phone number is required");
    if (!businessAddress) throw new Error("Business address is required");
    if (!(businessAddress instanceof Address))
      throw new Error("Business address must be an instance of Address");
    if (typeof isActive !== "boolean")
      throw new Error("isActive must be a boolean");
    if (isActive === null || isActive === undefined)
      throw new Error("isActive is required");

    this._name = name;
    this._email = email;
    this._passwordHash = passwordHash;
    this._companyName = companyName;
    this._phoneNumber = phoneNumber;
    this._businessAddress = businessAddress;
    this._isActive = isActive;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  get id(): ObjectId {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get email(): string {
    return this._email;
  }
  get companyName(): string {
    return this._companyName;
  }
  get phoneNumber(): string {
    return this._phoneNumber;
  }
  get businessAddress(): Address {
    return this._businessAddress;
  }
  get isActive(): boolean {
    return this._isActive;
  }
  get createdAt(): Date {
    return this._createdAt;
  }
  get updatedAt(): Date {
    return this._updatedAt;
  }

  set name(name: string) {
    if (!name || name.trim().length === 0) throw new Error("Name is required");
    this._name = name;
    this._updatedAt = new Date();
  }
  set email(email: string) {
    // TODO: Implement real-world email validation logic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.trim().length === 0)
      throw new Error("Email is required");
    if (!emailRegex.test(email)) throw new Error("Email is not valid");
    this._email = email;
    this._updatedAt = new Date();
  }
  set companyName(companyName: string) {
    if (!companyName || companyName.trim().length === 0)
      throw new Error("Company name is required");
    this._companyName = companyName;
    this._updatedAt = new Date();
  }
  set passwordHash(passwordHash: string) {
    if (!passwordHash || passwordHash.trim().length === 0)
      throw new Error("Password hash is required");
    this._passwordHash = passwordHash;
    this._updatedAt = new Date();
  }
  set phoneNumber(phoneNumber: string) {
    if (!phoneNumber || phoneNumber.trim().length === 0)
      throw new Error("Phone number is required");
    this._phoneNumber = phoneNumber;
    this._updatedAt = new Date();
  }
  set businessAddress(businessAddress: Address) {
    if (!businessAddress) throw new Error("Business address is required");
    if (!(businessAddress instanceof Address))
      throw new Error("Business address must be an instance of Address");
    this._businessAddress = businessAddress;
    this._updatedAt = new Date();
  }
  deactivate(): void {
    this._isActive = false;
    this._updatedAt = new Date();
  }
  activate(): void {
    this._isActive = true;
    this._updatedAt = new Date();
  }
  validatePassword(plainPassword: string): boolean {
    if (!plainPassword || plainPassword.trim().length === 0)
      throw new Error("Password is required");
    // TODO: Implement password hashing and comparison logic
    return this._passwordHash === plainPassword;
  }
  toJSON(): IMerchant {
    return {
      _id: this._id,
      name: this._name,
      email: this._email,
      companyName: this._companyName,
      passwordHash: this._passwordHash,
      phoneNumber: this._phoneNumber,
      businessAddress: this._businessAddress.toJSON(),
      isActive: this._isActive,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }

  static fromDocument(document: any): Merchant {
    return new Merchant(
      document._id,
      document.name,
      document.email,
      document.passwordHash,
      document.companyName,
      document.phoneNumber,
      document.businessAddress,
      document.isActive,
      document.createdAt,
      document.updatedAt
    );
  }
}

export default Merchant;
