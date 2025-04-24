import { z } from 'zod';

export const transactionSchema = z.object({
  id: z.string(),
  accountExternalIdDebit: z.string(),
  accountExternalIdCredit: z.string(),
  statusId: z.number(),
  value: z.number(),
  typeId: z.number(),
  createdAt: z.string(),
});
