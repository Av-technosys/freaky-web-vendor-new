import { z } from "zod";

export const companySchema = z.object({
  businessName: z
    .string()
    .trim()
    .min(1, "Business name required")
    .min(3, "Business name must be at least 3 characters"),

  websiteURL: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => !val || val.startsWith("https://"),
      "Website must start with https://",
    ),

  DBAname: z
    .string()
    .trim()
    .min(1, "DBA name required")
    .min(3, "DBA name must be at least 3 characters"),

  legalEntityName: z
    .string()
    .trim()
    .min(1, "Legal entity name required")
    .min(3, "Legal entity name must be at least 3 characters"),

  einNumber: z
    .string()
    .trim()
    .min(1, "EIN number required")
    .length(9, "EIN must be exactly 9 digits")
    .regex(/^\d+$/, "EIN must contain only numbers"),

  businessType: z.string().min(2, "Select business type"),

  incorporationDate: z.date().refine((date) => date !== undefined, {
    message: "Select incorporation date",
  }),
});

export const contactSchema = z.object({
  primaryContactName: z
    .string()
    .trim()
    .min(1, "Contact name required")
    .min(3, "Contact name must be at least 3 characters"),

  primaryEmail: z
    .string()
    .trim()
    .min(1, "Primary email required")
    .email("Enter a valid email address"),

  primaryPhoneNumber: z
    .string()
    .trim()
    .min(1, "Primary phone number required")
    .regex(/^\d{10}$/, "Phone number must be 10 digits"),

  instagramURL: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => !val || val.startsWith("https://"),
      "Instagram link must start with https://",
    ),

  linkedinURL: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => !val || val.startsWith("https://"),
      "Linkedin link must start with https://",
    ),

  youtubeURL: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => !val || val.startsWith("https://"),
      "YouTube link must start with https://",
    ),

  facebookURL: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => !val || val.startsWith("https://"),
      "Facebook link must start with https://",
    ),
});

export const addressSchema = z.object({
  streetAddressLine1: z
    .string()
    .trim()
    .min(1, "Street address line 1 required")
    .min(5, "Street address must be at least 5 characters"),

  streetAddressLine2: z.string().trim().optional(),

  country: z.string(),

  state: z.string().min(1, "State required"),

  city: z
    .string()
    .trim()
    .min(1, "City required")
    .min(2, "City must be at least 2 characters"),

  zipcode: z
    .string()
    .trim()
    .min(1, "Zip code required")
    .regex(/^\d{6}$/, "Zip code must be 6 digits"),
});

const ownerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name required")
    .min(2, "First name must be at least 2 characters"),

  lastName: z
    .string()
    .trim()
    .min(1, "Last name required")
    .min(2, "Last name must be at least 2 characters"),

  ssnNumber: z
    .string()
    .trim()
    .min(1, "SSN required")
    .length(9, "SSN must be exactly 9 digits")
    .regex(/^\d+$/, "SSN must contain only numbers"),

  streetAddressLine1: z
    .string()
    .trim()
    .min(1, "Street address line 1 required")
    .min(5, "Street address must be at least 5 characters"),

  streetAddressLine2: z.string().trim().optional(),

  country: z.string(),

  state: z.string().trim().min(1, "State required"),

  city: z
    .string()
    .trim()
    .min(1, "City required")
    .min(2, "City must be at least 2 characters"),

  zipcode: z
    .string()
    .trim()
    .min(1, "Zip code required")
    .regex(/^\d{6}$/, "Zip code must be 6 digits"),

  ownershipPercentage: z.string(),
});

export const ownershipSchema = z.object({
  owners: z
    .array(ownerSchema)
    .min(1, "At least one owner required")
    .max(4, "Maximum 4 owners allowed"),
});

export const bankSchema = z.object({
  bankAccountNumber: z
    .string()
    .trim()
    .min(1, "Account number required")
    .min(6, "Account number must be at least 6 digits")
    .regex(/^\d+$/, "Account number must contain only numbers"),

  bankName: z
    .string()
    .trim()
    .min(1, "Bank name required")
    .min(3, "Bank name must be at least 3 characters"),

  payeeName: z
    .string()
    .trim()
    .min(1, "Payee name required")
    .min(3, "Payee name must be at least 3 characters"),

  routingNumber: z
    .string()
    .trim()
    .min(1, "Routing number required")
    .length(9, "Routing number must be exactly 9 digits")
    .regex(/^\d+$/, "Routing number must contain only numbers"),

  bankType: z.string().min(2, "Select bank type"),
});

export type CompanySchema = z.infer<typeof companySchema>;
export type contactSchema = z.infer<typeof contactSchema>;
export type addressSchema = z.infer<typeof addressSchema>;
export type ownershipSchema = z.infer<typeof ownershipSchema>;
export type bankSchema = z.infer<typeof bankSchema>;
