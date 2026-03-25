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
      LOCATIONS: ['admin', 'locations'] as const,
      ADD_ONS: ['admin', 'add-ons'] as const,
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
  },
} as const

