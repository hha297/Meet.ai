'use client';

import { authClient } from '@/lib/auth-client';
import { Loader2Icon } from 'lucide-react';
import { CallConnect } from './call-connect';
import { generatedAvatarUri } from '@/lib/avatar';

interface CallProviderProps {
        meetingId: string;
        meetingName: string;
}
const CallProvider = ({ meetingId, meetingName }: CallProviderProps) => {
        const { data, isPending } = authClient.useSession();

        if (!data || isPending) {
                return (
                        <div className="flex h-screen items-center justify-center bg-radial from-sidebar-accent to-sidebar">
                                <Loader2Icon className="animate-spin size-6 text-white" />
                        </div>
                );
        }
        return (
                <CallConnect
                        meetingId={meetingId}
                        meetingName={meetingName}
                        userId={data.user.id}
                        userName={data.user.name}
                        userImage={data.user.image ?? generatedAvatarUri({ seed: data.user.name, variant: 'initials' })}
                />
        );
};

export default CallProvider;
