import { auth } from "@/lib/firebase/config";
import { User, UserUpdateData } from "@repo/shared";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

async function getAuthHeaders() {
  const token = await auth.currentUser?.getIdToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export const userApi = {
  async fetchUserData(): Promise<User> {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}/users/fetch-user-data`, {
      headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    return response.json();
  },

  async updateUserData(data: UserUpdateData): Promise<void> {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}/users/update-user-data`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update user data");
    }
  },
};
