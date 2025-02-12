export interface User {
  id: string;
  totalAverageWeightRatings: number;
  numberOfRents: number;
  recentlyActive: number; // epoch time
}

export interface UserUpdateData {
  totalAverageWeightRatings?: number;
  numberOfRents?: number;
  recentlyActive?: number;
}
