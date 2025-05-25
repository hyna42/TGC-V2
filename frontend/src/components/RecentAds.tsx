import AdCard from "./AdCard";
import {
  useDeleteAdMutation,
  useGetAllAdsQuery,
} from "../generated/graphql-types";
import { GET_ALL_ADS } from "../graphql/queries";
import { useIsLoggedIn } from "../utils/user";

const RecentAds = () => {
  const { data: fetchAdsData } = useGetAllAdsQuery();
  const ads = fetchAdsData?.getAllAds || [];
  const [deleteAd] = useDeleteAdMutation();
  const handleDelete = async (id: number) => {
    console.log("id", id);
    try {
      await deleteAd({
        variables: { deleteAdId: id },
        refetchQueries: [GET_ALL_ADS],
      });
    } catch (error) {
      console.error("Error deleting ad", error);
    }
  };

  const isAuth = useIsLoggedIn().isLoggedIn;
  
  console.log("ads", ads);
  return (
    <>
      <main className="main-content">
        <h2>Annonces récentes : Test Deploy DB 1/2</h2>
        <section className="recent-ads">
          {ads.map((ad) => (
            <div key={ad.id}>
              <AdCard
                id={ad.id}
                title={ad.title}
                pictures={ad.pictures?.map((picture) => picture.url) || []}
                price={ad.price}
                category={ad.category}
              />
              {isAuth && (
                <button
                  className="button delete-ad"
                  onClick={() => {
                    handleDelete(ad.id);
                  }}
                >
                  Supprimer
                </button>
              )}
            </div>
          ))}
        </section>
      </main>
    </>
  );
};

export default RecentAds;
