import { z } from 'zod';

// Common validation schemas
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters');

// Auth schemas
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export const signupSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

// Space schemas
export const createSpaceSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .max(30, 'Slug must be less than 30 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens')
    .optional(),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
});

// Project schemas
export const createProjectSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  key: z
    .string()
    .min(2, 'Key must be at least 2 characters')
    .max(10, 'Key must be less than 10 characters')
    .regex(/^[A-Z0-9]+$/, 'Key can only contain uppercase letters and numbers'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  boardType: z.enum(['kanban', 'scrum']).optional(),
});

// Issue schemas
export const createIssueSchema = z.object({
  projectId: z.string().min(1, 'Project is required'),
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters'),
  type: z.enum(['epic', 'story', 'bug', 'task', 'subtask', 'feature']),
  description: z.string().optional(),
  priority: z.enum(['highest', 'high', 'medium', 'low', 'lowest']).optional(),
  assigneeId: z.string().optional(),
  epicId: z.string().optional(),
  labelIds: z.array(z.string()).optional(),
  dueDate: z.string().optional(),
  storyPoints: z.number().optional(),
});

export const updateIssueSchema = createIssueSchema.partial();

// Comment schemas
export const createCommentSchema = z.object({
  content: z
    .string()
    .min(1, 'Comment cannot be empty')
    .max(10000, 'Comment is too long'),
});

// Member schemas
export const inviteMemberSchema = z.object({
  email: emailSchema,
  message: z.string().max(500, 'Message must be less than 500 characters').optional(),
});

// Label schemas
export const createLabelSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(30, 'Name must be less than 30 characters'),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Please enter a valid hex color'),
  description: z.string().max(200, 'Description must be less than 200 characters').optional(),
});

// Profile schemas
export const updateProfileSchema = z.object({
  name: nameSchema,
});

// Infer types from schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
export type CreateSpaceFormData = z.infer<typeof createSpaceSchema>;
export type CreateProjectFormData = z.infer<typeof createProjectSchema>;
export type CreateIssueFormData = z.infer<typeof createIssueSchema>;
export type UpdateIssueFormData = z.infer<typeof updateIssueSchema>;
export type CreateCommentFormData = z.infer<typeof createCommentSchema>;
export type InviteMemberFormData = z.infer<typeof inviteMemberSchema>;
export type CreateLabelFormData = z.infer<typeof createLabelSchema>;
export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
