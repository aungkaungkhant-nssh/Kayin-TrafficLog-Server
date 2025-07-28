"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Notebook, FileCheck, AlertOctagon, LogOut } from "lucide-react";
import Image from 'next/image'
import { signOut } from "next-auth/react"
import { Button } from "../ui/button";

// Menu items.
const items = [
    {
        title: "ဇယားများ",
        url: "/admin/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "နေ့စဉ်မှတ်တမ်းများ",
        url: "/admin/daily",
        icon: Notebook,
    },
    {
        title: "တရားစွဲပြီးသောမှတ်တမ်းများ",
        url: "/admin/case",
        icon: FileCheck,
    },
    {
        title: "ပြစ်မှုများအများဆုံး ကျူးလွန်သူမှတ်တမ်းများ",
        url: "/admin/top",
        icon: AlertOctagon,
    }
]

export function AppSidebar() {
    const pathName = usePathname();
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <div className="flex flex-col items-center justify-center mt-6 mb-8 space-y-3">
                        <Image
                            src="/police.png"
                            alt="Police Logo"
                            width={60}
                            height={60}
                        />
                        <h1 className="text-center font-bold text-lg text-primary tracking-wide">
                            ယာဉ်စည်းကမ်း ထိန်းသိမ်းရေး ပြစ်မှုမှတ်တမ်း
                            <br className="hidden sm:block" />
                            (ကရင်ပြည်နယ်)
                        </h1>
                    </div>

                    <hr />

                    <SidebarGroupContent className="mt-4">
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title} className="my-1">
                                    <SidebarMenuButton asChild>
                                        <Link
                                            href={item.url}
                                            className={cn(
                                                pathName === item.url
                                                    ? "bg-primary/20 text-primary"
                                                    : "bg-gray-100",
                                                "w-full py-5 group hover:bg-primary/20 hover:text-primary transition-colors duration-300 ease-in-out"
                                            )}
                                        >
                                            <item.icon className="group-hover:text-primary transition-all duration-300 ease-in-out" />
                                            <span className="text-lg">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* ✅ Sidebar Footer with Logout */}
            <SidebarFooter className="p-4 border-t">
                <Button
                    onClick={() => signOut({ callbackUrl: '/' })}
                >
                    <LogOut />
                    <span>ထွက်မည်။</span>
                </Button>
            </SidebarFooter>
        </Sidebar>
    )
}
