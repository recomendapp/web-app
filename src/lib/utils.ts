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

export function convertDuration(duration: number) {
  const hours = Math.floor(duration / 60);
  const remainingMinutes = duration % 60;

  return `${hours}h${remainingMinutes}`;
}

export function convertDate(date: string) {
  const parts = date.split('-');
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];

  return `${day}/${month}/${year}`;
}
