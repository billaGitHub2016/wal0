import { Types } from "mongoose";

export interface Wallet {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  suiBalance: number;
  usdBalance: number;
  createdAt: Date;
  updatedAt: Date;
}