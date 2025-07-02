import { CircleXIcon, CircleCheckIcon, ClockArrowUpIcon, Loader2Icon } from 'lucide-react';
import { MeetingStatus } from '../../type';
import { useMeetingsFilters } from '../../hooks/use-meetings-filters';
import { CommandSelect } from '@/components/command-select';

const options = [
        {
                id: MeetingStatus.Upcoming,
                value: MeetingStatus.Upcoming,
                children: (
                        <div className="flex items-center gap-x-2 capitalize">
                                <ClockArrowUpIcon />
                                {MeetingStatus.Upcoming}
                        </div>
                ),
        },
        {
                id: MeetingStatus.Completed,
                value: MeetingStatus.Completed,
                children: (
                        <div className="flex items-center gap-x-2 capitalize">
                                <CircleCheckIcon />
                                {MeetingStatus.Completed}
                        </div>
                ),
        },
        {
                id: MeetingStatus.Active,
                value: MeetingStatus.Active,
                children: (
                        <div className="flex items-center gap-x-2 capitalize">
                                <Loader2Icon />
                                {MeetingStatus.Active}
                        </div>
                ),
        },
        {
                id: MeetingStatus.Processing,
                value: MeetingStatus.Processing,
                children: (
                        <div className="flex items-center gap-x-2 capitalize">
                                <Loader2Icon />
                                {MeetingStatus.Processing}
                        </div>
                ),
        },
        {
                id: MeetingStatus.Cancelled,
                value: MeetingStatus.Cancelled,
                children: (
                        <div className="flex items-center gap-x-2 capitalize">
                                <CircleXIcon />
                                {MeetingStatus.Cancelled}
                        </div>
                ),
        },
];

export const StatusFilter = () => {
        const [filters, setFilters] = useMeetingsFilters();

        return (
                <CommandSelect
                        placeholder="Status"
                        className="h-9"
                        options={options}
                        value={filters.status ?? ''}
                        onSelect={(value) => setFilters({ status: value as MeetingStatus })}
                />
        );
};
