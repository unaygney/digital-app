import { z } from "zod";

const PLANS = ["starter", "basic", "pro"] as const;

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(64, "Password must be at most 64 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character",
    ),
  terms: z.boolean().refine((value) => value === true, {
    message: "You must agree to the terms and conditions",
  }),
});
export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export const accountSettingsSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email(),
  userName: z.string().min(2, "Username must be at least 2 characters long"),
});
export const passwordSettingsSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(64, "Password must be at most 64 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: z.string(),
  })
  .superRefine((data, context) => {
    if (data.newPassword !== data.confirmPassword) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords must match",
      });
    }
    if (data.currentPassword === data.newPassword) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["newPassword"],
        message: "New password must be different from the current password",
      });
    }
  });

export const notificationsSettingsSchema = z.object({
  comments: z.object({
    email: z.boolean(),
    push: z.boolean(),
    sms: z.boolean(),
  }),
  features: z.object({
    email: z.boolean(),
    push: z.boolean(),
    sms: z.boolean(),
  }),
  friend_requests: z.object({
    email: z.boolean(),
    push: z.boolean(),
    sms: z.boolean(),
  }),
  friend_updates: z.object({
    email: z.boolean(),
    push: z.boolean(),
    sms: z.boolean(),
  }),
  marketing: z.object({
    email: z.boolean(),
    push: z.boolean(),
    sms: z.boolean(),
  }),
});

export const billingInformationSchema = z.object({
  cardNumber: z
    .string()
    .length(16, "Card number must be 16 digits long")
    .regex(/^\d{16}$/, "Card number must contain only numbers"),
  cardHolder: z.string().min(1, "Card holder name is required"),
  expiration: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "Expiry date must be in the format MM/YY",
    ),
  cvv: z
    .string()
    .length(3, "CVC must be 3 digits long")
    .regex(/^\d{3}$/, "CVC must contain only numbers"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  address2: z.string().optional(), // Optional field
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z
    .string()
    .min(5, "ZIP code must be at least 5 digits long")
    .max(10, "ZIP code must be at most 10 digits long")
    .regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code format"),
  country: z.string().min(1, "Country is required"),
});

export const planSchema = z.object({
  plan: z.enum(PLANS),
});

// types of schemes
export type NotificationsSettingsFormData = z.infer<
  typeof notificationsSettingsSchema
>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
export type AccountSettingsFormData = z.infer<typeof accountSettingsSchema>;
export type PasswordSettingsFormData = z.infer<typeof passwordSettingsSchema>;
export type BillingInformationFormData = z.infer<
  typeof billingInformationSchema
>;
export type PlanFormData = z.infer<typeof planSchema>;
