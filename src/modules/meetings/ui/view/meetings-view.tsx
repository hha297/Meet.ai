'use client';

import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';

export const MeetingsView = () => {
        const trpc = useTRPC();
        const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
        return <div>{JSON.stringify(data)}</div>;
};

export const MeetingsViewLoading = () => {
        return <LoadingState title="Loading Meetings" description="This might take a few seconds..." />;
};

export const MeetingsViewError = () => {
        return (
                <ErrorState
                        title="Error Loading Meetings"
                        description="Something went wrong. Please try again and if the problem persists, contact our support."
                />
        );
};
