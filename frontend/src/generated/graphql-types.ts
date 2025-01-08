import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTimeISO: { input: any; output: any };
};

export type Ad = {
  __typename?: "Ad";
  category: Category;
  createdAt: Scalars["DateTimeISO"]["output"];
  description: Scalars["String"]["output"];
  id: Scalars["Float"]["output"];
  location: Scalars["String"]["output"];
  owner: Scalars["String"]["output"];
  pictures?: Maybe<Array<Picture>>;
  price: Scalars["Float"]["output"];
  tags?: Maybe<Array<Tag>>;
  title: Scalars["String"]["output"];
};

export type AdInput = {
  categoryId: Scalars["Int"]["input"];
  createdAt: Scalars["DateTimeISO"]["input"];
  description: Scalars["String"]["input"];
  location: Scalars["String"]["input"];
  owner: Scalars["String"]["input"];
  pictures?: InputMaybe<Array<Scalars["String"]["input"]>>;
  price: Scalars["Float"]["input"];
  tagIds?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  title: Scalars["String"]["input"];
};

export type Category = {
  __typename?: "Category";
  id: Scalars["Float"]["output"];
  title: Scalars["String"]["output"];
};

export type CategroyInput = {
  title: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  createCategory: Category;
  createNewAd: Ad;
  createTag: Tag;
  deleteAd: Scalars["String"]["output"];
  deleteCategory: Scalars["String"]["output"];
  deleteTag: Scalars["String"]["output"];
  updateAd: Scalars["String"]["output"];
  updateCategory: Scalars["String"]["output"];
  updateTag: Scalars["String"]["output"];
};

export type MutationCreateCategoryArgs = {
  data: CategroyInput;
};

export type MutationCreateNewAdArgs = {
  data: AdInput;
};

export type MutationCreateTagArgs = {
  data: TagInput;
};

export type MutationDeleteAdArgs = {
  id: Scalars["Float"]["input"];
};

export type MutationDeleteCategoryArgs = {
  id: Scalars["Float"]["input"];
};

export type MutationDeleteTagArgs = {
  id: Scalars["Float"]["input"];
};

export type MutationUpdateAdArgs = {
  data: UpdateAdInput;
};

export type MutationUpdateCategoryArgs = {
  data: UpdateCategroyInput;
};

export type MutationUpdateTagArgs = {
  data: UpdateTagInput;
};

export type Picture = {
  __typename?: "Picture";
  ad: Ad;
  id: Scalars["Float"]["output"];
  url: Scalars["String"]["output"];
};

export type Query = {
  __typename?: "Query";
  getAdById: Ad;
  getAllAds: Array<Ad>;
  getAllCategories: Array<Category>;
  getAllTags: Array<Tag>;
  getCategoryById: Category;
  getTagById: Tag;
};

export type QueryGetAdByIdArgs = {
  id: Scalars["Float"]["input"];
};

export type QueryGetAllAdsArgs = {
  category?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryGetCategoryByIdArgs = {
  id: Scalars["Float"]["input"];
};

export type QueryGetTagByIdArgs = {
  id: Scalars["Float"]["input"];
};

export type Tag = {
  __typename?: "Tag";
  id: Scalars["Float"]["output"];
  name: Scalars["String"]["output"];
};

export type TagInput = {
  name: Scalars["String"]["input"];
};

export type UpdateAdInput = {
  categoryId?: InputMaybe<Scalars["Int"]["input"]>;
  createdAt?: InputMaybe<Scalars["DateTimeISO"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["Int"]["input"];
  location?: InputMaybe<Scalars["String"]["input"]>;
  owner?: InputMaybe<Scalars["String"]["input"]>;
  pictures?: InputMaybe<Array<Scalars["String"]["input"]>>;
  price?: InputMaybe<Scalars["Float"]["input"]>;
  tagIds?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateCategroyInput = {
  id: Scalars["Float"]["input"];
  title: Scalars["String"]["input"];
};

export type UpdateTagInput = {
  id: Scalars["Float"]["input"];
  name: Scalars["String"]["input"];
};

export type GetAllAdsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllAdsQuery = {
  __typename?: "Query";
  getAllAds: Array<{
    __typename?: "Ad";
    id: number;
    title: string;
    description: string;
    owner: string;
    price: number;
    location: string;
    createdAt: any;
    pictures?: Array<{
      __typename?: "Picture";
      id: number;
      url: string;
    }> | null;
    category: { __typename?: "Category"; id: number; title: string };
    tags?: Array<{ __typename?: "Tag"; id: number; name: string }> | null;
  }>;
};

export const GetAllAdsDocument = gql`
  query GetAllAds {
    getAllAds {
      id
      title
      description
      owner
      price
      location
      createdAt
      pictures {
        id
        url
      }
      category {
        id
        title
      }
      tags {
        id
        name
      }
    }
  }
`;

/**
 * __useGetAllAdsQuery__
 *
 * To run a query within a React component, call `useGetAllAdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllAdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllAdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllAdsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetAllAdsQuery, GetAllAdsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllAdsQuery, GetAllAdsQueryVariables>(
    GetAllAdsDocument,
    options
  );
}
export function useGetAllAdsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllAdsQuery,
    GetAllAdsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllAdsQuery, GetAllAdsQueryVariables>(
    GetAllAdsDocument,
    options
  );
}
export function useGetAllAdsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetAllAdsQuery, GetAllAdsQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetAllAdsQuery, GetAllAdsQueryVariables>(
    GetAllAdsDocument,
    options
  );
}
export type GetAllAdsQueryHookResult = ReturnType<typeof useGetAllAdsQuery>;
export type GetAllAdsLazyQueryHookResult = ReturnType<
  typeof useGetAllAdsLazyQuery
>;
export type GetAllAdsSuspenseQueryHookResult = ReturnType<
  typeof useGetAllAdsSuspenseQuery
>;
export type GetAllAdsQueryResult = Apollo.QueryResult<
  GetAllAdsQuery,
  GetAllAdsQueryVariables
>;
