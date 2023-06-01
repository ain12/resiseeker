'use client';

import { IconType } from "react-icons/lib";

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    small?: boolean;
    outline?: boolean;
    icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    small,
    outline,
    icon: Icon
}) => { 
    return (
        <button 
        onClick={onClick}
        disabled={disabled}
        className={`
        relative
        disabled:opacity-70
        rounded-lg
        disabled:cursor-not-allowed
        hover:opacity-80
        transition
        w-full
        ${outline ? 'bg-white' : 'bg-orange'}
        ${outline ? 'border-black' : 'border-orange'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'py-1 font-light text-sm border[1px]' : 'py-3 font-semibold text-md border-2'}
        `}>
            {Icon && (
                <Icon size={23}
                className={"absolute left-4 top-3"}
                />
            )}
            {label}
        </button>
    );
};

export default Button;