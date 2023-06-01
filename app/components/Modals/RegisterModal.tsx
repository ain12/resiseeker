'use client';
import axios from 'axios';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle} from 'react-icons/fc';
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import {toast} from 'react-hot-toast';
import Button from '../Button';


const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<FieldValues> =  (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then((res) => {
                registerModal.onClose();
            }).catch((err) => {
                toast.error("Something went wrong");
            }).finally(() => {
                setIsLoading(false);
            });
    };

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title="Welcome to ResiSeeker" description="Create an account"/>
            <Input id="name" label="Name" register={register} errors={errors} disabled={isLoading} required/>
            <Input id="email" label="Email" register={register} errors={errors} disabled={isLoading} required/>
            <Input id="password" type="password" label="Password" register={register} errors={errors} disabled={isLoading} required/>
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button label="Continue with Google" icon={FcGoogle} onClick={() => {}} outline/>
            <Button label="Continue with Github" icon={AiFillGithub} onClick={() => {}} outline/>
            <div className="text-center mt-4 text-neutral-500 font-light">
                <div className="flex flex-row items-center justify-center gap-2 text-center">
                    <div>
                        Already have an account?
                    </div>
                    <div onClick={registerModal.onClose} className="cursor-pointer hover:underline text-neutral-800">
                        Log in
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal disabled={isLoading} isOpen={registerModal.isOpen} 
        actionLabel="Continue" title="Register" body={bodyContent} footer={footerContent}
        onSubmit={handleSubmit(onSubmit)} onClose={registerModal.onClose}/>
    );
};

export default RegisterModal;