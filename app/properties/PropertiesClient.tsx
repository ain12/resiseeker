'use client';

import { useCallback, useState } from "react";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeListing, SafeUser } from "../types";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/Listings/ListingCard";

interface PropertiesClientProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
    listings,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState("");
    const onCancel = useCallback(async (id: string) => {
        setDeletingId(id);
        axios.delete(`/api/listings/${id}`).then(() => {
            toast.success("Listing deleted");
            router.refresh();
        }).catch((err) => {
            toast.error(err?.response?.data?.message || "Something went wrong");
        }).finally(() => {
            setDeletingId("");
        });
    }, []);
    return (
        <Container>
            <Heading title="Properties" description="List of your properties"/>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cold-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {listings.map((listing) => (
                    <ListingCard key={listing.id} data={listing}
                    actionId={listing.id} onAction={onCancel} actionLabel="Delete property" currentUser={currentUser} disabled={deletingId === listing.id}/>
                ))}
            </div>
        </Container>
    )
}

export default PropertiesClient;