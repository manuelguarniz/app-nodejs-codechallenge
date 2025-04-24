import { parse, parseISO } from 'date-fns';

export const parseISODate = (date: string): Date => {
  date = date.substring(0, 19);
  return parse(date, "yyyy-MM-dd'T'HH:mm:ss", new Date());
};
