import IDimensions from "../interfaces/IDimensions";

class PackageDetails {
  constructor(
    private readonly _weight: number,
    private readonly _dimensions: IDimensions,
    private readonly _fragile: boolean
  ) {}

  get weight(): number {
    return this._weight;
  }

  get dimensions(): IDimensions {
    return this._dimensions;
  }

  get fragile(): boolean {
    return this._fragile;
  }

  getFormattedDimensions(): string {
    return `${this._dimensions.length} x ${this._dimensions.width} x ${this._dimensions.height}`;
  }

  getFormattedWeight(): string {
    return `${this._weight} kg`;
  }

  getFormattedFragile(): string {
    return this._fragile ? "Yes" : "No";
  }

  getFormattedDetails(): string {
    return `Weight: ${this.getFormattedWeight()}, Dimensions: ${this.getFormattedDimensions()}, Fragile: ${this.getFormattedFragile()}`;
  }

  static fromDocument(json: any): PackageDetails {
    if (!json) throw new Error("Invalid JSON data");
    const { weight, dimensions, fragile } = json;
    if (
      weight === undefined ||
      dimensions === undefined ||
      fragile === undefined
    )
      throw new Error("Missing required fields in JSON data");
    return new PackageDetails(weight, dimensions, fragile);
  }

  toJSON(): any {
    return {
      weight: this._weight,
      dimensions: this._dimensions,
      fragile: this._fragile,
    };
  }
}

export default PackageDetails;
