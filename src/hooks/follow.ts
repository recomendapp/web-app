import { databases } from '@/db/appwrite';
import { Query } from 'appwrite';

export async function handleIsUserFollowed(userId: string, followeeId: string) {
  try {
    const response = await (
      await databases.listDocuments(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_FOLLOWER),
        [Query.equal('followeeId', followeeId), Query.equal('userId', userId)]
      )
    ).documents[0];
    return {
      id: response.$id,
      status: true,
    };
  } catch (error) {
    return {
      id: '',
      status: false,
    };
  }
}

export async function useFollowUser(
  userId: string,
  followeeId: string,
  actualFollowState: { id: string; status: boolean }
) {
  if (userId === followeeId) return;
  if (actualFollowState.id && actualFollowState.status) {
    await unfollowUser(actualFollowState.id);
    return 'unfollow';
  }
  // follow
  else {
    await followUser(userId, followeeId);
    return 'follow';
  }
}

export async function followUser(userId: string, followeeId: string) {
  try {
    const { status } = await handleIsUserFollowed(userId, followeeId);
    if (status) return;
    const { $id } = await databases.createDocument(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_FOLLOWER),
      'unique()',
      {
        followeeId: followeeId,
        userId: userId,
      }
    );
    return $id;
  } catch (error) {
    throw error;
  }
}

export async function unfollowUser(id: string) {
  console.log('id', id);
  try {
    await databases.deleteDocument(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_FOLLOWER),
      id
    );
  } catch (error) {
    console.error('error:', error);
    throw error;
  }
}
