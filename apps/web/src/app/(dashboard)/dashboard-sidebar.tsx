"use client"
import { useTheme } from "@unsend/ui";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@unsend/ui/src/sidebar"
import { env } from "~/env";

import { BookOpenText, BookUser, Code, Globe, LayoutDashboard, LogOut, Mail, Server, User2, Volume2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image";
import { NavButton } from "./nav-button";
import { signOut, useSession } from "next-auth/react";
import { ThemeSwitcher } from "~/components/theme/ThemeSwitcher";


export function DashboardSidebar() {
    const { resolvedTheme } = useTheme();
    const { data: session } = useSession();
    const {
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
    } = useSidebar()
    return (
        <Sidebar collapsible="icon" className="">
            <SidebarHeader>
                <SidebarMenu>
                    <Link href="/">
                        <SidebarMenuItem>
                            <SidebarMenuButton className="font-bold text-lg">
                                <Image
                                    src={resolvedTheme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
                                    alt="Unsend"
                                    width={16}
                                    height={16}
                                />
                                Unsend
                            </SidebarMenuButton>
                            <SidebarMenuBadge>
                                <span className="text-[10px] text-muted-foreground bg-muted p-0.5 px-2 rounded-full">
                                    Early access
                                </span>
                            </SidebarMenuBadge>
                        </SidebarMenuItem>
                    </Link>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        <NavButton href="/dashboard">
                            <LayoutDashboard className="h-4 w-4" />
                            Dashboard
                        </NavButton>
                        <NavButton href="/emails">
                            <Mail className="h-4 w-4" />
                            Emails
                        </NavButton>

                        <NavButton href="/contacts">
                            <BookUser className="h-4 w-4" />
                            Contacts
                        </NavButton>

                        <NavButton href="/campaigns">
                            <Volume2 className="h-4 w-4" />
                            Campaigns
                        </NavButton>

                        <NavButton href="/domains">
                            <Globe className="h-4 w-4" />
                            Domains
                        </NavButton>

                        <NavButton href="/dev-settings">
                            <Code className="h-4 w-4" />
                            Developer settings
                        </NavButton>
                        {!env.NEXT_PUBLIC_IS_CLOUD || session?.user.isAdmin ? (
                            <NavButton href="/admin">
                                <Server className="h-4 w-4" />
                                Admin
                            </NavButton>
                        ) : null}
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <NavButton
                        href="https://docs.unsend.dev"
                        target_blank>
                        <BookOpenText className="h-4 w-4" />
                        Docs
                    </NavButton>
                    <NavButton onClick={() => signOut()}>
                        <LogOut className="h-4 w-4" />
                        Logout
                    </NavButton>

                    <ThemeSwitcher isMobile={isMobile} state={state} />
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
