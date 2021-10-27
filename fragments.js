import { gql } from "@apollo/client";

export const PHOTO_FRAGMENT = gql`
  fragment PhotoFragment on CoffeShopPhoto {
    id
    url
    shopId
    commentNumber
    isLiked
  }
`;

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    user {
      username
      avatar
    }
    payload
    isMine
    createdAt
  }
`;

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    username
    avatar
    coffeeShops
    location
    isFollowing
    name
    email
    isMe
  }
`;

export const FEED_PHOTO = gql`
  fragment FeedPhoto on CoffeeShop {
    photos {
      ...PhotoFragment
    }
    user {
      id
      username
      avatar
    }
    latitude
    longitude
    caption
    createdAt
    isMine
  }
  ${PHOTO_FRAGMENT}
`;

export const ROOM_FRAGMENT = gql`
  fragment RoomParts on Room {
    id
    unreadTotal
    users {
      avatar
      username
    }
  }
`;
