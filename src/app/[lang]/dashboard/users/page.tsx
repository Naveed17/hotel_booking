'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, Shield, Activity, Search, Filter, Edit, Trash2, Eye, ChevronUp, ChevronDown, X } from 'lucide-react';
import { useDashboard } from '@src/context/dashboardContext';
import StatsCard from '@src/components/dashboard/shared/widgets/StatsCard';
import Drawer from '@components/core/components/drawer/drawer';
import Select from '@src/components/core/select';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'customer' | 'agent' | 'admin' | 'super-admin';
  status: 'active' | 'inactive';
  joined: string;
  lastActive: string;
  avatar?: string;
}

const UsersPage = () => {
  const { user } = useDashboard();
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Smith', email: 'john@example.com', role: 'customer', status: 'active', joined: 'Mar 15, 2024', lastActive: '2 hours ago' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'agent', status: 'active', joined: 'Mar 12, 2024', lastActive: '1 day ago' },
    { id: 3, name: 'Mike Wilson', email: 'mike@example.com', role: 'customer', status: 'inactive', joined: 'Mar 10, 2024', lastActive: '1 week ago' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'admin', status: 'active', joined: 'Mar 8, 2024', lastActive: '30 min ago' },
    { id: 5, name: 'David Lee', email: 'david@example.com', role: 'customer', status: 'active', joined: 'Mar 5, 2024', lastActive: '3 hours ago' },
    { id: 6, name: 'Emma Davis', email: 'emma@example.com', role: 'agent', status: 'active', joined: 'Mar 3, 2024', lastActive: '5 hours ago' }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof User>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showAddDrawer, setShowAddDrawer] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  if (!user || (user.role !== 'admin' && user.role !== 'super-admin')) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Access denied. Admin privileges required.</p>
      </div>
    );
  }

  const handleSort = (field: keyof User) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedUsers = [...users]
    .filter(u =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aVal: any = a[sortField];
      const bVal: any = b[sortField];
      if (sortDirection === 'asc') {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      }
    });

  const handleDeleteUser = (user: User) => {
    setDeletingUser(user);
  };

  const confirmDeleteUser = () => {
    if (deletingUser) {
      setUsers(users.filter(u => u.id !== deletingUser.id));
      setDeletingUser(null);
    }
  };

  const handleAddUser = (newUser: Omit<User, 'id'>) => {
    const id = Math.max(...users.map(u => u.id)) + 1;
    setUsers([...users, { ...newUser, id }]);
    setShowAddDrawer(false);
  };

  const handleEditUser = (updatedUser: User) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    setEditingUser(null);
  };

  const SortIcon = ({ field }: { field: keyof User }) => {
    if (sortField !== field) return <ChevronUp className="h-4 w-4 text-gray-300" />;
    return sortDirection === 'asc' ?
      <ChevronUp className="h-4 w-4 text-blue-600" /> :
      <ChevronDown className="h-4 w-4 text-blue-600" />;
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600 mt-2">Manage users, roles, and permissions</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value="15,234"
          change="+1,240 this month"
          changeType="positive"
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="Active Today"
          value="3,456"
          change="+234 from yesterday"
          changeType="positive"
          icon={Activity}
          color="green"
        />
        <StatsCard
          title="New Registrations"
          value="89"
          change="+12 this week"
          changeType="positive"
          icon={UserPlus}
          color="purple"
        />
        <StatsCard
          title="Admin Users"
          value="24"
          change="System administrators"
          changeType="neutral"
          icon={Shield}
          color="yellow"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Users</h3>

        </div>

        <div className="mb-4 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowAddDrawer(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Add User
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 font-semibold text-gray-900">
                  <button onClick={() => handleSort('name')} className="flex items-center gap-2 hover:text-blue-600">
                    Name <SortIcon field="name" />
                  </button>
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">
                  <button onClick={() => handleSort('email')} className="flex items-center gap-2 hover:text-blue-600">
                    Email <SortIcon field="email" />
                  </button>
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">
                  <button onClick={() => handleSort('role')} className="flex items-center gap-2 hover:text-blue-600">
                    Role <SortIcon field="role" />
                  </button>
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">
                  <button onClick={() => handleSort('status')} className="flex items-center gap-2 hover:text-blue-600">
                    Status <SortIcon field="status" />
                  </button>
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">
                  <button onClick={() => handleSort('joined')} className="flex items-center gap-2 hover:text-blue-600">
                    Joined <SortIcon field="joined" />
                  </button>
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Last Active</th>
                <th className="text-center py-4 px-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{user.email}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${user.role === 'super-admin' ? 'bg-red-100 text-red-700' :
                      user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                        user.role === 'agent' ? 'bg-green-100 text-green-700' :
                          'bg-blue-100 text-blue-700'
                      }`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1 w-fit ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                      <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
                        }`}></div>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{user.joined}</td>
                  <td className="py-4 px-6 text-gray-600">{user.lastActive}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setViewingUser(user)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setEditingUser(user)}
                        className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit User"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete User"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No users found matching your search.</p>
          </div>
        )}
      </motion.div>

      {/* Add User Drawer */}
      <UserDrawer
        title="Add New User"
        open={showAddDrawer}
        onClose={() => setShowAddDrawer(false)}
        onSave={handleAddUser}
      />

      {/* Edit User Drawer */}
      <UserDrawer
        title="Edit User"
        user={editingUser || undefined}
        open={!!editingUser}
        onClose={() => setEditingUser(null)}
        onSave={handleEditUser}
      />

      {/* View User Drawer */}
      {viewingUser && (
        <ViewUserDrawer
          user={viewingUser}
          open={!!viewingUser}
          onClose={() => setViewingUser(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingUser && (
        <DeleteUserModal
          user={deletingUser}
          onClose={() => setDeletingUser(null)}
          onConfirm={confirmDeleteUser}
        />
      )}
    </div>
  );
};

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['customer', 'agent', 'admin', 'super-admin']),
  status: z.enum(['active', 'inactive'])
});

type UserFormData = z.infer<typeof userSchema>;

// User Drawer Component
const UserDrawer = ({ title, user, onClose, onSave, open }: {
  title: string;
  user?: User;
  onClose: () => void;
  onSave: (user: any) => void;
  open: boolean;
}) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      role: user?.role || 'customer',
      status: user?.status || 'active'
    },
    values: user ? {
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    } : undefined
  });

  const onSubmit = (data: UserFormData) => {
    if (user) {
      onSave({ ...user, ...data });
    } else {
      onSave({ ...data, joined: new Date().toLocaleDateString(), lastActive: 'Just now' });
    }
    reset();
  };

  return (
    <Drawer 
      isOpen={open} 
      onClose={onClose}
      title={title}
      width={384}
      placement="right"
      bodyClass="p-0"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col h-full">
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Name</label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`w-full px-4 py-3 border rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.name ? 'border-red-500' : 'border-gray-200'
                      }`}
                  />
                )}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    className={`w-full px-4 py-3 border rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.email ? 'border-red-500' : 'border-gray-200'
                      }`}
                  />
                )}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Role</label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select
                    height="48px"
                    value={{ value: field.value, label: field.value.charAt(0).toUpperCase() + field.value.slice(1) }}
                    onChange={(option) => field.onChange((option as any)?.value)}
                    options={[
                      { value: 'customer', label: 'Customer' },
                      { value: 'agent', label: 'Agent' },
                      { value: 'admin', label: 'Admin' },
                      { value: 'super-admin', label: 'Super Admin' }
                    ]}
                  />
                )}
              />
              {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Status</label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    height="48px"
                    value={{ value: field.value, label: field.value.charAt(0).toUpperCase() + field.value.slice(1) }}
                    onChange={(option) => field.onChange((option as any)?.value)}
                    options={[
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'Inactive' }
                    ]}
                  />
                )}
              />
              {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
            </div>
          </div>

        <div className="border-t border-gray-200 p-6">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              {user ? 'Update User' : 'Create User'}
            </button>
          </div>
        </div>
      </form>
    </Drawer>
  );
};

// View User Drawer Component
const ViewUserDrawer = ({ user, onClose, open }: { user: User; onClose: () => void; open: boolean }) => {
  return (
    <Drawer 
      isOpen={open} 
      onClose={onClose}
      title="User Details"
      width={384}
      placement="right"
      bodyClass="p-0"
    >
      <div className="p-6 flex-1">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">
              {user.name.charAt(0)}
            </div>
            <h4 className="text-2xl font-semibold text-gray-900 mb-2">{user.name}</h4>
            <p className="text-gray-600">{user.email}</p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">User ID</p>
                <p className="font-semibold text-gray-900">#{user.id}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Role</p>
                <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${user.role === 'super-admin' ? 'bg-red-100 text-red-700' :
                  user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                    user.role === 'agent' ? 'bg-green-100 text-green-700' :
                      'bg-blue-100 text-blue-700'
                  }`}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <span className={`inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                  <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
                    }`}></div>
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </span>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Joined Date</p>
                <p className="font-semibold text-gray-900">{user.joined}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Last Active</p>
                <p className="font-semibold text-gray-900">{user.lastActive}</p>
              </div>
            </div>
          </div>
        </div>

      <div className="border-t border-gray-200 p-6">
        <button
          onClick={onClose}
          className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          Close
        </button>
      </div>
    </Drawer>
  );
};

// Delete User Modal Component
const DeleteUserModal = ({ user, onClose, onConfirm }: {
  user: User;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[60]">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="h-8 w-8 text-red-600" />
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2">Delete User</h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete <span className="font-semibold">{user.name}</span>?
            This action cannot be undone.
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Delete User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;