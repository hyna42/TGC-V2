import { useEffect, useState } from "react";
// import AdCard, { AdCardProps } from "./AdCard";
import axios from "axios";
import AdCard, { AdCardProps } from "./AdCard";
import { handleDeleteAd } from "../utils/adSerices";

type category = {
  id: string;
  title: string;
};
const RecentAds = () => {
  const [ads, setAds] = useState<AdCardProps[]>([]);

  const [_categories, setCategories] = useState<category[]>([]);

  // const [total, setTotal] = useState(0);
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get<AdCardProps[]>(
          "http://localhost:3000/ads"
        );
        if (response.data) setAds(response.data);
        // console.log("ads", response.data);
      } catch (error) {
        console.log("error fetching ads", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get<category[]>(
          "http://localhost:3000/categories"
        );
        if (response.data) setCategories(response.data);
        // console.log("categories",categories);
      } catch (error) {
        console.log("error fetching categories", error);
      }
    };
    // console.log(categories);
    fetchAds();
    fetchCategories();
  }, []);

  return (
    <>
      <main className="main-content">
        <h2>Annonces récentes</h2>
        {/* <p>Prix total : {total} €</p> */}
        <section className="recent-ads">
          {ads.map((ad) => (
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
                  handleDeleteAd(ad.id,setAds);
                }}
              >
                Supprimer
              </button>
            </div>
          ))}
        </section>
      </main>
    </>
  );
};

export default RecentAds;
