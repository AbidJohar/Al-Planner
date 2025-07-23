import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

interface breadCrumbProps {
  breadCrumbitems?: { link: string; label: string }[];
  breadCrumbPage: string;
}

const CustumBreadCrump = ({
  breadCrumbPage,
  breadCrumbitems,
}: breadCrumbProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/"
            className="flex items-center justify-center hover:text-blue-600"
          >
            <Home className="h-4 w-4 mr-2" /> Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadCrumbitems && (
          <React.Fragment>
            {breadCrumbitems.map((item, index) => {
              return (
                <React.Fragment key={item.link + index}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href={item.link} className="hover:text-blue-600">
                      {item.label}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </React.Fragment>
              );
            })}
          </React.Fragment>
        )}
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{breadCrumbPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustumBreadCrump;
