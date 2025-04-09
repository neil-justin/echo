import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, MessageCircleMore } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NavLink } from 'react-router';
import classNames from 'classnames';
import { ModeToggle } from './mode-toggle';
import { UserDB } from '@/types';
import { useEffect, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { useLazyQuery, useQuery } from '@apollo/client';
import { gql } from '@/__generated__/gql';

const GET_SEARCHED_USERS = gql(`
  query GetSearchedUsers($searchTerm: String!) {
    searchedUsers(searchTerm: $searchTerm) {
      users {
        id
        firstName
        lastName
        avatar
      }
    }
  }
`);

const GET_USER_CONVERSATIONS = gql(`
  query GetUserConversations($userId: String!) {
    userConversations(userId: $userId) {
      conversations {
        id
        lastMessage {
          senderId
          content
          timestamp
        }
        participants {
          id
          firstName
          lastName
          avatar
        }
        updatedAt
      }
    }
  }`);

interface SidebarProps {
  updateRecipient: React.Dispatch<
    React.SetStateAction<UserDB | null | undefined>
  >;
  loggedinUser: UserDB;
}

const Sidebar = ({ updateRecipient, loggedinUser }: SidebarProps) => {
  const [getSearchedUsers, { data: searchedUsersData }] =
    useLazyQuery(GET_SEARCHED_USERS);
  const { data: userConversationsData } = useQuery(GET_USER_CONVERSATIONS, {
    variables: { userId: loggedinUser.id },
  });
  const userConverstations =
    userConversationsData?.userConversations?.conversations ?? [];
  const searchedUsers = searchedUsersData?.searchedUsers?.users ?? [];

  const [onSearchFocus, setOnSearchFocus] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const searchUsers = async () => {
      if (debouncedSearchTerm && searchTerm) {
        getSearchedUsers({
          variables: {
            searchTerm,
          },
        });
      }
    };

    searchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  const handleSearchInputClick = () => {
    setOnSearchFocus(true);
    // No user is ""
    // Set searchTerm for the sake of clearing the search input
    setSearchTerm('');

    // This will cause a rerender and display nothing
    getSearchedUsers({
      variables: {
        searchTerm: '',
      },
    });
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleBackSearchClick = () => {
    setOnSearchFocus(false);
    setSearchTerm('');
  };

  const handleClickOnSearchUser = (user: UserDB) => {
    updateRecipient(user);
    setOnSearchFocus(false);
    setSearchTerm('');
  };

  return (
    <Tabs
      defaultValue='chats'
      className='flex-row h-full bg-muted'
    >
      <TabsList className='h-full flex flex-col justify-between border-r rounded-none'>
        {/* Inbox switcher */}
        <div className='grid'>
          <TabsTrigger
            value='chats'
            className='h-fit p-4 hover:cursor-pointer'
          >
            <MessageCircleMore className='scale-150' />
          </TabsTrigger>
        </div>
        <div>
          <ModeToggle />
        </div>
      </TabsList>
      <TabsContent
        value='chats'
        className='px-2 py-4 flex flex-col gap-3 border-r min-w-3xs'
      >
        <h1 className='text-2xl font-bold'>Chats</h1>
        <div className='flex items-center gap-2'>
          {onSearchFocus ? (
            <button
              className='hover:cursor-pointer'
              onClick={() => handleBackSearchClick()}
            >
              <ArrowLeft />
            </button>
          ) : null}
          <Input
            type='text'
            placeholder='Search Echo'
            className='rounded-full w-full'
            onFocus={() => handleSearchInputClick()}
            onChange={(e) => handleSearchInputChange(e)}
            value={searchTerm}
          />
        </div>
        {/* Conversation list */}
        <div className='flex flex-col gap-2'>
          {/* onSearchFocus display search results. Else display convo with users */}
          {onSearchFocus
            ? searchedUsers.map((user) => {
                if (!user) return;

                return (
                  <NavLink
                    to={`/chats/${user.id}`}
                    className={({ isActive }) =>
                      classNames('flex gap-2 p-2 rounded-md', {
                        'bg-gray-200 dark:bg-gray-800': isActive,
                      })
                    }
                    key={user.id}
                    onClick={() => handleClickOnSearchUser(user)}
                  >
                    <Avatar className='size-12'>
                      <AvatarImage
                        src={user.avatar ?? undefined}
                        alt={`@${user.firstName}`}
                      />
                      <AvatarFallback>
                        {/* Gets the initial letter of first and last names
                        e.g., Neil Justin --> NJ */}
                        {`${user.firstName.substring(
                          0,
                          1
                        )}${user.lastName.substring(0, 1)}`}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='text-foreground whitespace-nowrap'>{`${user.firstName} ${user.lastName}`}</p>
                    </div>
                  </NavLink>
                );
              })
            : userConverstations.map((conversation) => {
                const recipient =
                  loggedinUser.id === conversation?.participants?.[0]?.id
                    ? conversation.participants[1]
                    : conversation?.participants?.[0];

                return (
                  <NavLink
                    to={`/chats/${conversation?.id}`}
                    className={({ isActive }) =>
                      classNames('flex gap-2 p-2 rounded-md', {
                        'bg-gray-200 dark:bg-gray-800': isActive,
                      })
                    }
                    key={conversation?.id}
                    onClick={() => updateRecipient(recipient)}
                  >
                    <Avatar className='size-12'>
                      <AvatarImage
                        src={recipient?.avatar ?? undefined}
                        alt={`@${recipient?.firstName}`}
                      />
                      <AvatarFallback>
                        {/* Gets the initial letter of first and last names
                         e.g., Neil Justin --> NJ */}
                        {`${recipient?.firstName.substring(
                          0,
                          1
                        )}${recipient?.lastName.substring(0, 1)}`}
                      </AvatarFallback>
                    </Avatar>
                    <div className='w-full whitespace-nowrap overflow-hidden'>
                      <p className='text-foreground'>{`${recipient?.firstName} ${recipient?.lastName}`}</p>
                      <p className='text-foreground/50 text-sm'>
                        {loggedinUser.id === conversation?.lastMessage.senderId
                          ? `You: ${conversation.lastMessage.content}`
                          : `${conversation?.lastMessage.content}`}
                      </p>
                    </div>
                  </NavLink>
                );
              })}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default Sidebar;
