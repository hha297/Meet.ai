import { EmptyState } from '@/components/empty-state';
import { Button } from '@/components/ui/button';
import { VideoIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface UpcomingStateProps {
        meetingId: string;
}

export const UpcomingState = ({ meetingId }: UpcomingStateProps) => {
        return (
                <div className="bg-white rounded-lg px-4 py-4 flex flex-col gap-y-8 items-center justify-center">
                        <EmptyState
                                image="/upcoming.svg"
                                title="Not started yet"
                                description="No upcoming events found. Once you start this meeting, a summary will appear here"
                        />
                        <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2">
                                <Button asChild className="w-full lg:w-auto">
                                        <Link href={`/call/${meetingId}`}>
                                                <VideoIcon />
                                                Start meeting
                                        </Link>
                                </Button>
                        </div>
                </div>
        );
};
