
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CustumBreadCrump from "@/components/CustumBreadCrump";
import Container from "@/components/Container";
import Client from "../(component)/Client";
import { fetchAllDesignById } from "@/actions/get-all-generatedDesigns-byuserId";
import Designs from "@/components/Designs";

const  DashboardPage = async () => {

  const {userId} = await auth();

  if(!userId)  redirect('/sign-in');

   const user = await currentUser();
   if(!user) redirect('/sign-in');

   const loggedInUser = {
    id : user.id,
    fullName : user.fullName + " " + user.lastName,
    email: user.emailAddresses[0].emailAddress,
    imageUrl : user.imageUrl
   }

   //__________( fetch all data)___________
   const designs = await fetchAllDesignById(user.id)
 
  return (
      <Container className="p-4  ">
        <CustumBreadCrump breadCrumbPage="Overview" breadCrumbitems={[{label : "Dashboard", link: "/dashboard"}]} />

        <Client user={loggedInUser} />
        <Designs designs={designs} userId = {userId} />
     </Container>
  )
}

export default DashboardPage;