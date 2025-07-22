import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const  DashboardPage = async () => {

  const userId = await auth();

  if(!userId)  redirect('/sign-in')

  return (
    <div> DashboardPage</div>
  )
}

export default DashboardPage;