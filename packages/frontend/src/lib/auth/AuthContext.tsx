"use client";

import { userApi } from "@/api/userApi";
import { setLoading, setUser } from "@/store/slices/userSlice";
import { User as FirebaseUser } from "firebase/auth";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../firebase/config";

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setAuthLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setFirebaseUser(user);
      setAuthLoading(false);

      if (user) {
        dispatch(setLoading(true));
        try {
          const userData = await userApi.fetchUserData();
          dispatch(setUser(userData));
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        } finally {
          dispatch(setLoading(false));
        }
      } else {
        dispatch(setUser(null));
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [dispatch, router]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
