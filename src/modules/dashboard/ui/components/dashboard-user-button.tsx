import { authClient } from '@/lib/auth-client';
import React from 'react';

import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuLabel,
        DropdownMenuSeparator,
        DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
        Drawer,
        DrawerContent,
        DrawerDescription,
        DrawerFooter,
        DrawerHeader,
        DrawerTitle,
        DrawerTrigger,
} from '@/components/ui/drawer';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { GeneratedAvatar } from '@/components/generated-avatar';
import { ChevronRightIcon, CreditCardIcon, LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

export const DashboardUserButton = () => {
        const router = useRouter();
        const { data, isPending } = authClient.useSession();
        const isMobile = useIsMobile();
        if (isPending || !data?.user) {
                return null;
        }
        const onSignOut = async () => {
                await authClient.signOut({
                        fetchOptions: {
                                onSuccess: () => {
                                        router.push('/sign-in');
                                },
                        },
                });
        };

        if (isMobile) {
                return (
                        <Drawer>
                                <DrawerTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/4 hover:bg-white/10 overflow-hidden">
                                        {data.user.image ? (
                                                <Avatar>
                                                        <AvatarImage src={data.user.image} alt={data.user.name} />
                                                </Avatar>
                                        ) : (
                                                <GeneratedAvatar
                                                        seed={data.user.name}
                                                        variant="initials"
                                                        className="size-9 mr-3"
                                                />
                                        )}
                                        <div className="flex flex-col gap-0.5 text-left outline-hidden flex-1 min-w-0">
                                                <span className="text-sm font-semibold text-white truncate">
                                                        {data.user.name}
                                                </span>
                                                <span className="text-xs text-muted-foreground truncate">
                                                        {data.user.email}
                                                </span>
                                        </div>
                                        <ChevronRightIcon className="size-4 text-white" />
                                </DrawerTrigger>
                                <DrawerContent>
                                        <DrawerHeader>
                                                <DrawerTitle className="text-sm font-semibold">
                                                        {data.user.name}
                                                </DrawerTitle>
                                                <DrawerDescription className="text-xs text-muted-foreground">
                                                        {data.user.email}
                                                </DrawerDescription>
                                        </DrawerHeader>

                                        <DrawerFooter className="flex flex-col gap-2">
                                                <Button variant="outline" onClick={() => authClient.customer.portal()}>
                                                        <CreditCardIcon className="size-4 text-black" />
                                                        Billing
                                                </Button>
                                                <Button variant="outline" onClick={onSignOut}>
                                                        <LogOutIcon className="size-4 text-black" />
                                                        Sign Out
                                                </Button>
                                        </DrawerFooter>
                                </DrawerContent>
                        </Drawer>
                );
        }

        return (
                <DropdownMenu>
                        <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/4 hover:bg-white/10 overflow-hidden">
                                {data.user.image ? (
                                        <Avatar>
                                                <AvatarImage src={data.user.image} alt={data.user.name} />
                                        </Avatar>
                                ) : (
                                        <GeneratedAvatar
                                                seed={data.user.name}
                                                variant="initials"
                                                className="size-9 mr-3"
                                        />
                                )}
                                <div className="flex flex-col gap-0.5 text-left outline-hidden flex-1 min-w-0">
                                        <span className="text-sm font-semibold text-white truncate">
                                                {data.user.name}
                                        </span>
                                        <span className="text-xs text-muted-foreground truncate">
                                                {data.user.email}
                                        </span>
                                </div>
                                <ChevronRightIcon className="size-4 text-muted-foreground shrink-0" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" side="right" className="w-72">
                                <DropdownMenuLabel>
                                        <div className="flex flex-col gap-1">
                                                <span className="text-sm font-semibold truncate">{data.user.name}</span>
                                                <span className="text-xs text-muted-foreground truncate">
                                                        {data.user.email}
                                                </span>
                                        </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                        onClick={() => authClient.customer.portal()}
                                        className="cursor-pointer flex items-center justify-between"
                                >
                                        Billing
                                        <CreditCardIcon className="size-4" />
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                        className="cursor-pointer flex items-center justify-between"
                                        onClick={onSignOut}
                                >
                                        Sign Out
                                        <LogOutIcon className="size-4" />
                                </DropdownMenuItem>
                        </DropdownMenuContent>
                </DropdownMenu>
        );
};
