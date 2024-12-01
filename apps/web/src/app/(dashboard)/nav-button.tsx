"use client";

import { cn } from "@unsend/ui";
import { SidebarMenuButton, SidebarMenuItem } from "@unsend/ui/src/sidebar";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const NavButton: React.FC<{
  href?: string;
  target_blank?: boolean;
  children: React.ReactNode;
  comingSoon?: boolean;
    onClick?: () => void;
}> = ({ href, children, comingSoon, target_blank, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname?.startsWith(href ?? "");

  if (comingSoon) {
    return (
      <div className="flex items-center justify-between hover:text-primary cursor-not-allowed mt-1">
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary cursor-not-allowed",
            isActive ? "bg-secondary" : "text-muted-foreground"
          )}
        >
          {children}
        </div>
        <div className="text-muted-foreground px-4 py-0.5 text-xs bg-muted rounded-full">
          soon
        </div>
      </div>
    );
  }

  if (href) {
    return (
      <Link
        href={href}
        target={target_blank ? "_blank" : undefined}
        className={cn(
          "rounded-lg",
          isActive
            ? "bg-secondary text-sidebar-foreground"
            : "text-muted-foreground bg-transparent"
        )}
      >
        <SidebarMenuItem>
          <SidebarMenuButton>{children}</SidebarMenuButton>
        </SidebarMenuItem>
      </Link>
    );
  }

  return (
    <div
      className={cn(
        "rounded-lg",
        "text-muted-foreground bg-transparent"
      )}
    >
            <SidebarMenuItem onClick={onClick}>
        <SidebarMenuButton>{children}</SidebarMenuButton>
      </SidebarMenuItem>
    </div>
  );
};

export const LogoutButton: React.FC = () => {
  return (
    <button
      className="w-full justify-start flex items-center gap-2 rounded-lg py-2 transition-all hover:text-primary text-muted-foreground"
      onClick={() => signOut()}
    >
      <LogOut className="h-4 w-4" />
      Logout
    </button>
  );
};
