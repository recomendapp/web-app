'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { account, databases } from '@/db/appwrite';
import { User } from '@/types/type.user';

export interface UserState {
  user: any;
  userLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (
    email: string,
    name: string,
    username: string,
    password: string
  ) => Promise<void>;
  userRefresh: () => Promise<void>;
}

const defaultState: UserState = {
  user: null,
  userLoading: true,
  login: async () => {},
  logout: async () => {},
  signup: async () => {},
  userRefresh: async () => {},
};

// create the context
const UserContext = createContext<UserState>(defaultState);

// create the provider component
export const UserProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<null | any>(null);
  const [userLoading, setUserLoading] = useState(true);

  const chekcUser = async () => {
    try {
      const userRequest = await account.get();
      let userDetails;

      try {
        userDetails = await databases.getDocument(
          String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
          String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USER),
          userRequest.$id
        );
      } catch (error) {
        console.log('No user details found');
      }
      if (userDetails) {
        setUser({
          ...userRequest,
          ...userDetails
          // username: userDetails.username,
          // usernameUpdate: userDetails.usernameUpdate,
          // avatar: userDetails.avatar,
          // language: userDetails.language,
          // bio: userDetails.bio,
          // url: userDetails.url,
          // verify: userDetails.verify
        });
      } else {
        setUser(userRequest);
      }
    } catch (error) {
      setUser(false);
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    chekcUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await account.createEmailSession(email, password);
      const userRequest = await account.get();
      let userDetails;

      try {
        userDetails = await databases.getDocument(
          String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
          String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USER),
          userRequest.$id
        );
      } catch (error) {
        console.log('No user details found');
      }

      if (userDetails) {
        setUser({
          ...userRequest,
          ...userDetails
          // username: userDetails.username,
          // usernameUpdate: userDetails.usernameUpdate,
          // avatar: userDetails.avatar,
          // language: userDetails.language,
          // bio: userDetails.bio,
          // url: userDetails.url,
          // verify: userDetails.verify
        });
      } else {
        setUser(userRequest);
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(false);
    } catch (error) {
      throw error;
    }
  };

  const signup = async (
    email: string,
    name: string,
    username: string,
    password: string
  ) => {
    try {
      const { $id } = await account.create('unique()', email, password, name);
      await account.createEmailSession(email, password);
      await databases.createDocument(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USER),
        $id,
        {
          userId: $id,
          username: username,
          full_name: name,
        }
      );
      await account.createVerification(
        process.env.NEXT_PUBLIC_URL + '/verifyEmail'
      );
      const userRequest = await account.get();
      const userDetails = await databases.getDocument(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USER),
        userRequest.$id
      );
      setUser({
        ...userRequest,
        ...userDetails
        // username: userDetails.username,
        // usernameUpdate: userDetails.usernameUpdate,
        // avatar: userDetails.avatar,
        // language: userDetails.language,
        // bio: userDetails.bio,
        // url: userDetails.url,
        // verify: userDetails.verify
      });
    } catch (error) {
      throw error;
    }
  };

  const userRefresh = async () => {
    chekcUser();
    return;
  };

  return (
    <UserContext.Provider
      value={{ user, userLoading, login, logout, signup, userRefresh }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
