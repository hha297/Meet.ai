'use client';
import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';

import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';

export const AgentsView = () => {
        const trpc = useTRPC();
        const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

        return <div>{JSON.stringify(data)}</div>;
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
