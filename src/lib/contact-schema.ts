import { z } from "zod";

/** Shared between the client form and the /api/contact route handler. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Veuillez indiquer votre nom.").max(120, "Nom trop long."),
  company: z.string().trim().min(2, "Veuillez indiquer votre société.").max(160, "Nom de société trop long."),
  email: z.string().trim().min(1, "Veuillez indiquer votre e-mail professionnel.").email("Adresse e-mail invalide.").max(200),
  phone: z
    .string()
    .trim()
    .max(30, "Numéro trop long.")
    .refine((v) => v === "" || /^[+()\d\s./-]{6,}$/.test(v), "Numéro de téléphone invalide."),
  subject: z.string().trim().min(3, "Veuillez préciser l'objet de votre demande.").max(200, "Objet trop long."),
  message: z.string().trim().min(10, "Votre message doit contenir au moins 10 caractères.").max(5000, "Message trop long (5 000 caractères maximum)."),
  consent: z.boolean().refine((v) => v === true, "Votre accord est nécessaire pour traiter votre demande."),
  /** Honeypot — must stay empty. */
  website: z.string().max(0).optional(),
});

export type ContactValues = z.infer<typeof contactSchema>;
