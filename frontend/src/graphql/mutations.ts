import { gql } from "@apollo/client";

/* AD mutations */
export const DELETE_AD = gql`
  mutation DeleteAd($deleteAdId: Float!) {
    deleteAd(id: $deleteAdId)
  }
`;
export const CREATE_NEW_AD = gql`
  mutation CreateNewAd($data: AdInput!) {
    createNewAd(data: $data)
  }
`;
export const UPDATE_AD = gql`
  mutation UpdateAd($data: UpdateAdInput!) {
    updateAd(data: $data)
  }
`;

/* CATEGORY mutations */
export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($deleteCategoryId: Float!) {
    deleteCategory(id: $deleteCategoryId)
  }
`;
export const CREATE_NEW_CATEGORY = gql`
  mutation CreateCategory($data: CategroyInput!) {
    createCategory(data: $data) {
      id
      title
    }
  }
`;
export const UPDATE_CATEGORY = gql`
  mutation updateCategory($data: UpdateCategroyInput!) {
    updateCategory(data: $data)
  }
`;

/* TAG mutations */
export const DELETE_TAG = gql`
  mutation DeleteTag($deleteTagId: Float!) {
    deleteTag(id: $deleteTagId)
  }
`;
export const CREATE_TAG = gql`
  mutation createTag($data: TagInput!) {
    createTag(data: $data) {
      id
      name
    }
  }
`;
export const UPDATE_TAG = gql`
  mutation updateTag($data: UpdateTagInput!) {
    updateTag(data: $data)
  }
`;

/* USER mutations */
export const SIGN_UP = gql`
  mutation Signup($data: UserInput!) {
    signup(data: $data)
  }
`;
