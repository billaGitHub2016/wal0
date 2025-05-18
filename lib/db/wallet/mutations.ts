import { WalletModel } from "./schema";
import { Wallet } from "./types";

export async function createWallet(userId: string) {
  try {
    const wallet = await WalletModel.create({
      userId,
      suiBalance: 0,
      usdBalance: 0,
    });

    return {
      _id: wallet._id,
      ...wallet.toObject(),
    };
  } catch (error) {
    console.error("Error creating wallet:", error);
    throw error;
  }
}

export async function updateWallet(
  userId: string,
  update: Partial<Pick<Wallet, "suiBalance" | "usdBalance">>
) {
  try {
    const wallet = await WalletModel.findOneAndUpdate(
      { userId },
      { $set: update },
      { new: true }
    ).lean();

    if (!wallet) {
      throw new Error("Wallet not found");
    }

    return wallet;
  } catch (error) {
    console.error("Error updating wallet:", error);
    throw error;
  }
}