'use client';

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
    title: string;
    description: string;
    value: number;
    onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
    title,
    description,
    value,
    onChange,
}) => {
    const onAdd = useCallback(() => {
        onChange(value + 1);
    }, [onChange, value]);

    const onSubtract = useCallback(() => {
        if(value === 1) return;

        onChange(value - 1);
    }, [onChange, value]);

    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
                <div className="font-medium">
                    {title}
                </div>
                <div className="font-light text-gray-600">
                    {description}
                </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
                <div className="rounded-full border-[1px] border-neutral-400 w-10 h-10 
                flex items-center justify-center cursor-pointer text-neutral-600 hover:opacity-80 transition" onClick={onSubtract}>
                    <AiOutlineMinus />
                </div>
                <div className="text-xl text-neutral-600 font-light">
                    {value}
                </div>
                <div className="rounded-full border-[1px] border-neutral-400 w-10 h-10 
                flex items-center justify-center cursor-pointer text-neutral-600 hover:opacity-80 transition" onClick={onAdd}>
                    <AiOutlinePlus />
                </div>
            </div>
        </div>
    )
}

export default Counter;