import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CustumBreadCrump from "@/components/CustumBreadCrump";
import Container from "@/components/Container";
import Client from "../(component)/Client";
import Designs from "@/components/Designs";

const DashboardPage = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const loggedInUser = {
    id: user.id,
    fullName: user.fullName + " " + user.lastName,
    email: user.emailAddresses[0].emailAddress,
    imageUrl: user.imageUrl,
  };

  // fetch first page on server
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/designs/user`,
    {
      cache: "no-store",
      headers: {
        // pass cookies so auth() works in the API route
        Cookie: (await import("next/headers")).cookies().toString(),
      },
    }
  );
  const { designs, nextCursor, hasMore } = await res.json();

  return (
    <Container className="p-4">
      <CustumBreadCrump
        breadCrumbPage="Overview"
        breadCrumbitems={[{ label: "Dashboard", link: "/dashboard" }]}
      />
      <Client user={loggedInUser} />
      <Designs
        initialDesigns={designs}
        initialCursor={nextCursor}
        initialHasMore={hasMore}
        isDesigingPage={true}
        userId={userId}
      />
    </Container>
  );
};

export default DashboardPage;