import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import PropertiesClient from "./PropertiesClient";
import getListings from "../actions/getListings";
//import TripsClient from "./TripsClient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" description="Please login"
        />
      </ClientOnly>
    );
  }
  const listings = await getListings({
    userId: currentUser.id,
    });

    if(listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title="No properties" description="You have not added any properties yet." />
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <PropertiesClient currentUser={currentUser} listings={listings}/>
        </ClientOnly>
    )
}

export default PropertiesPage;

