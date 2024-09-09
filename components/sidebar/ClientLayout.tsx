"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/sidebar/SideBarNav";
import { useEffect, useState } from "react";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Get the current route on the client side
  const [showSidebar, setShowSidebar] = useState(true); // Sidebar visibility state

  useEffect(() => {
    const hideSidebarRoutes = ["/sign-in", "/sign-up"]; // Routes to hide sidebar
    setShowSidebar(!hideSidebarRoutes.includes(pathname));
  }, [pathname]); // Update whenever the route changes

  return (
    <>
      {showSidebar && <Sidebar />} 
      <main className={`mx-5 mt-16 ${showSidebar ? "sm:ml-[300px]" : ""} sm:mt-3`}>
        {children}
      </main>
    </>
  );
}
