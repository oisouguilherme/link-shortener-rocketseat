import { z } from "zod";

// Schema para validar URL
export const urlSchema = z.string().url("URL inválida");

// Schema para criar um link
export const createLinkSchema = z.object({
  originalUrl: urlSchema,
  shortCode: z
    .string()
    .min(1, "Código deve ter pelo menos 1 caractere")
    .max(50, "Código deve ter no máximo 50 caracteres")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Código deve conter apenas letras, números, underscore e hífen"
    )
    .optional(),
});

// Schema para parâmetros de rota
export const shortCodeParamSchema = z.object({
  shortCode: z.string().min(1, "Short code é obrigatório"),
});

// Schema para query parameters
export const listLinksQuerySchema = z.object({
  page: z
    .string()
    .transform(Number)
    .pipe(z.number().min(1))
    .optional()
    .default("1"),
  limit: z
    .string()
    .transform(Number)
    .pipe(z.number().min(1).max(100))
    .optional()
    .default("10"),
});

// Tipos TypeScript derivados dos schemas
export type CreateLinkBody = z.infer<typeof createLinkSchema>;
export type ShortCodeParam = z.infer<typeof shortCodeParamSchema>;
export type ListLinksQuery = z.infer<typeof listLinksQuerySchema>;
