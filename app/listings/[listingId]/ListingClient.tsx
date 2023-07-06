'use client';
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/Listings/ListingHead";
import ListingInfo from "@/app/components/Listings/ListingInfo";
import ListingReservation from "@/app/components/Listings/ListingReservation";
import { categories } from "@/app/components/Navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval, setDate } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
}

interface ListingClientProps {
    reservations?: SafeReservation[];
    listing: SafeListing & {
        user: SafeUser;
    };
    currentUser?: SafeUser | null;

}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    reservations = [],
    currentUser,
}) => {
    const loginModal = useLoginModal();
    const router = useRouter();
    const disabledDates = useMemo(() => {
        let dates: Date[] = [];
        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate),
            })

            dates = [...dates, ...range];
        });

        return dates;
    }, [reservations]);

    const [isLoading, setIsLoading] = useState(false);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const [totalPrice, setTotalPrice] = useState(listing.price);

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            loginModal.onOpen();
            return;
        }

        setIsLoading(true);

        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id,
        }).then(() => {
            toast.success('Reservation created!');
            setDateRange(initialDateRange);
            router.push('/trips');
        }).catch((err) => {
            toast.error('Something went wrong!');
        }).finally(() => {
            setIsLoading(false);
        }
        )
    }, [totalPrice, dateRange, listing?.id, currentUser, router, loginModal]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const days = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);

            if(days && listing.price) {
                setTotalPrice(days * listing.price);
            }else {
                setTotalPrice(listing.price);
            }
        }

    }, [dateRange, listing.price]);

    const category = useMemo(() => {
        return categories.find((c) => c.label === listing.category);
    }, [listing.category]);

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead title={listing.title} imageSrc={listing.imageSrc} locationValue={listing.locationValue} 
                    id={listing.id} currentUser={currentUser}/>
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                    <ListingInfo user={listing.user} category={category} description={listing.description} roomCount={listing.roomCount} 
                    guestCount={listing.guestCount} bathroomCount={listing.bathroomCount} locationValue={listing.locationValue} />
                    <div className="order-first mb-10 md:order-last md:col-span-3 ">
                        <ListingReservation price={listing.price} onChangeDate={(value) => setDateRange(value)} 
                        dateRange={dateRange} totalPrice={totalPrice} disabled={isLoading} 
                        disabledDates={disabledDates} onSubmit={onCreateReservation}/>
                    </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ListingClient;