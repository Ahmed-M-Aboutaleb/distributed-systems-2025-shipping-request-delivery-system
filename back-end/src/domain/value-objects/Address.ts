class Address {
  private readonly _apartment?: string;
  private readonly _street: string;
  private readonly _city: string;
  private readonly _state: string;
  private readonly _zipCode: string;
  private readonly _country: string;

  constructor(
    street: string,
    city: string,
    state: string,
    zipCode: string,
    country: string,
    apartment?: string
  ) {
    if (!street || street.trim().length === 0)
      throw new Error("Street is required");
    if (!city || city.trim().length === 0) throw new Error("City is required");
    if (!state || state.trim().length === 0)
      throw new Error("State is required");
    if (!zipCode || zipCode.trim().length === 0)
      throw new Error("Zip code is required");
    if (!country || country.trim().length === 0)
      throw new Error("Country is required");
    this._street = street;
    this._city = city;
    this._state = state;
    this._zipCode = zipCode;
    this._country = country;
    this._apartment = apartment;
  }

  get apartment(): string | undefined {
    return this._apartment;
  }

  get street(): string {
    return this._street;
  }

  get city(): string {
    return this._city;
  }
  get state(): string {
    return this._state;
  }
  get zipCode(): string {
    return this._zipCode;
  }
  get country(): string {
    return this._country;
  }
  getFormattedAddress(): string {
    const apartmentPart = this._apartment ? `${this._apartment}, ` : "";
    return `${apartmentPart}${this._street}, ${this._city}, ${this._state} ${this._zipCode}, ${this._country}`;
  }

  equal(other: Address): boolean {
    return (
      this._street === other._street &&
      this._city === other._city &&
      this._state === other._state &&
      this._zipCode === other._zipCode &&
      this._country === other._country &&
      this._apartment === other._apartment
    );
  }

  update(updatedAddress: Partial<Address>): Address {
    return new Address(
      updatedAddress.street || this._street,
      updatedAddress.city || this._city,
      updatedAddress.state || this._state,
      updatedAddress.zipCode || this._zipCode,
      updatedAddress.country || this._country,
      updatedAddress.apartment || this._apartment
    );
  }

  toJSON(): object {
    return {
      apartment: this._apartment,
      street: this._street,
      city: this._city,
      state: this._state,
      zipCode: this._zipCode,
      country: this._country,
    };
  }

  static fromDocumant(doc: any): Address {
    return new Address(
      doc.street,
      doc.city,
      doc.state,
      doc.zipCode,
      doc.country,
      doc.apartment
    );
  }
}

export default Address;
