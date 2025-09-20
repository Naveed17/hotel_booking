export type UserRole = 'customer' | 'agent' | 'admin' | 'super-admin';

export type ModuleId = 'hotels' | 'tours' | 'flights' | 'users';

export interface Module {
  id: ModuleId;
  name: string;
  enabled: boolean;
  permissions: string[];
  icon: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface DashboardStats {
  totalBookings: number;
  totalRevenue: number;
  activeUsers: number;
  conversionRate: number;
}

export const MODULES: Record<ModuleId, Module> = {
  hotels: {
    id: 'hotels',
    name: 'Hotels',
    enabled: true,
    permissions: ['view', 'create', 'edit', 'delete'],
    icon: 'Building'
  },
  tours: {
    id: 'tours',
    name: 'Tours',
    enabled: true,
    permissions: ['view', 'create', 'edit', 'delete'],
    icon: 'MapPin'
  },
  flights: {
    id: 'flights',
    name: 'Flights',
    enabled: true,
    permissions: ['view', 'create', 'edit', 'delete'],
    icon: 'Plane'
  },
  users: {
    id: 'users',
    name: 'Users',
    enabled: true,
    permissions: ['view', 'create', 'edit', 'delete'],
    icon: 'Users'
  }
};

export const ROLE_PERMISSIONS: Record<UserRole, { modules: ModuleId[]; actions: string[] }> = {
  customer: {
    modules: ['hotels', 'tours', 'flights'],
    actions: ['view', 'book']
  },
  agent: {
    modules: ['hotels', 'tours', 'flights'],
    actions: ['view', 'create', 'edit', 'manage_bookings']
  },
  admin: {
    modules: ['hotels', 'tours', 'flights', 'users'],
    actions: ['view', 'create', 'edit', 'delete', 'manage_modules']
  },
  'super-admin': {
    modules: ['hotels', 'tours', 'flights', 'users'],
    actions: ['full_access', 'system_config', 'manage_modules']
  }
};