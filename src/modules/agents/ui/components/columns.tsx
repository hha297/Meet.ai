'use client';

import { ColumnDef } from '@tanstack/react-table';
import { AgentGetOne } from '../../type';
import { GeneratedAvatar } from '@/components/generated-avatar';
import { CornerDownRightIcon, VideoIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<AgentGetOne>[] = [
        {
                accessorKey: 'name',
                header: 'Agent Name',
                cell: ({ row }) => {
                        return (
                                <div className="flex flex-col gap-y-1">
                                        <div className="flex items-center gap-x-2">
                                                <GeneratedAvatar
                                                        variant="botttsNeutral"
                                                        seed={row.original.name}
                                                        className="size-6"
                                                />
                                                <span className="text-base font-semibold capitalize">
                                                        {row.original.name}
                                                </span>
                                        </div>

                                        <div className="flex items-center gap-x-2">
                                                <CornerDownRightIcon className="size-4 text-muted-foreground" />
                                                <span className="text-sm text-muted-foreground max-w-52 truncate">
                                                        {row.original.instructions}
                                                </span>
                                        </div>
                                </div>
                        );
                },
        },
        {
                accessorKey: 'meetingCount',
                header: 'Meetings',
                cell: ({ row }) => (
                        <Badge variant={'outline'} className="flex items-center gap-x-2 p-2 [&svg]:size-4">
                                <VideoIcon className="size-6 text-green-800" />
                                {row.original.meetingCount} {row.original.meetingCount === 1 ? 'Meeting' : 'Meetings'}
                        </Badge>
                ),
        },
];
