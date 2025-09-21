import { z } from "zod";

export const createLinkSchema = z.object({
  originalUrl: z.string().url("URL inválida"),
  shortCode: z
    .string()
    .min(1, "Código deve ter pelo menos 1 caractere")
    .max(50, "Código deve ter no máximo 50 caracteres")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Código deve conter apenas letras, números, underscore e hífen"
    )
    .optional()
    .or(z.literal("")),
});

export const createLinkSchemaTransformed = createLinkSchema.transform(
  (data) => ({
    ...data,
    shortCode: data.shortCode === "" ? undefined : data.shortCode,
  })
);

export type CreateLinkFormData = z.infer<typeof createLinkSchema>;
