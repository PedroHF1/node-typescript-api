import mongoose, { Model, Schema } from 'mongoose';

export enum GeoPosition {
  S = 'S',
  E = 'E',
  W = 'W',
  N = 'N',
}

export interface Beach {
  _id?: string;
  name: string;
  position: GeoPosition;
  lat: number;
  lng: number;
  user: Schema.Types.ObjectId | string;
}

const schema = new mongoose.Schema<Beach>(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    name: { type: String, required: true },
    position: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

// interface BeachModel extends Omit<Beach, '_id'>, Document {}
export const Beach: Model<Beach> = mongoose.model('Beach', schema);