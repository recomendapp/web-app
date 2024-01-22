import { toast } from 'react-hot-toast';

const copyToClipboard = (url: string) => {
  navigator.clipboard.writeText(url);
  toast.success(`Lien copié dans le presse-papiers`);
  return url;
};

export default copyToClipboard;
