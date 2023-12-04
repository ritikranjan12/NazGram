import {Avatars,Client,Databases,Account,Storage} from "appwrite"

export const appwriteconfig = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    url: import.meta.env.VITE_APPWRITE_URL,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    storageId: import.meta.env.VITE_APPWITE_BUCKET_ID,
    userCollectionId: import.meta.env.VITE_APPWRITE_Users_ID,
    postCollectionId: import.meta.env.VITE_APPWRITE_Posts_ID,
    savesCollectioId: import.meta.env.VITE_APPWRITE_SAVES_ID,
}

export const client = new Client()

client.setProject(appwriteconfig.projectId)
client.setEndpoint(appwriteconfig.url)

export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
export const avatars = new Avatars(client)
