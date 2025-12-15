import { useT } from '@/lib/i18n/client';
import { upperFirst } from 'lodash';
import toast from 'react-hot-toast';

export const useCopyToClipboard = () => {
  const { t } = useT();

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(upperFirst(t('common.messages.copied', {gender: 'male', count: 1})));
    return text;
  };

  return copy;
}