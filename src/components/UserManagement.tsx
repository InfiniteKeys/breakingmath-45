import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Shield, ShieldOff, Users, User, Edit, Check, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface UserProfile {
  user_id: string;
  display_name: string | null;
  full_name: string | null;
  email: string;
  roles: string[];
}

interface UserWithRole extends UserProfile {
  isOverseer: boolean;
  isAdmin: boolean;
  isEditor: boolean;
}

export const UserManagement = () => {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOverseer, setIsOverseer] = useState(false);
  const [editingProfile, setEditingProfile] = useState<string | null>(null);
  const [newDisplayName, setNewDisplayName] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    checkOverseerStatus();
    fetchUsers();
  }, []);

  const checkOverseerStatus = async () => {
    try {
      const { data, error } = await supabase.rpc('is_overseer');
      if (!error) {
        setIsOverseer(data || false);
      }
    } catch (error) {
      console.error('Error checking overseer status:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      // Fetch profiles with user roles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('user_id, display_name, full_name');

      if (profilesError) {
        console.error('Profiles error:', profilesError);
      }

      // Fetch user roles
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) {
        console.error('Roles error:', rolesError);
      }

      // Combine data
      const userMap = new Map<string, UserWithRole>();

      // Add users from profiles
      profiles?.forEach((profile) => {
        userMap.set(profile.user_id, {
          user_id: profile.user_id,
          display_name: profile.display_name,
          full_name: profile.full_name,
          email: profile.user_id, // We'll display user_id for now since we can't access auth.users
          roles: [],
          isOverseer: false,
          isAdmin: false,
          isEditor: false,
        });
      });

      // Add roles to users
      roles?.forEach((role) => {
        const user = userMap.get(role.user_id);
        if (user) {
          user.roles.push(role.role);
          if (role.role === 'overseer') user.isOverseer = true;
          if (role.role === 'admin') user.isAdmin = true;
          if (role.role === 'editor') user.isEditor = true;
        } else {
          // User has role but no profile yet
          userMap.set(role.user_id, {
            user_id: role.user_id,
            display_name: null,
            full_name: null,
            email: role.user_id, // We'll display user_id for now since we can't access auth.users
            roles: [role.role],
            isOverseer: role.role === 'overseer',
            isAdmin: role.role === 'admin',
            isEditor: role.role === 'editor',
          });
        }
      });

      setUsers(Array.from(userMap.values()));
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Remove display name editing functionality since profiles are now read-only
  const updateDisplayName = async (userId: string) => {
    toast({
      title: "Not Available",
      description: "Profile editing has been disabled. User information is set during registration.",
      variant: "destructive",
    });
  };

  const updateUserRole = async (userId: string, action: 'add' | 'remove', role: 'admin' | 'user' | 'overseer' | 'editor') => {
    try {
      if (action === 'add') {
        const { error } = await supabase
          .from('user_roles')
          .insert([{ user_id: userId, role: role }]);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', userId)
          .eq('role', role);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: `Role ${action === 'add' ? 'granted' : 'removed'} successfully`,
      });

      fetchUsers();
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
      });
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'overseer': return 'destructive';
      case 'admin': return 'default';
      case 'editor': return 'secondary';
      default: return 'outline';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <CardTitle>User Management</CardTitle>
          </div>
          <CardDescription>Loading users...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          <CardTitle>User Management</CardTitle>
        </div>
        <CardDescription>
          Manage user profiles and roles. {isOverseer ? 'You have overseer privileges.' : 'Limited access - contact an overseer for role changes.'}
          <br />
          <span className="text-sm text-muted-foreground">
            Roles: Overseer (full access), Admin (manage announcements), Editor (view only)
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.user_id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <User className="h-4 w-4" />
                  <div className="flex-1">
                    {editingProfile === user.user_id ? (
                      <div className="flex items-center gap-2">
                        <Input
                          value={newDisplayName}
                          onChange={(e) => setNewDisplayName(e.target.value)}
                          placeholder="Enter display name"
                          className="max-w-xs"
                        />
                        <Button size="sm" onClick={() => updateDisplayName(user.user_id)}>
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingProfile(null)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <p className="font-medium">
                          {user.full_name || user.display_name || 'No name set'}
                        </p>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {user.email.includes('@') ? user.email : `ID: ${user.user_id.slice(0, 8)}...`}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {user.roles.map((role) => (
                    <Badge key={role} variant={getRoleBadgeVariant(role)}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </Badge>
                  ))}
                  {user.roles.length === 0 && (
                    <Badge variant="outline">No roles</Badge>
                  )}
                </div>
              </div>
              
              {isOverseer && (
                <div className="flex gap-2 ml-4">
                  <Select onValueChange={(role: 'admin' | 'user' | 'overseer' | 'editor') => updateUserRole(user.user_id, 'add', role)}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Add role" />
                    </SelectTrigger>
                    <SelectContent>
                      {!user.isOverseer && <SelectItem value="overseer">Overseer</SelectItem>}
                      {!user.isAdmin && <SelectItem value="admin">Admin</SelectItem>}
                      {!user.isEditor && <SelectItem value="editor">Editor</SelectItem>}
                    </SelectContent>
                  </Select>
                  
                  {user.roles.length > 0 && (
                    <Select onValueChange={(role: 'admin' | 'user' | 'overseer' | 'editor') => updateUserRole(user.user_id, 'remove', role)}>
                      <SelectTrigger className="w-36">
                        <SelectValue placeholder="Remove role" />
                      </SelectTrigger>
                      <SelectContent>
                        {user.roles.map((role) => (
                          <SelectItem key={role} value={role}>
                            Remove {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              )}
            </div>
          ))}
          {users.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No users with profiles found. Users will appear here once they sign up.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};