// backend/src/__tests__/createNewAd.resolver.test.ts
import AdResolver from "../resolvers/AdResolver";
import { Ad } from "../entities/Ad";
import { Category } from "../entities/Category";
import { Tag } from "../entities/Tag";
import { User } from "../entities/User";

describe("AdResolver.createNewAd", () => {
  const resolver = new AdResolver();

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("devrait assembler toutes les relations et sauvegarder une nouvelle annonce", async () => {
    const fakeCategory = { id: 5, title: "Informatique" } as Category;
    const fakeTags = [
      { id: 1, name: "Urgent" },
      { id: 2, name: "Bon plan" },
    ] as Tag[];
    const fakeUser = { id: 42, email: "vendeur@example.com" } as User;

    jest.spyOn(Category, "findOne").mockResolvedValue(fakeCategory as any);
    jest.spyOn(Tag, "findBy").mockResolvedValue(fakeTags as any);
    jest.spyOn(User, "findOneBy").mockResolvedValue(fakeUser as any);

    const saveMock = jest.fn().mockResolvedValue(undefined);
    const createSpy = jest
      .spyOn(Ad, "create")
      .mockReturnValue({ save: saveMock } as unknown as Ad);

    const input = {
      title: 'MacBook Pro 16"',
      description: "Modèle 2023 en excellent état avec facture.",
      owner: "Camille",
      price: 2499,
      location: "Paris",
      categoryId: fakeCategory.id,
      tagIds: fakeTags.map((tag) => tag.id),
      pictures: [
        "https://cdn.goodcorner.fr/macbook1.jpg",
        "https://cdn.goodcorner.fr/macbook2.jpg",
      ],
    };

    const result = await resolver.createNewAd(input as any, {
      email: fakeUser.email,
    });

    expect(User.findOneBy).toHaveBeenCalledWith({ email: fakeUser.email });
    expect(Category.findOne).toHaveBeenCalledWith({
      where: { id: fakeCategory.id },
    });
    expect(Tag.findBy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledTimes(1);

    const createPayload = createSpy.mock.calls[0][0] as any;

    expect(createPayload).toMatchObject({
      title: input.title,
      description: input.description,
      price: input.price,
      location: input.location,
      category: fakeCategory,
      tags: fakeTags,
      user: fakeUser,
    });
    expect(createPayload.pictures).toHaveLength(2);
    expect(createPayload.pictures[0]).toMatchObject({ url: input.pictures[0] });
    expect(createPayload.pictures[1]).toMatchObject({ url: input.pictures[1] });

    expect(saveMock).toHaveBeenCalledTimes(1);
    expect(result).toBe("Ad successfully created!");
  });
});
