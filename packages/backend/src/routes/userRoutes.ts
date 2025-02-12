import { Router } from "express";
import { userController } from "../controller/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

/**
 * @swagger
 * /api/users/update-user-data:
 *   put:
 *     summary: Update user data
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               totalAverageWeightRatings:
 *                 type: number
 *                 description: User's total average weight ratings
 *               numberOfRents:
 *                 type: number
 *                 description: Number of rents by the user
 *               recentlyActive:
 *                 type: number
 *                 description: Timestamp of user's last activity
 *     responses:
 *       200:
 *         description: User data updated successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.put("/update-user-data", authMiddleware, userController.updateUserData);

/**
 * @swagger
 * /api/users/fetch-user-data:
 *   get:
 *     summary: Fetch user data
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: User ID
 *                 totalAverageWeightRatings:
 *                   type: number
 *                   description: User's total average weight ratings
 *                 numberOfRents:
 *                   type: number
 *                   description: Number of rents by the user
 *                 recentlyActive:
 *                   type: number
 *                   description: Timestamp of user's last activity
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get("/fetch-user-data", authMiddleware, userController.fetchUserData);

export default router;
