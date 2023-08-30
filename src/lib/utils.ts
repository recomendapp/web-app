import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitiales = (user: any) => {
  const words = user.username.normalize('NFKC').toUpperCase().split(' ');
  let initials = '';
  if (words.length === 1) {
    initials = words[0].charAt(0);
  } else if (words.length >= 2) {
    for (let i = 0; i < 2; i++) {
      initials += words[i].charAt(0);
    }
  }
  return initials;
};
