import RegisterForm from '@/components/RegisterForm';
import { getServerSession } from "next-auth";
import type { NextAuthOptions } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";


export default async function RegisterPage() {
  const session = await getServerSession(authOptions as NextAuthOptions);

  if (session) {
    redirect("/dashboard");
  }
  return <RegisterForm />;
}
