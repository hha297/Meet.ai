'use client';

import { Button } from '@/components/ui/button';
import { PlusIcon, XCircleIcon } from 'lucide-react';
import { NewMeetingDialog } from './new-meeting-dialog';
import { useState } from 'react';
import { MeetingsSearchFilter } from './meeting-search-filter';
import { StatusFilter } from './status-filter';
import { AgentIdFilter } from './agent-id-filter';
import { useMeetingsFilters } from '../../hooks/use-meetings-filters';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export const MeetingsListHeader = () => {
        const [isDialogOpen, setIsDialogOpen] = useState(false);
        const [filters, setFilters] = useMeetingsFilters();

        const isAnyFilterModified = !!filters.search || !!filters.status || !!filters.agentId;

        const onClearFilters = () => setFilters({ search: '', status: null, agentId: '', page: 1 });
        return (
                <>
                        <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
                        <div className="px-4 py-4 md:px-8 flex flex-col gap-y-4">
                                <div className="flex items-center justify-between">
                                        <h5 className="font-semibold text-xl">My Meetings</h5>
                                        <Button onClick={() => setIsDialogOpen(true)}>
                                                <PlusIcon />
                                                New Meeting
                                        </Button>
                                </div>
                                <ScrollArea>
                                        <div className="flex items-center gap-x-2 p-1">
                                                <MeetingsSearchFilter />
                                                <StatusFilter />
                                                <AgentIdFilter />
                                                {isAnyFilterModified && (
                                                        <Button variant="outline" onClick={onClearFilters}>
                                                                <XCircleIcon className="size-4" />
                                                                Clear Filters
                                                        </Button>
                                                )}
                                        </div>
                                        <ScrollBar orientation="horizontal" />
                                </ScrollArea>
                        </div>
                </>
        );
};
