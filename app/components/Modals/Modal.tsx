'use client';

import { useCallback, useEffect, useState } from "react";
import {IoMdClose} from 'react-icons/io';
import Button from "../Button";

interface ModalProps {
    onClose: () => void;
    onSubmit: () => void;
    isOpen?: boolean;
    title?: string;
    footer?: React.ReactElement;
    body?: React.ReactElement;
    disabled?: boolean;
    actionLabel: string;
    secondaryActionLabel?: string;
    secondaryAction?: () => void;
}


const Modal: React.FC<ModalProps> = ({
    onClose,
    onSubmit,
    isOpen,
    title,
    footer,
    body,
    disabled,
    actionLabel,
    secondaryActionLabel,
    secondaryAction,
}) => {
    const [openModal, setOpenModal] = useState(isOpen);

    useEffect(() => {
        setOpenModal(isOpen);
    }, [isOpen]);

    const handleClosing = useCallback(() => {
        if(disabled){
            return;
        }
        setOpenModal(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if(disabled){
            return;
        }

        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if(disabled || !secondaryAction){
            return;
        }
        secondaryAction();
    }, [disabled, secondaryAction]);

    if(!isOpen){
        return null;
    }

    return (
        <>
        <div className="flex justify-center 
        items-center 
        fixed 
        inset-0 
        overflow-x-hidden 
        overflow-y-auto 
        z-50 
        outline-none
        focus:outline-none
        bg-neutral-800/70
        ">
            <div className="w-full my-6 mx-auto h-full md:w-4/6 lg:w-4/6 lg:w-3/6 xl:w-2/5 lg:h-auto md:h-auto ">
                <div className={`h-full translate duration-300 ${openModal ? 'translate-y-0' : 'translate-y-full'} ${openModal ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="
                      translate
                      h-full
                      lg:h-auto
                      md:h-auto
                      flex
                      flex-col
                      w-full
                      outline-none
                      focus:outline-none
                      bg-white
                      rounded-lg
                      shadow-lg
                      border-0
                    ">
                        <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                            <button onClick={handleClosing} className="transition absolute left-9 p-1 border-0 hover:opacity-70">
                                <IoMdClose size={20}/>
                            </button>
                            <div className="font-semibold text-lg">
                                {title}
                            </div>
                        </div>
                        <div className="relative p-6 flex-auto">
                            {body}
                        </div>
                        <div className="flex flex-col gap-2 p-6">
                            <div className="flex flex-row items-center gap-4 w-full">
                                {secondaryAction && secondaryActionLabel && (
                                    <Button outline label={secondaryActionLabel} disabled={disabled} onClick={handleSecondaryAction}/>
                                )}
                                
                                <Button label={actionLabel} disabled={disabled} onClick={handleSubmit}/>
                            </div>
                            {footer}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
};

export default Modal;