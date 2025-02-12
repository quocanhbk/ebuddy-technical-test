import { UserUpdateData } from "@repo/shared";
import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { userCollection } from "../repository/userCollection";

export const userController = {
  async updateUserData(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.uid;
      if (!userId) {
        res.status(401).json({ error: "User not authenticated" });
        return;
      }

      const updateData: UserUpdateData = req.body;
      await userCollection.updateUser(userId, updateData);
      res.status(200).json({ message: "User data updated successfully" });
    } catch (error) {
      console.error("Update User Error:", error);
      res.status(500).json({ error: "Failed to update user data" });
    }
  },

  async fetchUserData(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.uid;
      if (!userId) {
        res.status(401).json({ error: "User not authenticated" });
        return;
      }

      let userData = await userCollection.getUser(userId);

      if (!userData) {
        // Initialize default user data
        const defaultUserData: UserUpdateData = {
          totalAverageWeightRatings: 0,
          numberOfRents: 0,
          recentlyActive: Date.now(),
        };

        await userCollection.createUser(userId, defaultUserData);
        userData = await userCollection.getUser(userId);
      }

      res.status(200).json(userData);
    } catch (error) {
      console.error("Fetch User Error:", error);
      res.status(500).json({ error: "Failed to fetch user data" });
    }
  },
};
