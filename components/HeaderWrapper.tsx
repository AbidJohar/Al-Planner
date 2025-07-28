// components/HeaderWrapper.tsx (Server Component)
import { auth } from "@clerk/nextjs/server";
import Header from "./Header"; // <- Your Client Header

export default async function HeaderWrapper() {
  const { isAuthenticated } = await auth();


  return <Header isAuthenticated={isAuthenticated} />;
}