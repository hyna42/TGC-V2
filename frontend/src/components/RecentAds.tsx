import AdCard, { AdCardProps } from "./AdCard";

const RecentAds = () => {
  const ads: AdCardProps[] = [
    {
      title: "Table",
      imgUrl: "/public/images/table.webp",
      price: 120,
      link: "/ads/table",
    },
    {
      title: "Dame-jeanne",
      imgUrl: "/public/images/dame-jeanne.webp",
      price: 75,
      link: "/ads/dame-jeanne",
    },
    {
      title: "Vide-poche",
      price: 4,
      imgUrl: "/public/images/vide-poche.webp",
      link: "/ads/vide-poche",
    },
    {
      title: "Vaisselier",
      price: 900,
      imgUrl: "/public/images/vaisselier.webp",
      link: "/ads/vaisselier",
    },
    {
      title: "Bougie",
      price: 8,
      imgUrl: "/public/images/bougie.webp",
      link: "/ads/bougie",
    },
    {
      title: "Porte-magazine",
      price: 45,
      imgUrl: "/public/images/porte-magazine.webp",
      link: "/ads/porte-magazine",
    },
  ];

  return (
    <>
      <main className="main-content">
        <h2>Annonces récentes</h2>
        <section className="recent-ads">
          {ads.map((ad) => (
            <AdCard
              key={ad.title}
              title={ad.title}
              imgUrl={ad.imgUrl}
              price={ad.price}
              link={ad.link}
            />
          ))}
        </section>
      </main>
    </>
  );
};

export default RecentAds;
