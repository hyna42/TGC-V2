import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AdCard, { AdCardProps } from "./AdCard";
import { fetchAdsUsingQueryParams, handleDeleteAd } from "../utils/adSerices";

const SearchAds = () => {
  const navigate = useNavigate();
  const [adsFiltred, setAdsFiltred] = useState<AdCardProps[]>([]);

  const [searchParams, _setSearchParams] = useSearchParams();
  //dynamic objec parameter
  const title = searchParams.get("title");
  const category = searchParams.get("category");
  const tag = searchParams.get("tag");

  let filters: {
    title?: string;
    category?: string;
    tag?: string;
  } = {};

  if (title) filters.title = title;
  if (category) filters.category = category;
  if (tag) filters.tag = tag;

  // console.log("Obejct ", Object.keys(filters));

  useEffect(() => {
    const fetchData = async () => {
      if (Object.keys(filters).length > 0) {
        const ads = await fetchAdsUsingQueryParams(filters);
        setAdsFiltred(ads);
        console.log("isMatch", ads);
        if (!ads) {
          setAdsFiltred([]);
          console.log("Aucun correspondance");
          navigate("/");
        }
      }
    };

    if (title || category || tag) fetchData();
  }, [title, category, tag]);

  console.log("adFiltred ==> ", adsFiltred);

  return (
    <>
      <main className="main-content">
        <h2>Liste des annonces correspondantes</h2>
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
