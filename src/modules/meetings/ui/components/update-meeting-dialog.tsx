import { ResponsiveDialog } from '@/components/responsive-dialog';
import { MeetingForm } from './meeting-form';

import { MeetingGetOne } from '../../type';

interface UpdateMeetingDialogProps {
        open: boolean;
        onOpenChange: (open: boolean) => void;
        initialValue: MeetingGetOne;
}
export const UpdateMeetingDialog = ({ open, onOpenChange, initialValue }: UpdateMeetingDialogProps) => {
        return (
                <ResponsiveDialog
                        title="Edit Meeting"
                        description="Edit meeting details"
                        open={open}
                        onOpenChange={onOpenChange}
                >
                        <MeetingForm
                                onSuccess={() => onOpenChange(false)}
                                onCancel={() => onOpenChange(false)}
                                initialValues={initialValue}
                        />
                </ResponsiveDialog>
        );
};
