import { User, UserUpdateData } from "@repo/shared";
import { DocumentData, QueryDocumentSnapshot } from "firebase-admin/firestore";
import { db } from "../config/firebaseConfig";

const COLLECTION_NAME = "USERS";

export const userCollection = {
  async createUser(userId: string, data: UserUpdateData): Promise<void> {
    await db
      .collection(COLLECTION_NAME)
      .doc(userId)
      .set({
        ...data,
        id: userId,
      });
  },

  async updateUser(userId: string, data: UserUpdateData): Promise<void> {
    await db
      .collection(COLLECTION_NAME)
      .doc(userId)
      .update({
        ...data,
      });
  },

  async getUser(userId: string): Promise<User | null> {
    const doc = await db.collection(COLLECTION_NAME).doc(userId).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as User;
  },

  async getTopUsers(limit: number = 10, startAfter?: any): Promise<User[]> {
    let query = db
      .collection(COLLECTION_NAME)
      .orderBy("totalAverageWeightRatings", "desc")
      .orderBy("numberOfRents", "desc")
      .orderBy("recentlyActive", "desc")
      .limit(limit);

    if (startAfter) {
      query = query.startAfter(startAfter);
    }

    const snapshot = await query.get();
    return snapshot.docs.map(
      (doc: QueryDocumentSnapshot<DocumentData>) =>
        ({ id: doc.id, ...doc.data() }) as User
    );
  },
};
