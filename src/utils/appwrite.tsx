import { Client, Account, Databases, Functions, Storage, Query } from 'appwrite';

const client = new Client();

if (!process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID) {
    throw new Error('Must include Appwrite project id');
}

client
    .setEndpoint(String(process.env.NEXT_PUBLIC_APPWRITE_END_POINT))
    .setProject(String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID))
;

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
            [
                Query.equal('username', username)
            ]
        );
        if(response.total) {
            return true
        }else {
            return false
        }
    } catch (error) {
        throw error
    }
}

