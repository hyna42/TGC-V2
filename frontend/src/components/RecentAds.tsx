import { useEffect, useState } from "react";
// import AdCard, { AdCardProps } from "./AdCard";
import axios from "axios";
import AdCard, { AdCardProps } from "./AdCard";

type category = {
  id: string;
  title: string;
};
const RecentAds = () => {
  // const ads: AdCardProps[] = [
  //   {
  //     title: "Table",
  //     imgUrl: "/public/images/table.webp",
  //     price: 120,
  //     link: "/ads/table",
  //   },
  //   {
  //     title: "Dame-jeanne",
  //     imgUrl: "/public/images/dame-jeanne.webp",
  //     price: 75,
  //     link: "/ads/dame-jeanne",
  //   },
  //   {
  //     title: "Vide-poche",
  //     price: 4,
  //     imgUrl: "/public/images/vide-poche.webp",
  //     link: "/ads/vide-poche",
  //   },
  //   {
  //     title: "Vaisselier",
  //     price: 900,
  //     imgUrl: "/public/images/vaisselier.webp",
  //     link: "/ads/vaisselier",
  //   },
  //   {
  //     title: "Bougie",
  //     price: 8,
  //     imgUrl: "/public/images/bougie.webp",
  //     link: "/ads/bougie",
  //   },
  //   {
  //     title: "Porte-magazine",
  //     price: 45,
  //     imgUrl: "/public/images/porte-magazine.webp",
  //     link: "/ads/porte-magazine",
  //   },
  // ];

  const [ads, setAds] = useState<AdCardProps[]>([]);

  const [_categories, setCategories] = useState<category[]>([]);

  const [total, setTotal] = useState(0);
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
        <p>Prix total : {total} €</p>
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
                className="button"
                onClick={() => {
                  setTotal(total + ad.price);
                }}
              >
                Add price to total
              </button>
            </div>
          ))}
        </section>
      </main>
    </>
  );
};

export default RecentAds;
