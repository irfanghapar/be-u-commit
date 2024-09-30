"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/sidebar/SideBarNav";
import { useEffect, useState } from "react";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const hideSidebarRoutes = ["/sign-in", "/sign-up"];
    setShowSidebar(!hideSidebarRoutes.includes(pathname));
  }, [pathname]);

  return (
    <>
      {showSidebar && <Sidebar />}
      <main className={`mx-5 mt-16 ${showSidebar ? "sm:ml-[300px]" : ""} sm:mt-3`}>
        {children}
      </main>
    </>
  );
}