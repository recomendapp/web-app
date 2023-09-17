'use client';

import { ImageWithFallback } from '@/components/elements/Tools/ImageWithFallback';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Loader2 } from 'lucide-react';
import { Dispatch } from 'react';

export default function PlaylistPictureUpload({
  playlist,
  isUploading,
  newPicture,
  setNewPicture,
}: {
  playlist: any;
  isUploading: boolean;
  newPicture: File | undefined;
  setNewPicture: Dispatch<any>;
}) {
  return (
    <label className="flex w-full h-full items-center overflow-hidden relative cursor-pointer">
      <div className="w-full shadow-2xl">
        <AspectRatio ratio={1 / 1}>
          {isUploading && (
            <div className="absolute z-[1] w-full h-full flex items-center justify-center bg-black/80">
              <div className=" object-cover">
                <Loader2 className="animate-spin" />
              </div>
            </div>
          )}
          <ImageWithFallback
            src={
              newPicture
                ? URL.createObjectURL(newPicture)
                : playlist
                ? playlist.poster_path
                  ? playlist.poster_path
                  : ''
                : ''
            }
            alt={playlist ? playlist.title : ''}
            fill
            className="rounded-md object-cover"
          />
        </AspectRatio>
      </div>
      <input
        disabled={isUploading}
        type="file"
        accept=".jpg,.png,.jpeg,.webp"
        max="2097152"
        onChange={(e) => {
          e.target.files && setNewPicture(e.target.files[0]);
        }}
        className="hidden"
      />
    </label>
  );
}
