import { ResponsiveDialog } from '@/components/responsive-dialog';
import React from 'react';
import { AgentForm } from './agent-form';
import { AgentGetOne } from '../../type';

interface UpdateAgentDialogProps {
        open: boolean;
        onOpenChange: (open: boolean) => void;
        initialValues?: AgentGetOne;
}
export const UpdateAgentDialog = ({ open, onOpenChange, initialValues }: UpdateAgentDialogProps) => {
        return (
                <ResponsiveDialog
                        title="Update Agent"
                        description="Update the agent details"
                        open={open}
                        onOpenChange={onOpenChange}
                >
                        <AgentForm
                                onSuccess={() => onOpenChange(false)}
                                onCancel={() => onOpenChange(false)}
                                initialValues={initialValues}
                        />
                </ResponsiveDialog>
        );
};
