import AdResolver from "../resolvers/AdResolver";
import { Ad } from "../entities/Ad";

// Setup du resolver
const resolver = new AdResolver();

describe("adResolver", () => {
  describe("updateAd", () => {
    it.only("should allow the author to update their ad", async () => {
      //1. fausse annonce existante avec un auteur
      const fakeAd = {
        id: 1,
        title: "Old Title",
        user: { email: "author@test.com" },
        save: jest.fn(), // on mock la méthode .save()
      };

      //2. On mock Ad.findOne pour qu'il retourne fakeAd
      jest.spyOn(Ad, "findOne").mockResolvedValue(fakeAd as any);

      //3. Données de mise à jour
      const input = {
        id: 1,
        title: "new Title",
      };

      //4. Contexte simulé avec l'email de l'auteur
      const context = { email: "author@test.com" };

      //5. On appelle updateAd
      const result = await resolver.updateAd(input, context);

      //6. On vérifie que le résultat est correct
      expect(fakeAd.save).toHaveBeenCalled();

      expect(result).toBe("Ad 1 has been updated");
    });

    it("should throw if another user tries to update the ad", async () => {});
  });
});

/***
 * ✅
 *  Étape 2 – Ce qu’on doit faire dans le 1er test :
But : simuler une situation où le context.email correspond à l’auteur de l’annonce.

Donc il nous faut :

Une fausse annonce (adToUpdate)

Un faux contexte (context.email)

Une simulation du comportement de Ad.findOne (mock)

Appeler resolver.updateAd(...)

Vérifier que ça ne jette pas d’erreur
 */
