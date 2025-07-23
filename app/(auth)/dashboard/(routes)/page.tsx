import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CustumBreadCrump from "@/components/CustumBreadCrump";
import Container from "@/components/Container";
import Client from "../(component)/Client";

const  DashboardPage = async () => {

  const userId = await auth();

  if(!userId)  redirect('/sign-in');

   const user = await currentUser();
   if(!user) redirect('/sign-in');

   const loggedInUser = {
    id : user.id,
    fullName : user.fullName + " " + user.lastName,
    email: user.emailAddresses[0].emailAddress,
    imageUrl : user.imageUrl
   }

  return (
      <Container className="p-4  ">
        <CustumBreadCrump breadCrumbPage="Overview" breadCrumbitems={[{label : "Dashboard", link: "/dashboard"}]} />

        <Client user={loggedInUser} />
     </Container>
  )
}

export default DashboardPage;