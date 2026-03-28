export const QUERY_KEYS = {
  AUTH: {
    SESSION: ['auth', 'session'] as const,
    ME: ['auth', 'me'] as const,
  },
  ADMIN: {
    ROLES: {
      LIST: (filters?: object) => ['admin', 'roles', filters] as const,
      ROLE: (id: string) => ['admin', 'roles', id] as const,
      MY_PERMISSIONS: ['admin', 'roles', 'me', 'permissions'] as const,
    },
    SCHEDULING: {
      EVENTS: (filters?: object) => ['admin', 'events', filters] as const,
      EVENT: (id: string) => ['admin', 'events', id] as const,
      CALENDAR: (params?: object) => ['admin', 'calendar', params] as const,
      SLOTS: (filters?: object) => ['admin', 'scheduling', 'slots', filters] as const,
      SLOT: (id: string) => ['admin', 'scheduling', 'slots', id] as const,
      ROSTER: (slotId: string) => ['admin', 'scheduling', 'slots', slotId, 'roster'] as const,
      WAITLIST: (slotId: string) => ['admin', 'scheduling', 'slots', slotId, 'waitlist'] as const,
      BOOKINGS: (filters?: object) => ['admin', 'scheduling', 'bookings', filters] as const,
      SERVICES: (filters?: object) => ['admin', 'scheduling', 'services', filters] as const,
      CATEGORIES: ['admin', 'scheduling', 'service-categories'] as const,
      LOCATIONS: ['admin', 'locations'] as const,
      ADD_ONS: (filters?: object) => ['admin', 'add-ons', filters] as const,
      STAFF_AVAILABILITY: (staffId: string, startAt: string, endAt: string) =>
        ['admin', 'scheduling', 'staff-availability', staffId, startAt, endAt] as const,
    },
    CLIENTS: {
      FAMILIES: (filters?: object) => ['admin', 'families', filters] as const,
      FAMILY: (id: string) => ['admin', 'families', id] as const,
      TAGS: ['admin', 'tags'] as const,
      WAIVERS: ['admin', 'waivers'] as const,
      MEMBERSHIPS: ['admin', 'memberships'] as const,
      CLASS_PACKS: ['admin', 'class-packs'] as const,
    },
    REPORTS: {
      DASHBOARD: (params?: object) => ['admin', 'reports', 'dashboard', params] as const,
      REVENUE: (params?: object) => ['admin', 'reports', 'revenue', params] as const,
      CLIENTS: (params?: object) => ['admin', 'reports', 'clients', params] as const,
      INVOICES: (filters?: object) => ['admin', 'invoices', filters] as const,
    },
    LEADS: {
      LIST: (filters?: object) => ['admin', 'leads', filters] as const,
      LEAD: (id: string) => ['admin', 'leads', id] as const,
      SMART_LISTS: ['admin', 'smart-lists'] as const,
      TEMPLATES: ['admin', 'templates'] as const,
    },
    STAFF: {
      LIST: (filters?: object) => ['admin', 'staff', filters] as const,
      MEMBER: (id: string) => ['admin', 'staff', id] as const,
      PAYROLL: (periodId: string) => ['admin', 'payroll', periodId] as const,
      TIME_CLOCK: (staffId: string, period?: string) => ['admin', 'time-clock', staffId, period] as const,
    },
    INVENTORY: {
      PRODUCTS: (filters?: object) => ['admin', 'products', filters] as const,
      PRODUCT: (id: string) => ['admin', 'products', id] as const,
      ORDERS: (filters?: object) => ['admin', 'orders', filters] as const,
      COUPONS: ['admin', 'coupons'] as const,
    },
  },
  USER: {
    BOOKING: (id: string) => ['user', 'bookings', id] as const,
    BOOKINGS: (filters?: object) => ['user', 'bookings', filters] as const,
    ACCOUNT: ['user', 'account'] as const,
    EVENTS_PARTY_PAGE: ['user', 'events', 'party-page'] as const,
    SCHEDULING: {
      PUBLIC_SLOTS: (filters?: object) => ['public', 'slots', filters] as const,
      PUBLIC_SLOT: (id: string) => ['public', 'slots', id] as const,
      PUBLIC_SERVICES: (filters?: object) => ['public', 'services', filters] as const,
      PUBLIC_SERVICE_CATEGORIES: ['public', 'service-categories'] as const,
      PUBLIC_LOCATIONS: ['public', 'locations'] as const,
      OPEN_AVAILABILITY: (serviceId: string, date: string) => ['public', 'open-availability', serviceId, date] as const,
      MY_BOOKINGS: (filters?: object) => ['user', 'my-bookings', filters] as const,
      MY_BOOKING: (id: string) => ['user', 'my-bookings', id] as const,
      MY_UPCOMING: ['user', 'upcoming'] as const,
    },
  },
} as const

