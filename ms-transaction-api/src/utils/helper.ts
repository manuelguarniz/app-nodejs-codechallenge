import { format } from 'date-fns';

export const parseDate = (date: Date | null): string => {
  return format(date || new Date(), 'yyyy-MM-dd HH:mm:ss');
};
