import { gql } from "@apollo/client";

/* AD queries */
export const GET_ALL_ADS = gql`
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

export const GET_AD_BY_ID = gql`
  query GetAdById($getAdByIdId: Float!) {
    getAdById(id: $getAdByIdId) {
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

/* CATEGORY queries */
export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    getAllCategories {
      id
      title
    }
  }
`;

export const GET_CATEGORY_BY_ID = gql`
  query GetCategoryById($getCategoryByIdId: Float!) {
    getCategoryById(id: $getCategoryByIdId) {
      id
      title
    }
  }
`;

/* TAG queries */
export const GET_ALL_TAGS = gql`
  query GetAllTags {
    getAllTags {
      id
      name
    }
  }
`;

export const GET_TAG_BY_ID = gql`
  query GetTagById($getTagByIdId: Float!) {
    getTagById(id: $getTagByIdId) {
      id
      name
    }
  }
`;

/* TAG queries */
export const GET_ALL_CATEGORIES_AND_TAGS = gql`
  query GetAllCategoriesAndTags {
    getAllCategories {
      id
      title
    }
    getAllTags {
      id
      name
    }
  }
`;

/* USER queries */
export const IS_LOGGED_IN = gql`
  query Me {
    Me {
      email
      isLoggedIn
    }
  }
`;
