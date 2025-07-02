import { useTRPC } from '@/trpc/client';
import { useMeetingsFilters } from '../../hooks/use-meetings-filters';
import { useQuery } from '@tanstack/react-query';
import { CommandSelect } from '@/components/command-select';
import { GeneratedAvatar } from '@/components/generated-avatar';
import { useState } from 'react';

export const AgentIdFilter = () => {
        const [filters, setFilters] = useMeetingsFilters();
        const trpc = useTRPC();
        const [agentSearch, setAgentSearch] = useState('');
        const { data } = useQuery(trpc.agents.getMany.queryOptions({ search: agentSearch, pageSize: 100 }));
        return (
                <CommandSelect
                        className="h-9"
                        placeholder="Agent"
                        options={(data?.items ?? []).map((agent) => ({
                                id: agent.id,
                                value: agent.id,
                                children: (
                                        <div className="flex items-center gap-x-2">
                                                <GeneratedAvatar
                                                        seed={agent.name}
                                                        className="size-6"
                                                        variant="botttsNeutral"
                                                />
                                                {agent.name}
                                        </div>
                                ),
                        }))}
                        value={filters.agentId ?? ''}
                        onSelect={(value) => setFilters({ agentId: value })}
                        onSearch={setAgentSearch}
                />
        );
};
