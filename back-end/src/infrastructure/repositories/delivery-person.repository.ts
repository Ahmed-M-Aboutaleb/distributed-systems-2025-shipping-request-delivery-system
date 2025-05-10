import DeliveryPerson from "@domain/entities/delivery-person.entity";
import { Collection, Db, ObjectId } from "mongodb";

class DeliveryPersonRepository {
  private collection: Collection;
  constructor(db: Db) {
    this.collection = db.collection("deliveryPersons");
  }

  async findAll(): Promise<DeliveryPerson[]> {
    const deliveryPersonsData = await this.collection.find().toArray();
    return deliveryPersonsData.map((data) => DeliveryPerson.fromDocument(data));
  }

  async findById(id: string | ObjectId): Promise<DeliveryPerson | null> {
    const objectId = this.toObjectId(id);
    const deliveryPersonData = await this.collection.findOne({ _id: objectId });
    return deliveryPersonData
      ? DeliveryPerson.fromDocument(deliveryPersonData)
      : null;
  }

  async findByEmail(email: string): Promise<DeliveryPerson | null> {
    const deliveryPersonData = await this.collection.findOne({
      email: email,
    });
    return deliveryPersonData
      ? DeliveryPerson.fromDocument(deliveryPersonData)
      : null;
  }

  async create(deliveryPerson: DeliveryPerson): Promise<DeliveryPerson> {
    const deliveryPersonData = deliveryPerson.toJSON();
    const result = await this.collection.insertOne(deliveryPersonData);
    return this.findById(result.insertedId) as Promise<DeliveryPerson>;
  }

  async update(deliveryPerson: DeliveryPerson): Promise<DeliveryPerson> {
    const deliveryPersonData = deliveryPerson.toJSON();
    await this.collection.updateOne(
      { _id: deliveryPerson.id },
      { $set: deliveryPersonData },
      { upsert: true }
    );
    return this.findById(deliveryPerson.id) as Promise<DeliveryPerson>;
  }

  async delete(id: string | ObjectId): Promise<boolean> {
    const objectId = this.toObjectId(id);
    const deleteResult = await this.collection.deleteOne({ _id: objectId });
    return deleteResult.acknowledged && deleteResult.deletedCount === 1;
  }
  private toObjectId(id: string | ObjectId): ObjectId {
    return typeof id === "string" ? new ObjectId(id) : id;
  }
}

export default DeliveryPersonRepository;
