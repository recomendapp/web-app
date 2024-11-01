import { useSupabaseClient } from '@/context/supabase-context';
import { Movie, Playlist, PlaylistType, User } from '@/types/type.db';
import { matchQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userKeys } from './userKeys';
import { playlistKeys } from '../playlist/playlistKeys';
