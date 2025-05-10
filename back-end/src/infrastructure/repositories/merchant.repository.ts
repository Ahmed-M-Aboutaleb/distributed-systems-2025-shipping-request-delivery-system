import { Collection, Db, ObjectId } from "mongodb";
import Merchant from "@/domain/entities/merchant.entity";
import Address from "@domain/value-objects/Address";
import GeneralError from "@/application/errors/general.error";
class MerchantRepository {
  private collection: Collection;
  constructor(db: Db) {
    this.collection = db.collection("merchants");
  }

  async findAll(): Promise<Merchant[]> {
    const merchantsData = await this.collection.find().toArray();
    return merchantsData.map((data) => this.mapToEntity(data));
  }

  async findById(id: string | ObjectId): Promise<Merchant | null> {
    const objectId = typeof id === "string" ? new ObjectId(id) : id;
    const merchantData = await this.collection.findOne({ _id: objectId });
    return merchantData ? this.mapToEntity(merchantData) : null;
  }

  async findByEmail(email: string): Promise<Merchant | null> {
    const merchantData = await this.collection.findOne({
      email: email,
    });
    return merchantData ? this.mapToEntity(merchantData) : null;
  }

  async create(merchant: Merchant): Promise<Merchant> {
    const merchantData = merchant.toJSON();
    const result = await this.collection.insertOne(merchantData);
    return this.findById(result.insertedId) as Promise<Merchant>;
  }

  async update(merchant: Merchant): Promise<Merchant> {
    const merchantData = merchant.toJSON();
    await this.collection.updateOne(
      { _id: merchant.id },
      { $set: merchantData },
      { upsert: true }
    );
    return this.findById(merchant.id) as Promise<Merchant>;
  }

  async delete(id: string | ObjectId): Promise<boolean> {
    const objectId = this.toObjectId(id);
    const deleteResult = await this.collection.deleteOne({ _id: objectId });
    return deleteResult.acknowledged && deleteResult.deletedCount === 1;
  }

  private toObjectId(id: string | ObjectId): ObjectId {
    return typeof id === "string" ? new ObjectId(id) : id;
  }

  private mapToEntity(data: any): Merchant {
    const address = Address.fromDocument(data.businessAddress);
    if (!address) {
      throw new GeneralError("Invalid address data");
    }
    return Merchant.fromDocument({
      ...data,
      businessAddress: address,
    });
  }
}

export default MerchantRepository;
