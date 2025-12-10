import { z } from 'zod';

// ===========================================
// Zod Validation Schemas
// ===========================================

// ---------- Common Validations ----------

export const emailSchema = z
  .string()
  .min(1, 'L\'email est requis')
  .email('Email invalide');

export const phoneSchema = z
  .string()
  .min(1, 'Le téléphone est requis')
  .regex(
    /^(?:(?:\+|00)33|0)[1-9](?:[0-9]{8})$/,
    'Numéro de téléphone invalide (format français attendu)'
  )
  .transform((val) => val.replace(/[\s.-]/g, ''));

export const zipSchema = z
  .string()
  .min(1, 'Le code postal est requis')
  .regex(/^[0-9]{5}$/, 'Code postal invalide (5 chiffres)');

export const siretSchema = z
  .string()
  .min(1, 'Le SIRET est requis')
  .transform((val) => val.replace(/\s/g, ''))
  .refine((val) => /^[0-9]{14}$/.test(val), 'SIRET invalide (14 chiffres)');

// ---------- Contact Form ----------

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Le nom est trop long'),
  email: emailSchema,
  phone: z.string().optional(),
  subject: z
    .string()
    .min(1, 'Le sujet est requis')
    .max(200, 'Le sujet est trop long'),
  message: z
    .string()
    .min(10, 'Le message doit contenir au moins 10 caractères')
    .max(5000, 'Le message est trop long'),
  consentRgpd: z
    .boolean()
    .refine((val) => val === true, 'Vous devez accepter la politique de confidentialité'),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

// ---------- Diagnostic/Request Form ----------

export const diagnosticFormSchema = z.object({
  zip: zipSchema,
  city: z
    .string()
    .min(1, 'La ville est requise')
    .max(100, 'Nom de ville trop long'),
  problemType: z
    .string()
    .min(1, 'Veuillez sélectionner un type de problème'),
  description: z
    .string()
    .min(10, 'Décrivez votre problème (minimum 10 caractères)')
    .max(2000, 'Description trop longue'),
  contactName: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Le nom est trop long'),
  contactPhone: phoneSchema,
  contactEmail: emailSchema.optional().or(z.literal('')),
  urgency: z.enum(['normal', 'urgent', 'very_urgent']).default('normal'),
});

export type DiagnosticFormValues = z.infer<typeof diagnosticFormSchema>;

// ---------- Artisan Application Form ----------

export const artisanApplicationSchema = z.object({
  companyName: z
    .string()
    .min(2, 'Le nom de société doit contenir au moins 2 caractères')
    .max(200, 'Nom de société trop long'),
  siret: siretSchema,
  contactName: z
    .string()
    .min(2, 'Le nom du contact doit contenir au moins 2 caractères')
    .max(100, 'Nom trop long'),
  email: emailSchema,
  phone: phoneSchema,
  zones: z
    .string()
    .min(2, 'Indiquez vos zones d\'intervention')
    .max(500, 'Texte trop long'),
  message: z.string().max(2000, 'Message trop long').optional(),
});

export type ArtisanApplicationValues = z.infer<typeof artisanApplicationSchema>;

// ---------- Login Form ----------

export const loginFormSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

// ---------- Register Form ----------

export const registerFormSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Le nom doit contenir au moins 2 caractères')
      .max(100, 'Nom trop long'),
    email: emailSchema,
    password: z
      .string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });

export type RegisterFormValues = z.infer<typeof registerFormSchema>;

// ---------- Pricebook Item ----------

export const pricebookItemSchema = z.object({
  code: z
    .string()
    .min(1, 'Le code est requis')
    .max(50, 'Code trop long')
    .regex(/^[A-Z0-9_-]+$/, 'Code invalide (majuscules, chiffres, _ et - uniquement)'),
  label: z
    .string()
    .min(2, 'Le libellé doit contenir au moins 2 caractères')
    .max(200, 'Libellé trop long'),
  description: z.string().max(1000, 'Description trop longue').optional(),
  category: z.string().min(1, 'La catégorie est requise'),
  basePrice: z
    .number()
    .min(0, 'Le prix doit être positif')
    .max(1000000, 'Prix trop élevé'),
  nightSurcharge: z
    .number()
    .min(0, 'La majoration doit être positive')
    .max(200, 'Majoration trop élevée')
    .default(50),
  weekendSurcharge: z
    .number()
    .min(0, 'La majoration doit être positive')
    .max(200, 'Majoration trop élevée')
    .default(30),
  urgentSurcharge: z
    .number()
    .min(0, 'La majoration doit être positive')
    .max(200, 'Majoration trop élevée')
    .default(25),
  isActive: z.boolean().default(true),
});

export type PricebookItemValues = z.infer<typeof pricebookItemSchema>;

// ---------- API Validators ----------

/**
 * Validate request body with a Zod schema
 */
export async function validateRequestBody<T>(
  request: Request,
  schema: z.ZodSchema<T>
): Promise<{ success: true; data: T } | { success: false; error: string }> {
  try {
    const body = await request.json();
    const result = schema.safeParse(body);
    
    if (!result.success) {
      const firstError = result.error.errors[0];
      return {
        success: false,
        error: firstError?.message ?? 'Données invalides',
      };
    }
    
    return { success: true, data: result.data };
  } catch {
    return { success: false, error: 'Corps de requête invalide' };
  }
}

