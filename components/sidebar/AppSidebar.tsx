"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Notebook, FileCheck } from "lucide-react";

// Menu items.
const items = [
    {
        title: "ဇယားများ",
        url: "/",
        icon: LayoutDashboard,
    },
    {
        title: "နေ့စဉ်မှတ်တမ်းများ",
        url: "/daily",
        icon: Notebook,
    },
    {
        title: "တရားစွဲပြီးသောမှတ်တမ်းများ",
        url: "/case",
        icon: FileCheck,
    }
]

export function AppSidebar() {
    const pathName = usePathname();
    return (
        <Sidebar variant="inset">
            <SidebarContent>
                <SidebarGroup>
                    <h1 className="text-primary font-bold text-xl mb-7">Kayin Traffic Log</h1>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title} className="my-1" >
                                    <SidebarMenuButton
                                        asChild
                                    >
                                        <Link
                                            href={item.url}
                                            className={cn(
                                                pathName === item.url ? "bg-primary/20 text-primary" : "bg-gray-100",
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
        </Sidebar>
    )
}
