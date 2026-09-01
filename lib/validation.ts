import { z } from 'zod';

export const guestbookMessageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Nama minimal 2 karakter.' })
    .max(60, { message: 'Nama maksimal 60 karakter.' })
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(3, { message: 'Message must be at least 3 characters.' })
    .max(500, { message: 'Message cannot exceed 500 characters.' }),
});

export type GuestbookMessageInput = z.infer<typeof guestbookMessageSchema>;
