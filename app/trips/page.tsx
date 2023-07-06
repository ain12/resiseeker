import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import TripsClient from "./TripsClient";
//import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" description="Please login"
        />
      </ClientOnly>
    );
  }
  const reservations = await getReservations({
    userId: currentUser.id,
    });

    if(reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title="No Trips" description="You have not booked any trips yet." />
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <TripsClient currentUser={currentUser} reservations={reservations}/>
        </ClientOnly>
    )
}

export default TripsPage;

