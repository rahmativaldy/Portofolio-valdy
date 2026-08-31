/**
 * Escapes common HTML special characters to prevent Cross-Site Scripting (XSS)
 * when rendered in HTML or text contexts.
 */
export function sanitizeMessage(input: string): string {
  if (!input || typeof input !== 'string') return '';
  return input
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Decodes HTML entities back to plain text if needed for safe display in React text nodes
 * (React automatically escapes text content when rendered inside JSX).
 */
export function cleanText(input: string): string {
  if (!input || typeof input !== 'string') return '';
  return input.trim();
}
