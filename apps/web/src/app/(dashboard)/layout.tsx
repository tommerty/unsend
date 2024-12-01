import { DashboardProvider } from "~/providers/dashboard-provider";
import { NextAuthProvider } from "~/providers/next-auth";
import { DashboardLayout } from "./dasboard-layout";
import {SidebarProvider } from "@unsend/ui/src/sidebar"
import { DashboardSidebar } from "./dashboard-sidebar";
export const dynamic = "force-static";

export default function AuthenticatedDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <SidebarProvider>
    <NextAuthProvider>
      <DashboardProvider>
        {/* <DashboardSidebar/> */}
        <DashboardLayout>{children}</DashboardLayout>
      </DashboardProvider>
    </NextAuthProvider>
    // </SidebarProvider>
  );
}
