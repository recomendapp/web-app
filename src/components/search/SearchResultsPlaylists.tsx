"use client"
import { account, databases } from "@/utils/appwrite"

export const searchPlaylistsByName = async ({ query: name } : { query: string | undefined }) => {
    try {
      const { documents: playlistDocuments } = await databases.listDocuments('playlist', ['*'], [`name=${name}`]);
      const playlistIds = playlistDocuments.map((doc) => doc.$id);
  
      const { documents: likesDocuments } = await databases.listDocuments('playlist_liked', ['*'], [`playlistId IN ${JSON.stringify(playlistIds)}`]);
  
      const likesCountMap = likesDocuments.reduce((map, doc) => {
        const playlistId = doc.playlistId;
        const count = doc.count;
        map[playlistId] = (map[playlistId] || 0) + count;
        return map;
      }, {});
  
      const playlists = playlistDocuments.map((doc) => ({
        playlistId: doc.$id,
        name: doc.name,
        likeCount: likesCountMap[doc.$id] || 0,
      }));
  
      playlists.sort((a, b) => b.likeCount - a.likeCount); // Sort playlists by like count in descending order
  
      return playlists;
    } catch (error) {
      console.log('Error searching playlists by name:', error);
      return [];
    }
  };