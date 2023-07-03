'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
    title: string;
    locationValue: string;
    imageSrc: string;
    id: string;
    currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    locationValue,
    imageSrc,
    id,
    currentUser
}) => {
    const { getByValue } = useCountries();

    const location = getByValue(locationValue);

    return (
        <>
        <Heading title={title} description={`${location?.region}, ${location?.label}`}/>
        <div className="h-[60vh] w-full rounded-xl relative overflow-hidden">
            <Image src={imageSrc} alt={"image"} className="w-full object-cover" fill/>
            <div className="absolute top-5 right-5">
                <HeartButton listingId={id} currentUser={currentUser}/>
            </div>
        </div>
        </>
    );
}

export default ListingHead;