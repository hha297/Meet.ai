import { EmptyState } from '@/components/empty-state';
import { Button } from '@/components/ui/button';
import { BanIcon, VideoIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface UpcomingStateProps {
        meetingId: string;
        onCancelMeeting: () => void;
        isCancelling: boolean;
}

export const UpcomingState = ({ meetingId, onCancelMeeting, isCancelling }: UpcomingStateProps) => {
        return (
                <div className="bg-white rounded-lg px-4 py-4 flex flex-col gap-y-8 items-center justify-center">
                        <EmptyState
                                image="/upcoming.svg"
                                title="Not started yet"
                                description="No upcoming events found. Once you start this meeting, a summary will appear here"
                        />
                        <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2">
                                <Button
                                        variant={'secondary'}
                                        className="w-full lg:w-auto"
                                        onClick={onCancelMeeting}
                                        disabled={isCancelling}
                                >
                                        <BanIcon />
                                        Cancel meeting
                                </Button>
                                <Button disabled={isCancelling} asChild className="w-full lg:w-auto">
                                        <Link href={`/call/${meetingId}`}>
                                                <VideoIcon />
                                                Start meeting
                                        </Link>
                                </Button>
                        </div>
                </div>
        );
};
