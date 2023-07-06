'use client';

import { useCallback, useState } from "react";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../types";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/Listings/ListingCard";

interface TripsClientProps {
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState("");
    const onCancel = useCallback(async (id: string) => {
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`).then(() => {
            toast.success("Reservation cancelled");
            router.refresh();
        }).catch((err) => {
            toast.error(err?.response?.data?.message || "Something went wrong");
        }).finally(() => {
            setDeletingId("");
        });
    }, []);
    return (
        <Container>
            <Heading title="Trips" description="Where you've been and where you're going"/>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cold-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {reservations.map((reservation) => (
                    <ListingCard key={reservation.id} data={reservation.listing} reservation={reservation} 
                    actionId={reservation.id} onAction={onCancel} actionLabel="Cancel reservation" currentUser={currentUser}/>
                ))}
            </div>
        </Container>
    )
}

export default TripsClient;