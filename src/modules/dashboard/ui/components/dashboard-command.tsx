import { GeneratedAvatar } from '@/components/generated-avatar';
import {
        CommandEmpty,
        CommandGroup,
        CommandInput,
        CommandItem,
        CommandList,
        CommandResponsiveDialog,
} from '@/components/ui/command';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { Dispatch, useState } from 'react';

interface DashboardCommandProps {
        open: boolean;
        setOpen: Dispatch<React.SetStateAction<boolean>>;
}
export const DashboardCommand = ({ open, setOpen }: DashboardCommandProps) => {
        const router = useRouter();
        const [search, setSearch] = useState('');
        const trpc = useTRPC();
        const meetings = useQuery(
                trpc.meetings.getMany.queryOptions({
                        search,
                        pageSize: 100,
                }),
        );

        const agents = useQuery(
                trpc.agents.getMany.queryOptions({
                        search,
                        pageSize: 100,
                }),
        );
        return (
                <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
                        <CommandInput placeholder="Find a meeting or agent" value={search} onValueChange={setSearch} />
                        <CommandList>
                                <CommandGroup heading="Meetings">
                                        <CommandEmpty>
                                                <span className="text-muted-foreground">No meetings found</span>
                                        </CommandEmpty>
                                        {meetings.data?.items.map((meeting) => (
                                                <CommandItem
                                                        key={meeting.id}
                                                        onSelect={() => {
                                                                setOpen(false);
                                                                router.push(`/meetings/${meeting.id}`);
                                                        }}
                                                >
                                                        {meeting.name}
                                                </CommandItem>
                                        ))}
                                </CommandGroup>
                                <CommandGroup heading="Agents">
                                        <CommandEmpty>
                                                <span className="text-muted-foreground">No agents found</span>
                                        </CommandEmpty>
                                        {agents.data?.items.map((agent) => (
                                                <CommandItem
                                                        key={agent.id}
                                                        onSelect={() => {
                                                                setOpen(false);
                                                                router.push(`/agents/${agent.id}`);
                                                        }}
                                                >
                                                        <GeneratedAvatar
                                                                seed={agent.name}
                                                                variant="botttsNeutral"
                                                                className="mr-2 size-6"
                                                        />
                                                        {agent.name}
                                                </CommandItem>
                                        ))}
                                </CommandGroup>
                        </CommandList>
                </CommandResponsiveDialog>
        );
};
