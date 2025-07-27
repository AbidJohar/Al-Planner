import { Suspense } from "react";
import { fetchAllDesignById } from "@/actions/get-all-generatedDesigns-byuserId";
import Container from "@/components/Container";
import Designs from "@/components/Designs";
import { auth } from "@clerk/nextjs/server";
import { Skeleton } from "@/components/ui/skeleton";
import FilterControll from "./_components/filter-control";

interface designPageProps {
  searchParams?: Promise<{
    popularity?: "popular_asc" | "popular_desc";
    date?: "date_asc" | "date_desc";
  }>;
}

interface designWrapperProps {
  popularity?: "popular_asc" | "popular_desc";
  date?: "date_asc" | "date_desc";
  userId: string | null;
}

const DesignWrapper = async ({
  popularity,
  date,
  userId,
}: designWrapperProps) => {
  const designs = await fetchAllDesignById(null, popularity, date);

  return <Designs designs={designs} isDesigingPage userId={userId} />;
};

const DesignSkeleton = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({length : 6}).map((_,index)=> (

    <div key={index} className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>

        ))}
    </div>
  );
};

export default async function DesignPage({ searchParams }: designPageProps) {
  const resolvedParams = await searchParams;
  const popularity = resolvedParams?.popularity;
  const date = resolvedParams?.date;

  const { userId } = await auth();

  return (
    <section>
      <Container className="p-4 md:p-8 space-y-8">
        <FilterControll/>
        <Suspense key={popularity} fallback={<DesignSkeleton />}>
          <DesignWrapper popularity={popularity} date={date} userId={userId} />
        </Suspense>
      </Container>
    </section>
  );
}
