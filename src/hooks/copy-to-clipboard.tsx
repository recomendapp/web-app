import { toast } from 'react-hot-toast';

const copyToClipboard = (url: string) => {
  navigator.clipboard.writeText(url);
  toast.success(`Copié`);
  return url;
};

export default copyToClipboard;
