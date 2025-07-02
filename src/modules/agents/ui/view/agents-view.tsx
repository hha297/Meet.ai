'use client';
import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';

import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';

import { columns } from '../components/columns';
import { EmptyState } from '@/components/empty-state';
import { useAgentsFilters } from '../../hooks/use-agents-filters';

import { useRouter } from 'next/navigation';
import { DataTable } from '@/components/data-table';
import { DataPagination } from '@/components/data-pagination';

export const AgentsView = () => {
        const [filters, setFilters] = useAgentsFilters();
        const trpc = useTRPC();
        const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({ ...filters }));
        const router = useRouter();
        return (
                <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
                        <DataTable
                                data={data.items}
                                columns={columns}
                                onRowClick={(row) => router.push(`/agents/${row.id}`)}
                        />
                        <DataPagination
                                page={filters.page}
                                totalPages={data.totalPages}
                                onPageChange={(page) => setFilters({ page })}
                        />

                        {data.items.length === 0 && (
                                <EmptyState
                                        title="Create Your First Agent"
                                        description="Create an agent to get started. Each agent will follow your instructions and interact with participants during the call."
                                />
                        )}
                </div>
        );
};

export const AgentsViewLoading = () => {
        return <LoadingState title="Loading Agents" description="This might take a few seconds..." />;
};

export const AgentsViewError = () => {
        return (
                <ErrorState
                        title="Error Loading Agents"
                        description="Something went wrong. Please try again and if the problem persists, contact our support."
                />
        );
};
