import Image from 'next/image';

interface EmptyProps {
        title: string;
        description: string;
        image?: string;
}

export const EmptyState = ({ title, description, image = '/empty.svg' }: EmptyProps) => {
        return (
                <div className="flex flex-col  items-center justify-center">
                        <Image src={image} alt="Empty" width={240} height={240} />
                        <div className="flex flex-col gap-y-6 max-w-md mx-auto text-center">
                                <h2 className="text-lg font-semibold">{title}</h2>
                                <p className="text-sm text-muted-foreground">{description}</p>
                        </div>
                </div>
        );
};
