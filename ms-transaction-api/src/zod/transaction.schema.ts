import { z } from 'zod';

export const transactionSchema = z.object({
  accountExternalIdDebit: z
    .string({ message: 'Account debit is required' })
    .uuid({ message: 'Account debit is invalid' }),
  accountExternalIdCredit: z
    .string({ message: 'Account credit is required' })
    .uuid({ message: 'Account credit is invalid' }),
  tranferTypeId: z
    .number({ message: 'Transfer type is required' })
    .min(1, { message: 'Minimum amount is 1' })
    .positive({ message: 'Transfer type is invalid' }),
  value: z
    .number({ message: 'Value transfer is required' })
    .min(1, { message: 'Minimum value transfer is 1' })
    .positive({ message: 'Value transfer is invalid' }),
});
