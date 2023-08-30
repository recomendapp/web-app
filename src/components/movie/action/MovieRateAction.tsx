import { AlertCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useState } from 'react';
import { Icons } from '../../icons';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface MovieRateActionProps extends React.HTMLAttributes<HTMLDivElement> {
  userId: string;
  movieId: number;
  isRated: number | null;
  handleRate: (rating: number) => Promise<void>;
  handleUnrate: () => Promise<void>;
}

export function MovieRateAction({
  userId,
  movieId,
  isRated,
  handleRate,
  handleUnrate,
}: MovieRateActionProps) {
  const router = useRouter();

  const [ratingValue, setRatingValue] = useState<number>(5);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {userId ? (
              <DialogTrigger asChild>
                <Button
                  // onClick={() => userId ? handleRateClick() : router.push('/login')}
                  onClick={() => {
                    !userId && router.push('/login');
                  }}
                  disabled={(isLoading || isError) && true}
                  size="icon"
                  variant={isRated ? 'accent-1' : 'accent-1-enabled'}
                  className="rounded-full"
                >
                  {isLoading ? (
                    <Icons.spinner className="animate-spin" />
                  ) : isError ? (
                    <AlertCircle />
                  ) : isRated ? (
                    <div>{isRated}</div>
                  ) : (
                    <Star
                      className={
                        isRated ? 'fill-accent-1-foreground' : 'transparent'
                      }
                    />
                  )}
                </Button>
              </DialogTrigger>
            ) : (
              <Button
                // onClick={() => userId ? handleRateClick() : router.push('/login')}
                onClick={() => {
                  !userId && router.push('/login');
                }}
                disabled={(isLoading || isError) && true}
                size="icon"
                variant={isRated ? 'accent-1' : 'accent-1-enabled'}
                className="rounded-full"
              >
                {isLoading ? (
                  <Icons.spinner className="animate-spin" />
                ) : isError ? (
                  <AlertCircle />
                ) : isRated ? (
                  <div>{isRated}</div>
                ) : (
                  <Star
                    className={
                      isRated ? 'fill-accent-1-foreground' : 'transparent'
                    }
                  />
                )}
              </Button>
            )}
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {isRated ? <p>Modifier la note</p> : <p>Ajouter une note</p>}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Note</DialogTitle>
          {/* <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription> */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex">
            {/* <Label htmlFor="name" className="text-right sr-only">No
                        </Label> */}
            <Input
              defaultValue={ratingValue}
              min={0}
              max={10}
              step={0.5}
              type="number"
              id="name"
              className="w-full"
              onChange={(e) => setRatingValue(Number(e.currentTarget.value))}
              // required
            />
          </div>
        </div>
        <DialogFooter>
          {isRated && (
            <DialogClose asChild>
              <Button variant="destructive" onClick={handleUnrate}>
                Supprimer la note
              </Button>
            </DialogClose>
          )}
          <DialogClose asChild>
            <Button onClick={() => handleRate(ratingValue)}>Enregistrer</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
