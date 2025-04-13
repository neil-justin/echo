/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation SendMessage($senderId: String!, $recipientId: String!, $message: String!) {\n    sendMessage(senderId: $senderId, recipientId: $recipientId, message: $message) {\n      message {\n        id\n      }\n      conversation {\n        id\n      }\n    }\n  }\n": typeof types.SendMessageDocument,
    "\n  query GetUser($userId: String!) {\n    user(userId: $userId) {\n      user {\n        id\n        firstName\n        lastName\n      }\n    }\n  }  \n": typeof types.GetUserDocument,
    "\n  query GetSearchedUsers($searchTerm: String!) {\n    searchedUsers(searchTerm: $searchTerm) {\n      users {\n        id\n        firstName\n        lastName\n        avatar\n      }\n    }\n  }\n": typeof types.GetSearchedUsersDocument,
    "\n  query GetUserConversations($userId: String!) {\n    userConversations(userId: $userId) {\n      conversations {\n        id\n        lastMessage {\n          senderId\n          content\n          timestamp\n        }\n        participants {\n          id\n          firstName\n          lastName\n          avatar\n        }\n      }\n    }\n  }": typeof types.GetUserConversationsDocument,
    "\n    mutation GenerateToken($email: String!) {\n      generateToken(email: $email) {\n        code\n        success\n        message\n        token\n        user {\n          id\n          email\n          firstName\n          lastName\n          avatar\n        }\n      }\n    }\n  ": typeof types.GenerateTokenDocument,
    "\n    mutation AddUser(\n      $uid: String!\n      $email: String!\n      $firstName: String!\n      $lastName: String!\n    ) {\n      addUser(\n        uid: $uid\n        email: $email\n        firstName: $firstName\n        lastName: $lastName\n      ) {\n        code\n        success\n        message\n        user {\n          id\n          email\n          firstName\n          lastName\n          avatar\n        }\n      }\n    }\n  ": typeof types.AddUserDocument,
};
const documents: Documents = {
    "\n  mutation SendMessage($senderId: String!, $recipientId: String!, $message: String!) {\n    sendMessage(senderId: $senderId, recipientId: $recipientId, message: $message) {\n      message {\n        id\n      }\n      conversation {\n        id\n      }\n    }\n  }\n": types.SendMessageDocument,
    "\n  query GetUser($userId: String!) {\n    user(userId: $userId) {\n      user {\n        id\n        firstName\n        lastName\n      }\n    }\n  }  \n": types.GetUserDocument,
    "\n  query GetSearchedUsers($searchTerm: String!) {\n    searchedUsers(searchTerm: $searchTerm) {\n      users {\n        id\n        firstName\n        lastName\n        avatar\n      }\n    }\n  }\n": types.GetSearchedUsersDocument,
    "\n  query GetUserConversations($userId: String!) {\n    userConversations(userId: $userId) {\n      conversations {\n        id\n        lastMessage {\n          senderId\n          content\n          timestamp\n        }\n        participants {\n          id\n          firstName\n          lastName\n          avatar\n        }\n      }\n    }\n  }": types.GetUserConversationsDocument,
    "\n    mutation GenerateToken($email: String!) {\n      generateToken(email: $email) {\n        code\n        success\n        message\n        token\n        user {\n          id\n          email\n          firstName\n          lastName\n          avatar\n        }\n      }\n    }\n  ": types.GenerateTokenDocument,
    "\n    mutation AddUser(\n      $uid: String!\n      $email: String!\n      $firstName: String!\n      $lastName: String!\n    ) {\n      addUser(\n        uid: $uid\n        email: $email\n        firstName: $firstName\n        lastName: $lastName\n      ) {\n        code\n        success\n        message\n        user {\n          id\n          email\n          firstName\n          lastName\n          avatar\n        }\n      }\n    }\n  ": types.AddUserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SendMessage($senderId: String!, $recipientId: String!, $message: String!) {\n    sendMessage(senderId: $senderId, recipientId: $recipientId, message: $message) {\n      message {\n        id\n      }\n      conversation {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation SendMessage($senderId: String!, $recipientId: String!, $message: String!) {\n    sendMessage(senderId: $senderId, recipientId: $recipientId, message: $message) {\n      message {\n        id\n      }\n      conversation {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUser($userId: String!) {\n    user(userId: $userId) {\n      user {\n        id\n        firstName\n        lastName\n      }\n    }\n  }  \n"): (typeof documents)["\n  query GetUser($userId: String!) {\n    user(userId: $userId) {\n      user {\n        id\n        firstName\n        lastName\n      }\n    }\n  }  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetSearchedUsers($searchTerm: String!) {\n    searchedUsers(searchTerm: $searchTerm) {\n      users {\n        id\n        firstName\n        lastName\n        avatar\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetSearchedUsers($searchTerm: String!) {\n    searchedUsers(searchTerm: $searchTerm) {\n      users {\n        id\n        firstName\n        lastName\n        avatar\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUserConversations($userId: String!) {\n    userConversations(userId: $userId) {\n      conversations {\n        id\n        lastMessage {\n          senderId\n          content\n          timestamp\n        }\n        participants {\n          id\n          firstName\n          lastName\n          avatar\n        }\n      }\n    }\n  }"): (typeof documents)["\n  query GetUserConversations($userId: String!) {\n    userConversations(userId: $userId) {\n      conversations {\n        id\n        lastMessage {\n          senderId\n          content\n          timestamp\n        }\n        participants {\n          id\n          firstName\n          lastName\n          avatar\n        }\n      }\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation GenerateToken($email: String!) {\n      generateToken(email: $email) {\n        code\n        success\n        message\n        token\n        user {\n          id\n          email\n          firstName\n          lastName\n          avatar\n        }\n      }\n    }\n  "): (typeof documents)["\n    mutation GenerateToken($email: String!) {\n      generateToken(email: $email) {\n        code\n        success\n        message\n        token\n        user {\n          id\n          email\n          firstName\n          lastName\n          avatar\n        }\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation AddUser(\n      $uid: String!\n      $email: String!\n      $firstName: String!\n      $lastName: String!\n    ) {\n      addUser(\n        uid: $uid\n        email: $email\n        firstName: $firstName\n        lastName: $lastName\n      ) {\n        code\n        success\n        message\n        user {\n          id\n          email\n          firstName\n          lastName\n          avatar\n        }\n      }\n    }\n  "): (typeof documents)["\n    mutation AddUser(\n      $uid: String!\n      $email: String!\n      $firstName: String!\n      $lastName: String!\n    ) {\n      addUser(\n        uid: $uid\n        email: $email\n        firstName: $firstName\n        lastName: $lastName\n      ) {\n        code\n        success\n        message\n        user {\n          id\n          email\n          firstName\n          lastName\n          avatar\n        }\n      }\n    }\n  "];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;