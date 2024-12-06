import React from 'react';
import { CheckCircle, XCircle, Users } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth';

export function AdminPage() {
  const { users, approveUser, rejectUser } = useAuthStore();
  const pendingUsers = users.filter(user => user.status === 'pending');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">User Management</h2>
          </div>
          <p className="mt-1 text-foreground-secondary">
            Approve or reject pending user registrations
          </p>
        </div>

        {pendingUsers.length === 0 ? (
          <div className="text-center py-12 bg-background-secondary rounded-lg border border-border">
            <p className="text-foreground-secondary">No pending registrations</p>
          </div>
        ) : (
          <div className="bg-background-secondary border border-border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-foreground-secondary uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-foreground-secondary uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-foreground-secondary uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-foreground-secondary uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {pendingUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-900/20 text-yellow-400">
                        Pending
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Button
                          onClick={() => approveUser(user.id)}
                          className="inline-flex items-center gap-1 text-green-400 hover:text-green-300"
                          variant="outline"
                          size="sm"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => rejectUser(user.id)}
                          className="inline-flex items-center gap-1 text-red-400 hover:text-red-300"
                          variant="outline"
                          size="sm"
                        >
                          <XCircle className="h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}