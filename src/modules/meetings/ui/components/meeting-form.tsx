import { useTRPC } from '@/trpc/client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { meetingsInsertSchema } from '../../schemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { MeetingGetOne } from '../../type';
import { useState } from 'react';
import { CommandSelect } from '@/components/command-select';
import { GeneratedAvatar } from '@/components/generated-avatar';
import { NewAgentDialog } from '@/modules/agents/ui/components/new-agent-dialog';

interface MeetingFormProps {
        onSuccess?: (id?: string) => void;
        onCancel?: () => void;
        initialValues?: MeetingGetOne;
}

export const MeetingForm = ({ onSuccess, onCancel, initialValues }: MeetingFormProps) => {
        const trpc = useTRPC();

        const queryClient = useQueryClient();
        const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);
        const [agentSearch, setAgentSearch] = useState('');
        const agents = useQuery(trpc.agents.getMany.queryOptions({ pageSize: 100, search: agentSearch }));
        const createMeeting = useMutation(
                trpc.meetings.create.mutationOptions({
                        onSuccess: async (data) => {
                                await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
                                toast.success('Meeting created.');
                                // TODO: Invalidate free tier user

                                onSuccess?.(data.id);
                        },
                        onError: (error) => {
                                toast.error(error.message);
                                // TODO: Check if error is "FORBIDDEN", redirect to login
                        },
                }),
        );

        const updateMeeting = useMutation(
                trpc.meetings.update.mutationOptions({
                        onSuccess: async () => {
                                await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
                                toast.success('Meeting updated.');
                                if (initialValues?.id) {
                                        await queryClient.invalidateQueries(
                                                trpc.meetings.getOne.queryOptions({
                                                        id: initialValues.id,
                                                }),
                                        );
                                }
                                onSuccess?.();
                        },
                        onError: (error) => {
                                toast.error(error.message);
                                // TODO: Check if error is "FORBIDDEN", redirect to login
                        },
                }),
        );

        const form = useForm<z.infer<typeof meetingsInsertSchema>>({
                resolver: zodResolver(meetingsInsertSchema),
                defaultValues: {
                        name: initialValues?.name ?? '',
                        agentId: initialValues?.agentId ?? '',
                },
        });

        const isEdit = !!initialValues?.id;
        const isPending = createMeeting.isPending;

        const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
                if (isEdit) {
                        updateMeeting.mutate({ ...values, id: initialValues.id });
                } else {
                        createMeeting.mutate(values);
                }
        };

        return (
                <>
                        <NewAgentDialog
                                open={openNewAgentDialog}
                                onOpenChange={(open) => setOpenNewAgentDialog(open)}
                        />
                        <Form {...form}>
                                <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                                        <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                        <FormItem>
                                                                <FormLabel>Name</FormLabel>
                                                                <FormControl>
                                                                        <Input
                                                                                {...field}
                                                                                placeholder="e.g. Math Meeting"
                                                                        />
                                                                </FormControl>
                                                                <FormMessage />
                                                        </FormItem>
                                                )}
                                        />

                                        <FormField
                                                control={form.control}
                                                name="agentId"
                                                render={({ field }) => (
                                                        <FormItem>
                                                                <FormLabel>Agent</FormLabel>
                                                                <FormControl>
                                                                        <CommandSelect
                                                                                options={(agents.data?.items ?? []).map(
                                                                                        (agent) => ({
                                                                                                id: agent.id,
                                                                                                value: agent.id,
                                                                                                children: (
                                                                                                        <div className="flex items-center gap-x-2">
                                                                                                                <GeneratedAvatar
                                                                                                                        seed={
                                                                                                                                agent.name
                                                                                                                        }
                                                                                                                        variant="botttsNeutral"
                                                                                                                        className="border size-6"
                                                                                                                />
                                                                                                                <span>
                                                                                                                        {
                                                                                                                                agent.name
                                                                                                                        }
                                                                                                                </span>
                                                                                                        </div>
                                                                                                ),
                                                                                        }),
                                                                                )}
                                                                                onSelect={field.onChange}
                                                                                onSearch={setAgentSearch}
                                                                                value={field.value}
                                                                                placeholder="Select an agent"
                                                                        />
                                                                </FormControl>
                                                                <FormDescription>
                                                                        Not found what you are looking for?{' '}
                                                                        <button
                                                                                type="button"
                                                                                className="text-primary hover:underline"
                                                                                onClick={() =>
                                                                                        setOpenNewAgentDialog(true)
                                                                                }
                                                                        >
                                                                                Create new button
                                                                        </button>
                                                                </FormDescription>
                                                                <FormMessage />
                                                        </FormItem>
                                                )}
                                        />

                                        <div className="flex items-center justify-between gap-x-2">
                                                {onCancel && (
                                                        <Button
                                                                type="button"
                                                                disabled={isPending}
                                                                variant={'ghost'}
                                                                onClick={onCancel}
                                                        >
                                                                Cancel
                                                        </Button>
                                                )}
                                                <Button type="submit" disabled={isPending}>
                                                        {isEdit ? 'Update' : 'Create'}
                                                </Button>
                                        </div>
                                </form>
                        </Form>
                </>
        );
};
