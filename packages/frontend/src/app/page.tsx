import { UserProfile } from "@/components/ui/UserProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Profile page",
};

export default function ProfilePage() {
  return <UserProfile />;
}
