import { auth } from '@/lib/auth';
import { MeetingsListHeader } from '@/modules/meetings/ui/components/meetings-list-header';
import { MeetingsView, MeetingsViewError, MeetingsViewLoading } from '@/modules/meetings/ui/view/meetings-view';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import type { SearchParams } from 'nuqs';
import { loadSearchParams } from '@/modules/meetings/params';

interface MeetingsPageProps {
        searchParams: Promise<SearchParams>;
}
const MeetingsPage = async ({ searchParams }: MeetingsPageProps) => {
        const filters = await loadSearchParams(searchParams);
        const queryClient = getQueryClient();
        void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({ ...filters }));
        const session = await auth.api.getSession({
                headers: await headers(),
        });

        if (!session) {
                redirect('/sign-in');
        }
        return (
                <>
                        <MeetingsListHeader />
                        <HydrationBoundary state={dehydrate(queryClient)}>
                                <Suspense fallback={<MeetingsViewLoading />}>
                                        <ErrorBoundary fallback={<MeetingsViewError />}>
                                                <MeetingsView />
                                        </ErrorBoundary>
                                </Suspense>
                        </HydrationBoundary>
                </>
        );
};

export default MeetingsPage;
