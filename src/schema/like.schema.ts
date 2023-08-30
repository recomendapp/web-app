// export type MovieLike = {
//     id: string;
//     status: boolean;
// };

import { z } from 'zod';

export const LikeMovieSchema = z.object({
  id: z.string(),
  status: z.boolean(),
});
