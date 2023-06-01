'use client';

interface HeadingProps {
    title: string;
    description: string;
    center?: boolean;
};


const Heading: React.FC<HeadingProps> = ({
    title,
    description,
    center,
}) => {
    return (
        <div className={center ? 'text-center' : 'text-start'}>
            <div className="font-bold text-2xl">
                {title}
            </div>
            <div className="text-neutral-500 font-light mt-2">
                {description}
            </div>
        </div>
    );
}

export default Heading;