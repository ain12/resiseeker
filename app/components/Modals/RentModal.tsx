'use client';
import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../Navbar/Categories";
import CategoryInput from "../Inputs/CategoryInput";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import CountrySelect from "../Inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../Inputs/Counter";
import ImageUpload from "../Inputs/ImageUpload";
import Input from "../Inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

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
    const router = useRouter();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

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

    const location = watch('location');
    const category = watch('category');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc'); 

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false,
    }), [location]);

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

    const onSubmit: SubmitHandler<FieldValues> = async (data) =>{
        if(step !== STEPS.PRICE) {
            return onNext();
        }

        setIsLoading(true);

        axios.post('/api/listings', data).then(() => {
            toast.success('Successfully created a new listing!');
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            rentModal.onClose();
        }).catch((err) => {
            toast.error('Something went wrong!');
        }
        ).finally(() => {
            setIsLoading(false);
        });
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

    if(step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Where is your place located?" description="Help guests find you!"/>
                <CountrySelect value={location} onChange={(value) => setCustomValue('location', value)}/>
                <Map center={location?.latlng}/>
            </div>
        )
    }

    if(step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Share some basics about your place" description="What amenities do you have?"/>
                <Counter title="Guests" description="How many guests allowed?" value={guestCount} onChange={(value) => setCustomValue('guestCount', value)}/>
                <hr />
                <Counter title="Rooms" description="How many rooms do you have?" value={roomCount} onChange={(value) => setCustomValue('roomCount', value)}/>
                <hr />
                <Counter title="Bathrooms" description="How many bathrooms do you have?" value={bathroomCount} onChange={(value) => setCustomValue('bathroomCount', value)}/>
            </div>
        );
    }

    if(step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Upload some photos" description="Showcase your place!"/>
                <ImageUpload value={imageSrc} onChange={(value) => setCustomValue('imageSrc', value)}/>
            </div>
        );
    }

    if(step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Describe your place" description="Tell guests what you love about your place!"/>
                <Input id="title" label="Title" register={register} errors={errors} disabled={isLoading} required/>
                <hr />
                <Input id="description" label="Description" register={register} errors={errors} disabled={isLoading} required/>
            </div>
        );
    }

    if(step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="How much do you want to charge?" description="Set a price for your place!"/>
                <Input id="price" label="Price" formatPrice type="number" disabled={isLoading} errors={errors} register={register} required/>
            </div>
        )
    }

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }

        return "Back";
    }, [step]);

    return(
        <Modal title="Your ResiSeeker home" isOpen={rentModal.isOpen} onSubmit={handleSubmit(onSubmit)}
        onClose={rentModal.onClose} actionLabel={actionLabel} secondaryActionLabel={secondaryActionLabel} 
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack} body={bodyContent}/>
    )
};

export default RentModal;