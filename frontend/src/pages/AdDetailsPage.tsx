import { Link, useParams } from "react-router-dom";
import { useGetAdByIdQuery } from "../generated/graphql-types";
import { useIsLoggedIn } from "../utils/user";

const AdDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data } = useGetAdByIdQuery({ variables: { getAdByIdId: parseInt(id as string) } })
  const adDetails = data?.getAdById;
  
      const isAuth = useIsLoggedIn().isLoggedIn||false
  
  console.log('adDetails', adDetails)
    if (!adDetails) return <p>Chargement des détails de l'annonce...</p>;
  return (
    <>
      <h2 className="ad-details-title">{adDetails.title}</h2>
      {adDetails.tags?.map((tag) => {
        return (
          <span className="ad-details-tag-name" key={tag.id}>
            {tag.name}
          </span>
        );
      })}

      <section className="ad-details">
        <div className="ad-details-image-container">
          <img className="ad-details-image" src={adDetails.pictures?.[0].url} />
        </div>
        <div className="ad-details-info">
          <div className="ad-details-price">{adDetails.price} €</div>
          <div className="ad-details-description">{adDetails.description}</div>
          <hr className="separator" />
          <div className="ad-details-owner">
            Annoncée publiée par <b>{adDetails.user.name}</b> le{" "}
            {new Date(adDetails.createdAt).toLocaleDateString()}.
          </div>

         {isAuth && <a
            href="mailto:serge@serge.com"
            className="button button-primary link-button"
          >
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              className="styled__BaseIcon-sc-1jsm4qr-0 llmHhT"
              stroke="currentcolor"
              troke-width="2.5"
              fill="none"
            >
              <path d="M25 4H7a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h18a5 5 0 0 0 5-5V9a5 5 0 0 0-5-5ZM7 6h18a3 3 0 0 1 2.4 1.22s0 0-.08 0L18 15.79a3 3 0 0 1-4.06 0L4.68 7.26H4.6A3 3 0 0 1 7 6Zm18 20H7a3 3 0 0 1-3-3V9.36l8.62 7.9a5 5 0 0 0 6.76 0L28 9.36V23a3 3 0 0 1-3 3Z"></path>
            </svg>
            Envoyer un email
          </a>}
        </div>
        {isAuth && <Link
          to={`/ad/update/${id}`}
          className="button button-primary link-button"
        >
          Modifier
        </Link>}
      </section>
    </>
  );
};

export default AdDetailsPage;
