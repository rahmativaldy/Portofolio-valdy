import { z } from 'zod';

export const guestbookMessageSchema = z.object({
  message: z
    .string()
    .trim()
    .min(3, { message: 'Message must be at least 3 characters.' })
    .max(500, { message: 'Message cannot exceed 500 characters.' }),
});

export type GuestbookMessageInput = z.infer<typeof guestbookMessageSchema>;
