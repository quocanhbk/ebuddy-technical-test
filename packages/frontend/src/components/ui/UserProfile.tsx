"use client";

import { userApi } from "@/api/userApi";
import { auth } from "@/lib/firebase/config";
import { setUser } from "@/store/slices/userSlice";
import { RootState } from "@/store/store";
import { LogoutRounded, RefreshRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { UserUpdateData } from "@repo/shared";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function UserProfile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<UserUpdateData>({
    totalAverageWeightRatings: 0,
    numberOfRents: 0,
    recentlyActive: Date.now(),
  });

  // Update form data when user data changes
  useEffect(() => {
    if (user) {
      setFormData({
        totalAverageWeightRatings: user.totalAverageWeightRatings,
        numberOfRents: user.numberOfRents,
        recentlyActive: user.recentlyActive,
      });
    }
  }, [user]);

  const handleRefresh = async () => {
    setRefreshing(true);
    setError("");
    try {
      const updatedUser = await userApi.fetchUserData();
      dispatch(setUser(updatedUser));
    } catch (err) {
      setError("Failed to refresh user data");
    } finally {
      setRefreshing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await userApi.updateUserData(formData);
      const updatedUser = await userApi.fetchUserData();
      dispatch(setUser(updatedUser));
    } catch (err) {
      setError("Failed to update user data");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch(setUser(null));
      router.push("/login");
    } catch (err) {
      console.error("Logout Error:", err);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="h4" component="h1">
                User Profile
              </Typography>
              <Tooltip title="Refresh Data">
                <IconButton
                  onClick={handleRefresh}
                  disabled={refreshing}
                  color="primary"
                  size="small"
                >
                  <RefreshRounded />
                </IconButton>
              </Tooltip>
            </Stack>
            <Button
              variant="outlined"
              color="error"
              onClick={handleLogout}
              startIcon={<LogoutRounded />}
            >
              Logout
            </Button>
          </Stack>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Total Average Weight Ratings"
                type="number"
                value={formData.totalAverageWeightRatings}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    totalAverageWeightRatings: parseFloat(e.target.value),
                  })
                }
                disabled={refreshing}
              />

              <TextField
                label="Number of Rents"
                type="number"
                value={formData.numberOfRents}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    numberOfRents: parseInt(e.target.value),
                  })
                }
                disabled={refreshing}
              />

              {error && (
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                disabled={loading || refreshing}
                sx={{ mt: 2 }}
              >
                {loading ? "Updating..." : "Update Profile"}
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}
