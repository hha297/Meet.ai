'use client';

import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { MeetingIdViewHeader } from '../components/meeting-id-view-header';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useConfirm } from '@/hooks/use-confirm';
import { UpdateMeetingDialog } from '../components/update-meeting-dialog';
import { useState } from 'react';
import { UpcomingState } from '../components/upcoming-state';
import { ActiveState } from '../components/active-state';
import { CancelledState } from '../components/cancel-state';
import { ProcessingState } from '../components/processing-state';

interface MeetingIdViewProps {
        meetingId: string;
}

export const MeetingIdView = ({ meetingId }: MeetingIdViewProps) => {
        const trpc = useTRPC();
        const queryClient = useQueryClient();
        const router = useRouter();
        const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);
        const { data } = useSuspenseQuery(trpc.meetings.getOne.queryOptions({ id: meetingId }));

        const removeMeeting = useMutation(
                trpc.meetings.remove.mutationOptions({
                        onSuccess: () => {
                                queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
                                router.push('/meetings');
                        },
                        onError: (error) => {
                                toast.error(error.message);
                        },
                }),
        );
        const [RemoveConfirmation, confirmRemove] = useConfirm(
                'Are you sure?',
                'You wil permanently remove this meeting and this action cannot be undone.',
        );

        const handleRemoveMeeting = async () => {
                const ok = await confirmRemove();

                if (!ok) return;

                await removeMeeting.mutateAsync({ id: meetingId });
        };

        const isActive = data.status === 'active';
        const isUpcoming = data.status === 'upcoming';
        const isCancelled = data.status === 'cancelled';
        const isCompleted = data.status === 'completed';
        const isProcessing = data.status === 'processing';
        return (
                <>
                        <RemoveConfirmation />
                        <UpdateMeetingDialog
                                initialValue={data}
                                open={updateMeetingDialogOpen}
                                onOpenChange={setUpdateMeetingDialogOpen}
                        />
                        <div className="flex-1 px-4 py-4 md:px-8 flex flex-col gap-y-4">
                                <MeetingIdViewHeader
                                        meetingId={meetingId}
                                        meetingName={data.name}
                                        onEdit={() => setUpdateMeetingDialogOpen(true)}
                                        onRemove={handleRemoveMeeting}
                                />
                                {isActive && <ActiveState meetingId={meetingId} />}
                                {isCancelled && <CancelledState />}
                                {isProcessing && <ProcessingState />}
                                {isCompleted && <div>Completed</div>}
                                {isUpcoming && (
                                        <UpcomingState
                                                meetingId={meetingId}
                                                onCancelMeeting={() => {}}
                                                isCancelling={false}
                                        />
                                )}
                        </div>
                </>
        );
};

export const MeetingIdViewLoading = () => {
        return <LoadingState title="Loading Meetings" description="This might take a few seconds..." />;
};

export const MeetingIdViewError = () => {
        return (
                <ErrorState
                        title="Error Loading Meetings"
                        description="Something went wrong. Please try again and if the problem persists, contact our support."
                />
        );
};
