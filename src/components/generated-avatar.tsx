import { createAvatar } from '@dicebear/core';
import { botttsNeutral, initials } from '@dicebear/collection';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';

interface GeneratedAvatarProps {
        seed: string;
        className?: string;
        variant?: 'botttsNeutral' | 'initials';
}
export const GeneratedAvatar = ({ seed, className, variant }: GeneratedAvatarProps) => {
        let avatar;

        if (variant === 'botttsNeutral') {
                avatar = createAvatar(botttsNeutral, {
                        seed: seed,
                });
        } else {
                avatar = createAvatar(initials, {
                        seed: seed,
                        fontWeight: 500,
                        fontSize: 36,
                });
        }

        return (
                <Avatar className={cn(className)}>
                        <AvatarImage src={avatar.toDataUri()} alt="Avatar" />
                        <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
        );
};
