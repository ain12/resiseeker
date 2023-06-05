'use client';
import axios from 'axios';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle} from 'react-icons/fc';
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import {toast} from 'react-hot-toast';
import Button from '../Button';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';



const LoginModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<FieldValues> =  (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false,
        }).then((cb) => {
            setIsLoading(false);
            if(cb?.ok) {
                toast.success('Logged in successfully!');
                router.refresh();
                loginModal.onClose();
            }
            if(cb?.error) {
                toast.error(cb.error);
            }
        })
    };
    const toggleModal = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    },[loginModal, registerModal]);

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title="Welcome back" description="Log in to your account!"/>
            <Input id="email" label="Email" register={register} errors={errors} disabled={isLoading} required/>
            <Input id="password" type="password" label="Password" register={register} errors={errors} disabled={isLoading} required/>
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button label="Continue with Google" icon={FcGoogle} onClick={() => {}} outline/>
            <Button label="Continue with Github" icon={AiFillGithub} onClick={() => signIn('github')} outline/>
            <div className="text-center mt-4 text-neutral-500 font-light">
                <div className="flex flex-row items-center justify-center gap-2 text-center">
                    <div>
                        First time here?
                    </div>
                    <div onClick={toggleModal} className="cursor-pointer hover:underline text-neutral-800">
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal disabled={isLoading} isOpen={loginModal.isOpen} 
        actionLabel="Continue" title="Log in" body={bodyContent} footer={footerContent}
        onSubmit={handleSubmit(onSubmit)} onClose={loginModal.onClose}/>
    );
};

export default LoginModal;