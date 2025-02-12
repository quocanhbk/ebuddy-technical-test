import { LoginForm } from "@/components/ui/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login page",
};

export default function LoginPage() {
  return <LoginForm />;
}
