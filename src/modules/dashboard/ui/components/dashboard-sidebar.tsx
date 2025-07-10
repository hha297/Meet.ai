'use client';

import { Separator } from '@/components/ui/separator';
// imnport all Sidebar components fromn shadcn/ui
import {
        Sidebar,
        SidebarContent,
        SidebarFooter,
        SidebarGroup,
        SidebarGroupContent,
        SidebarHeader,
        SidebarMenu,
        SidebarMenuButton,
        SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { BotIcon, StarIcon, VideoIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DashboardUserButton } from './dashboard-user-button';
import { DashboardTrial } from './dashboard-trial';

const firstSection = [
        {
                icon: VideoIcon,
                label: 'Meetings',
                href: '/meetings',
        },
        {
                icon: BotIcon,
                label: 'Agents',
                href: '/agents',
        },
];

const secondSection = [
        {
                icon: StarIcon,
                label: 'Upgrade',
                href: '/upgrade',
        },
];

export const DashboardSidebar = () => {
        const pathname = usePathname();
        return (
                <Sidebar>
                        <SidebarHeader className="text-sidebar-accent-foreground">
                                <Link href="/" className="flex items-center gap-2 px-2 pt-2">
                                        <Image src={'/logo.svg'} alt="Meet.ai Logo" width={36} height={36} />
                                        <span className="text-2xl font-semibold">Meet.ai</span>
                                </Link>
                        </SidebarHeader>
                        <div className="px-4 py-2">
                                <Separator className="opacity-20 text-[#5D6D68]" />
                        </div>
                        <SidebarContent>
                                <SidebarGroup>
                                        <SidebarGroupContent>
                                                <SidebarMenu>
                                                        {firstSection.map((item) => (
                                                                <SidebarMenuItem key={item.label}>
                                                                        <SidebarMenuButton
                                                                                asChild
                                                                                className={cn(
                                                                                        'h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6D68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50',
                                                                                        pathname === item.href &&
                                                                                                'bg-linear-to-r/oklch border-[#5D6D68]/10',
                                                                                )}
                                                                                isActive={pathname === item.href}
                                                                        >
                                                                                <Link
                                                                                        href={item.href}
                                                                                        className="text-muted"
                                                                                >
                                                                                        <item.icon className="size-5" />
                                                                                        <span className="text-base font-medium tracking-tight">
                                                                                                {item.label}
                                                                                        </span>
                                                                                </Link>
                                                                        </SidebarMenuButton>
                                                                </SidebarMenuItem>
                                                        ))}
                                                </SidebarMenu>
                                        </SidebarGroupContent>
                                </SidebarGroup>
                                <div className="px-4">
                                        <Separator className="opacity-20 text-[#5D6D68]" />
                                </div>
                                <SidebarGroup>
                                        <SidebarGroupContent>
                                                <SidebarMenu>
                                                        {secondSection.map((item) => (
                                                                <SidebarMenuItem key={item.label}>
                                                                        <SidebarMenuButton
                                                                                asChild
                                                                                className={cn(
                                                                                        'h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6D68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50',
                                                                                        pathname === item.href &&
                                                                                                'bg-linear-to-r/oklch border-[#5D6D68]/10',
                                                                                )}
                                                                                isActive={pathname === item.href}
                                                                        >
                                                                                <Link
                                                                                        href={item.href}
                                                                                        className="text-muted"
                                                                                >
                                                                                        <item.icon className="size-5" />
                                                                                        <span className="text-base font-medium tracking-tight">
                                                                                                {item.label}
                                                                                        </span>
                                                                                </Link>
                                                                        </SidebarMenuButton>
                                                                </SidebarMenuItem>
                                                        ))}
                                                </SidebarMenu>
                                        </SidebarGroupContent>
                                </SidebarGroup>
                        </SidebarContent>
                        <SidebarFooter className="text-white">
                                <DashboardTrial />
                                <DashboardUserButton />
                        </SidebarFooter>
                </Sidebar>
        );
};
