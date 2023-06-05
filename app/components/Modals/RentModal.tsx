'use client';
import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../Navbar/Categories";
import CategoryInput from "../Inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal = () => {
    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY);

    const { 
        register, 
        handleSubmit,
        setValue,
        watch,
        formState: {
          errors,
        },
        reset,
      } = useForm<FieldValues>({
        defaultValues: {
          category: '',
          location: null,
          guestCount: 1,
          roomCount: 1,
          bathroomCount: 1,
          imageSrc: '',
          price: 1,
          title: '',
          description: '',
        }
    });

    //const location = watch('location');
    const category = watch('category');
    /* const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc'); */

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true
        })
    }

    const onBack = () => {
        setStep((prev) => prev - 1);
    };

    const onNext = () => {
        setStep((prev) => prev + 1);
    };

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return "Create";
        }

        return "Next";
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="Which of these best describes your place?" description="Pick a category"/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput onClick={(category) => setCustomValue('category', category)} label={item.label} icon={item.icon} selected={category === item.label}/>
                    </div>
                ))}
            </div>
        </div>
    );

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }

        return "Back";
    }, [step]);

    return(
        <Modal title="Your ResiSeeker home" isOpen={rentModal.isOpen} onSubmit={rentModal.onClose}
        onClose={rentModal.onClose} actionLabel={actionLabel} secondaryActionLabel={secondaryActionLabel} 
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack} body={bodyContent}/>
    )
};

export default RentModal;