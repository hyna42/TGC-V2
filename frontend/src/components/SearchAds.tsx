import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AdCard, { AdCardProps } from "./AdCard";
import { fetchAdsUsingQueryParams, handleDeleteAd } from "../utils/adSerices";

const SearchAds = () => {
  const navigate = useNavigate();
  const [adsFiltred, setAdsFiltred] = useState<AdCardProps[]>([]);

  const [searchParams, _setSearchParams] = useSearchParams();
  const title = searchParams.get("title");

  useEffect(() => {
    const fetchData = async () => {
      if (title) {
        const ads = await fetchAdsUsingQueryParams(title);
        setAdsFiltred(ads);
        console.log("isMatch", ads);
        // setAdsFiltred()
        if (!ads) {
          console.log("Aucun correspondance");
          navigate("/");
        }
      }
    };

    if (title) fetchData();
  }, [title]);

  console.log("seraching word ==> ", title);
  console.log("adFiltred ==> ", adsFiltred);

  return (
    <>
      <main className="main-content">
        <h2>Liste des annonces correspondantes à "{title}"</h2>
        {/* <p>Prix total : {total} €</p> */}
        <section className="recent-ads">
          {adsFiltred.map((ad) => (
            <div key={ad.id}>
              <AdCard
                id={ad.id}
                title={ad.title}
                pictures={ad.pictures}
                price={ad.price}
                // link={ad.id.toString()}
                category={ad.category}
              />
              <button
                className="button delete-ad"
                onClick={() => {
                  // console.log("id ",ad.id);
                  handleDeleteAd(ad.id, setAdsFiltred);
                }}
              >
                Supprimer l'annonce
              </button>
            </div>
          ))}
        </section>
      </main>
    </>
  );
};

export default SearchAds;
