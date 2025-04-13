import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { MyContext } from './src/index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type AddUserMutationResponse = {
  __typename?: 'AddUserMutationResponse';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type Conversation = {
  __typename?: 'Conversation';
  createdAt: Scalars['Date']['output'];
  id: Scalars['String']['output'];
  lastMessage: LastMessage;
  participants?: Maybe<Array<User>>;
  updatedAt: Scalars['Date']['output'];
};

export type ConversationMessagesQueryResponse = {
  __typename?: 'ConversationMessagesQueryResponse';
  code: Scalars['String']['output'];
  httpMessage: Scalars['String']['output'];
  messages: Array<Message>;
  success: Scalars['Boolean']['output'];
};

export type GenerateTokenMutationResponse = {
  __typename?: 'GenerateTokenMutationResponse';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  token: Scalars['String']['output'];
  user?: Maybe<User>;
};

export type LastMessage = {
  __typename?: 'LastMessage';
  content: Scalars['String']['output'];
  senderId: Scalars['String']['output'];
  timestamp: Scalars['Date']['output'];
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String']['output'];
  id: Scalars['String']['output'];
  recipientId: Scalars['String']['output'];
  senderId: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addUser?: Maybe<AddUserMutationResponse>;
  generateToken?: Maybe<GenerateTokenMutationResponse>;
  sendMessage: SendMessageMutationResponse;
};


export type MutationAddUserArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  uid: Scalars['String']['input'];
};


export type MutationGenerateTokenArgs = {
  email: Scalars['String']['input'];
};


export type MutationSendMessageArgs = {
  message: Scalars['String']['input'];
  recipientId: Scalars['String']['input'];
  senderId: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  conversationMessages: ConversationMessagesQueryResponse;
  searchedUsers: SearchedUsersQueryResponse;
  user: UserQueryResponse;
  userConversations: UserConversationsQueryResponse;
};


export type QueryConversationMessagesArgs = {
  conversationId: Scalars['String']['input'];
};


export type QuerySearchedUsersArgs = {
  searchTerm: Scalars['String']['input'];
};


export type QueryUserArgs = {
  userId: Scalars['String']['input'];
};


export type QueryUserConversationsArgs = {
  userId: Scalars['String']['input'];
};

export type SearchedUsersQueryResponse = {
  __typename?: 'SearchedUsersQueryResponse';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  users: Array<User>;
};

export type SendMessageMutationResponse = {
  __typename?: 'SendMessageMutationResponse';
  code: Scalars['String']['output'];
  conversation: Conversation;
  httpMessage: Scalars['String']['output'];
  message: Message;
  success: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  uid: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type UserConversationsQueryResponse = {
  __typename?: 'UserConversationsQueryResponse';
  code: Scalars['String']['output'];
  conversations: Array<Conversation>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type UserQueryResponse = {
  __typename?: 'UserQueryResponse';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  user: User;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AddUserMutationResponse: ResolverTypeWrapper<AddUserMutationResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Conversation: ResolverTypeWrapper<Conversation>;
  ConversationMessagesQueryResponse: ResolverTypeWrapper<ConversationMessagesQueryResponse>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  GenerateTokenMutationResponse: ResolverTypeWrapper<GenerateTokenMutationResponse>;
  LastMessage: ResolverTypeWrapper<LastMessage>;
  Message: ResolverTypeWrapper<Message>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  SearchedUsersQueryResponse: ResolverTypeWrapper<SearchedUsersQueryResponse>;
  SendMessageMutationResponse: ResolverTypeWrapper<SendMessageMutationResponse>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  UserConversationsQueryResponse: ResolverTypeWrapper<UserConversationsQueryResponse>;
  UserQueryResponse: ResolverTypeWrapper<UserQueryResponse>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AddUserMutationResponse: AddUserMutationResponse;
  Boolean: Scalars['Boolean']['output'];
  Conversation: Conversation;
  ConversationMessagesQueryResponse: ConversationMessagesQueryResponse;
  Date: Scalars['Date']['output'];
  GenerateTokenMutationResponse: GenerateTokenMutationResponse;
  LastMessage: LastMessage;
  Message: Message;
  Mutation: {};
  Query: {};
  SearchedUsersQueryResponse: SearchedUsersQueryResponse;
  SendMessageMutationResponse: SendMessageMutationResponse;
  String: Scalars['String']['output'];
  User: User;
  UserConversationsQueryResponse: UserConversationsQueryResponse;
  UserQueryResponse: UserQueryResponse;
}>;

export type AddUserMutationResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AddUserMutationResponse'] = ResolversParentTypes['AddUserMutationResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ConversationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Conversation'] = ResolversParentTypes['Conversation']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastMessage?: Resolver<ResolversTypes['LastMessage'], ParentType, ContextType>;
  participants?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ConversationMessagesQueryResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ConversationMessagesQueryResponse'] = ResolversParentTypes['ConversationMessagesQueryResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  httpMessage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type GenerateTokenMutationResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['GenerateTokenMutationResponse'] = ResolversParentTypes['GenerateTokenMutationResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LastMessageResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['LastMessage'] = ResolversParentTypes['LastMessage']> = ResolversObject<{
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  senderId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MessageResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = ResolversObject<{
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  recipientId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  senderId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addUser?: Resolver<Maybe<ResolversTypes['AddUserMutationResponse']>, ParentType, ContextType, RequireFields<MutationAddUserArgs, 'email' | 'firstName' | 'lastName' | 'uid'>>;
  generateToken?: Resolver<Maybe<ResolversTypes['GenerateTokenMutationResponse']>, ParentType, ContextType, RequireFields<MutationGenerateTokenArgs, 'email'>>;
  sendMessage?: Resolver<ResolversTypes['SendMessageMutationResponse'], ParentType, ContextType, RequireFields<MutationSendMessageArgs, 'message' | 'recipientId' | 'senderId'>>;
}>;

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  conversationMessages?: Resolver<ResolversTypes['ConversationMessagesQueryResponse'], ParentType, ContextType, RequireFields<QueryConversationMessagesArgs, 'conversationId'>>;
  searchedUsers?: Resolver<ResolversTypes['SearchedUsersQueryResponse'], ParentType, ContextType, RequireFields<QuerySearchedUsersArgs, 'searchTerm'>>;
  user?: Resolver<ResolversTypes['UserQueryResponse'], ParentType, ContextType, RequireFields<QueryUserArgs, 'userId'>>;
  userConversations?: Resolver<ResolversTypes['UserConversationsQueryResponse'], ParentType, ContextType, RequireFields<QueryUserConversationsArgs, 'userId'>>;
}>;

export type SearchedUsersQueryResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['SearchedUsersQueryResponse'] = ResolversParentTypes['SearchedUsersQueryResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SendMessageMutationResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['SendMessageMutationResponse'] = ResolversParentTypes['SendMessageMutationResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  conversation?: Resolver<ResolversTypes['Conversation'], ParentType, ContextType>;
  httpMessage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['Message'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserConversationsQueryResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['UserConversationsQueryResponse'] = ResolversParentTypes['UserConversationsQueryResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  conversations?: Resolver<Array<ResolversTypes['Conversation']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserQueryResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['UserQueryResponse'] = ResolversParentTypes['UserQueryResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MyContext> = ResolversObject<{
  AddUserMutationResponse?: AddUserMutationResponseResolvers<ContextType>;
  Conversation?: ConversationResolvers<ContextType>;
  ConversationMessagesQueryResponse?: ConversationMessagesQueryResponseResolvers<ContextType>;
  Date?: GraphQLScalarType;
  GenerateTokenMutationResponse?: GenerateTokenMutationResponseResolvers<ContextType>;
  LastMessage?: LastMessageResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SearchedUsersQueryResponse?: SearchedUsersQueryResponseResolvers<ContextType>;
  SendMessageMutationResponse?: SendMessageMutationResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserConversationsQueryResponse?: UserConversationsQueryResponseResolvers<ContextType>;
  UserQueryResponse?: UserQueryResponseResolvers<ContextType>;
}>;

