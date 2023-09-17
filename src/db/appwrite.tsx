import {
  Client,
  Account,
  Databases,
  Functions,
  Storage,
  Query,
  Graphql,
} from 'appwrite';

export const client = new Client();

if (!process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID) {
  throw new Error('Must include Appwrite project id');
}

client
  .setEndpoint(String(process.env.NEXT_PUBLIC_APPWRITE_END_POINT))
  .setProject(String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID));



// GraphQL
export const graphql = new Graphql(client);

// Account
export const account = new Account(client);

// Functions
export const functions = new Functions(client);

// Database
export const databases = new Databases(client);

// Storage
export const storage = new Storage(client);

/*==========================================================================================*/

// ███████  ██████  ███    ██  ██████ ████████ ██  ██████  ███    ██ //
// ██      ██    ██ ████   ██ ██         ██    ██ ██    ██ ████   ██ //
// █████   ██    ██ ██ ██  ██ ██         ██    ██ ██    ██ ██ ██  ██ //
// ██      ██    ██ ██  ██ ██ ██         ██    ██ ██    ██ ██  ██ ██ //
// ██       ██████  ██   ████  ██████    ██    ██  ██████  ██   ████ //

/*==========================================================================================*/

export async function checkUsernameExist(username: string | string[]) {
  try {
    const response = await databases.listDocuments(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USER),
      [Query.equal('username', username)]
    );
    if (response.total) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

export async function getUserDetails(username: string) {
  try {
    const userResponse = await databases.listDocuments(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USER),
      [Query.equal('username', username)]
    );
    if (userResponse.total === 0) {
      return null;
    }
    // const user = {
    //   id: userResponse.documents[0].userId,
    //   // name: userResponse.name,
    //   username: userResponse.documents[0].username,
    //   verify: userResponse.documents[0].verify,
    //   avatar: userResponse.documents[0].avatar,
    //   followers_count: userResponse.documents[0].followers_count,
    //   following_count: userResponse.documents[0].following_count,
    // };
    // return user;
    return (userResponse.documents[0]);
  } catch (error) {
    throw error;
  }
}
