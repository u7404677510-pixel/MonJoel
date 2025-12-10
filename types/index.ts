// ===========================================
// Mon Joël - Types Globaux
// ===========================================

// ---------- User & Auth Types ----------

export type UserRole = 'CLIENT' | 'ARTISAN' | 'TECH' | 'ADMIN';

export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  role: UserRole;
  isActive: boolean;
}

export interface SessionUser extends UserProfile {
  emailVerified: Date | null;
}

// ---------- Request & Channel Types ----------

export type RequestChannel = 'WEB' | 'ADS' | 'SEO' | 'DIRECT' | 'PARTNER';

export type RequestStatus =
  | 'NEW'
  | 'ANALYZING'
  | 'QUOTED'
  | 'ACCEPTED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export interface SourceUtm {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

export interface RequestInput {
  description: string;
  zip: string;
  city: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  channel: RequestChannel;
  sourceUtm?: SourceUtm;
}

// ---------- Quote & Job Types ----------

export type QuoteStatus = 'DRAFT' | 'SENT' | 'SIGNED' | 'PAID' | 'CANCELLED' | 'REFUNDED';

export type JobState =
  | 'PENDING'
  | 'ASSIGNED'
  | 'EN_ROUTE'
  | 'ARRIVED'
  | 'WORKING'
  | 'DONE'
  | 'CANCELLED';

export interface QuoteBreakdown {
  items: QuoteLineItem[];
  subtotalHt: number;
  tva: number;
  totalTtc: number;
}

export interface QuoteLineItem {
  code: string;
  label: string;
  quantity: number;
  unitPriceHt: number;
  totalHt: number;
}

// ---------- Pricing Types ----------

export interface PricingEstimate {
  min: number;
  max: number;
  currency: string;
  breakdown?: PricingBreakdownItem[];
}

export interface PricingBreakdownItem {
  label: string;
  amount: number;
}

export interface EtaEstimate {
  min: number;
  max: number;
  unit: 'minutes' | 'hours';
}

// ---------- AI/Ticket Types ----------

export interface TicketAnalysis {
  lockType: string | null;
  brand: string | null;
  confidence: number;
  pricing: PricingEstimate | null;
  eta: EtaEstimate | null;
  riskFlags: string[];
  notes: string | null;
}

// ---------- Service Types ----------

export interface ServiceDefinition {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  basePrice: number;
  estimatedDuration: string;
  popular?: boolean;
}

// ---------- Location/City Types ----------

export interface CityLocation {
  slug: string;
  name: string;
  department: string;
  region: string;
  zip: string[];
  lat: number;
  lng: number;
  population?: number;
}

export interface NearbyCity {
  slug: string;
  name: string;
  distance: number;
}

// ---------- Testimonial Types ----------

export interface TestimonialData {
  id: string;
  name: string;
  city: string | null;
  rating: number;
  comment: string;
  avatarUrl?: string;
}

// ---------- Blog Types ----------

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  category: string | null;
  coverImage: string | null;
  author: string;
  publishedAt: Date | null;
}

export interface BlogPostFull extends BlogPostMeta {
  content: string;
}

// ---------- SEO Types ----------

export interface SeoMeta {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export interface JsonLdData {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
}

// ---------- Form Types ----------

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  consentRgpd: boolean;
}

export interface DiagnosticFormData {
  zip: string;
  city: string;
  problemType: string;
  description: string;
  contactName: string;
  contactPhone: string;
  contactEmail?: string;
  photos?: File[];
  urgency: 'normal' | 'urgent' | 'very_urgent';
}

export interface ArtisanApplicationData {
  companyName: string;
  siret: string;
  contactName: string;
  email: string;
  phone: string;
  zones: string;
  message?: string;
}

// ---------- Admin/Dashboard Types ----------

export interface DashboardStats {
  requestsLast7Days: number;
  requestsChange: number;
  conversionRate: number;
  conversionChange: number;
  averageTicket: number;
  ticketChange: number;
  activeJobs: number;
}

export interface ChannelBreakdown {
  channel: RequestChannel;
  count: number;
  percentage: number;
}

export interface RequestTableItem {
  id: string;
  createdAt: Date;
  status: RequestStatus;
  channel: RequestChannel;
  city: string;
  zip: string;
  contactName: string | null;
  description: string;
  hasQuote: boolean;
}

// ---------- Pricebook Types ----------

export interface PricebookEntry {
  id: string;
  code: string;
  label: string;
  description: string | null;
  category: string;
  basePrice: number;
  nightSurcharge: number;
  weekendSurcharge: number;
  urgentSurcharge: number;
  isActive: boolean;
}

// ---------- Event Types ----------

export type EventType =
  | 'request_created'
  | 'request_analyzed'
  | 'quote_created'
  | 'quote_sent'
  | 'quote_signed'
  | 'quote_paid'
  | 'job_assigned'
  | 'job_started'
  | 'job_completed'
  | 'contact_form_submitted'
  | 'artisan_application_submitted';

export interface EventPayload {
  type: EventType;
  userId?: string;
  data: Record<string, unknown>;
}

// ---------- API Response Types ----------

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ---------- Navigation Types ----------

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  badge?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// ---------- Analytics Types ----------

export interface AnalyticsEvent {
  name: string;
  params?: Record<string, string | number | boolean>;
}

