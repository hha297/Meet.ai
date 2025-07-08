'use client';
import { format } from 'date-fns';

import { ColumnDef } from '@tanstack/react-table';
import { MeetingGetMany } from '../../type';

import { GeneratedAvatar } from '@/components/generated-avatar';
import {
        CircleCheckIcon,
        CircleXIcon,
        ClockArrowUpIcon,
        ClockFadingIcon,
        CornerDownRightIcon,
        Loader2Icon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn, formatDuration } from '@/lib/utils';

const statusIconMap = {
        upcoming: ClockArrowUpIcon,
        active: Loader2Icon,
        completed: CircleCheckIcon,
        processing: Loader2Icon,
        cancelled: CircleXIcon,
};

const statusColorMap = {
        upcoming: 'bg-yellow-500/20 text-yellow-800 border-yellow-800/5',
        active: 'bg-blue-500/20 text-blue-800 border-blue-800/5',
        completed: 'bg-emerald-500/20 text-emerald-800 border-emerald-800/5',
        processing: 'bg-gray-500/20 text-gray-800 border-gray-800/5',
        cancelled: 'bg-rose-500/20 text-rose-800 border-rose-800/5',
};
export const columns: ColumnDef<MeetingGetMany[number]>[] = [
        {
                accessorKey: 'name',
                header: 'Meeting Name',
                cell: ({ row }) => {
                        return (
                                <div className="flex flex-col gap-y-1">
                                        <span className="font-semibold capitalize">{row.original.name}</span>
                                        <div className="flex items-center gap-x-2">
                                                <div className="flex items-center gap-x-1">
                                                        <CornerDownRightIcon className="size-4 text-muted-foreground" />
                                                        <span className="text-sm text-muted-foreground max-w-52 truncate">
                                                                {row.original.agent.name}
                                                        </span>
                                                </div>
                                                <GeneratedAvatar
                                                        seed={row.original.agent.name}
                                                        className="size-4"
                                                        variant="botttsNeutral"
                                                />
                                                <span className="text-sm text-muted-foreground">
                                                        {row.original.startedAt
                                                                ? format(row.original.startedAt, 'MMM d')
                                                                : ''}
                                                </span>
                                        </div>
                                </div>
                        );
                },
        },
        {
                accessorKey: 'status',
                header: 'Meetings Status',
                cell: ({ row }) => {
                        const Icon = statusIconMap[row.original.status as keyof typeof statusIconMap];
                        return (
                                <Badge
                                        className={cn(
                                                'capitalize [&>svg]:size-4 text-muted-foreground',
                                                statusColorMap[row.original.status as keyof typeof statusColorMap],
                                        )}
                                        variant={'outline'}
                                >
                                        <Icon className={cn(row.original.status === 'processing' && 'animate-spin')} />
                                        {row.original.status}
                                </Badge>
                        );
                },
        },
        {
                accessorKey: 'duration',
                header: 'Duration',
                cell: ({ row }) => {
                        return (
                                <Badge
                                        variant={'outline'}
                                        className="flex items-center gap-x-1 [&>svg]:size-4 text-muted-foreground"
                                >
                                        <ClockFadingIcon className="text-blue-700" />
                                        {row.original.duration ? formatDuration(row.original.duration) : 'No Duration'}
                                </Badge>
                        );
                },
        },
];
