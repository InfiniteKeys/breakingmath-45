import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Plus, ArrowLeft, LogOut, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserManagement } from '@/components/UserManagement';
import { ProfileSettings } from '@/components/ProfileSettings';
import { EventManagement } from '@/components/EventManagement';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Announcement {
  id: string;
  title: string | null;
  text: string | null;
  creator_name: string | null;
  creation_time: string | null;
  created_at: string;
}

const AdminPanel = () => {
  const { user, isAdmin, isOverseer, loading, displayName } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && (!user || (!isAdmin && !isOverseer))) {
      navigate('/auth');
    }
  }, [user, isAdmin, isOverseer, loading, navigate]);

  useEffect(() => {
    if (user && (isAdmin || isOverseer)) {
      fetchAnnouncements();
    }
  }, [user, isAdmin, isOverseer]);

  const fetchAnnouncements = async () => {
    const { data, error } = await supabase
      .from('classroom_announcements')
      .select('id, title, text, creator_name, creation_time, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch announcements",
        variant: "destructive",
      });
    } else {
      setAnnouncements(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Announcement text is required",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    // Get user's display name for announcements
    const { data: profile } = await supabase
      .from('profiles')
      .select('display_name')
      .eq('user_id', user?.id)
      .maybeSingle();

    const announcementData = {
      classroom_id: 'admin-created',
      announcement_id: `admin-${Date.now()}`,
      title: title.trim() || null,
      text: text.trim(),
      creator_name: profile?.display_name || creatorName.trim() || user?.email || 'Admin',
      creation_time: new Date().toISOString(),
    };

    if (editingId) {
      const { error } = await supabase
        .from('classroom_announcements')
        .update(announcementData)
        .eq('id', editingId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update announcement",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Announcement updated successfully",
        });
        resetForm();
        fetchAnnouncements();
      }
    } else {
      const { error } = await supabase
        .from('classroom_announcements')
        .insert([announcementData]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create announcement",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Announcement created successfully",
        });
        resetForm();
        fetchAnnouncements();
      }
    }

    setSubmitting(false);
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingId(announcement.id);
    setTitle(announcement.title || '');
    setText(announcement.text || '');
    setCreatorName(announcement.creator_name || '');
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('classroom_announcements')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete announcement",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Announcement deleted successfully",
      });
      fetchAnnouncements();
    }
  };

  const resetForm = () => {
    setTitle('');
    setText('');
    setCreatorName('');
    setEditingId(null);
    setDialogOpen(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!user || (!isAdmin && !isOverseer)) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Back to Site
              </Link>
              <h1 className="text-3xl font-bold">Admin Panel</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {displayName || user.email}
              </span>
              <Button onClick={handleSignOut} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Admin Tabs */}
          <Tabs defaultValue="announcements" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="profile">Profile Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="announcements" className="space-y-6">
              {/* Create/Edit Announcement */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Manage Announcements</CardTitle>
                      <CardDescription>
                        Create and manage announcements for the Breaking Math website
                      </CardDescription>
                    </div>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <DialogTrigger asChild>
                        <Button onClick={() => resetForm()}>
                          <Plus className="h-4 w-4 mr-2" />
                          New Announcement
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>
                            {editingId ? 'Edit Announcement' : 'Create New Announcement'}
                          </DialogTitle>
                          <DialogDescription>
                            {editingId ? 'Update the announcement details' : 'Fill in the details for your new announcement'}
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="creator">Creator Name</Label>
                            <Input
                              id="creator"
                              value={creatorName}
                              onChange={(e) => setCreatorName(e.target.value)}
                              placeholder="Your name or title"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="title">Title (Optional)</Label>
                            <Input
                              id="title"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              placeholder="Announcement title"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="text">Announcement Text*</Label>
                            <Textarea
                              id="text"
                              value={text}
                              onChange={(e) => setText(e.target.value)}
                              placeholder="Enter your announcement here..."
                              rows={6}
                              required
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button type="submit" disabled={submitting}>
                              {submitting ? 'Saving...' : (editingId ? 'Update' : 'Create')} Announcement
                            </Button>
                            <Button type="button" variant="outline" onClick={resetForm}>
                              Cancel
                            </Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
              </Card>

              {/* Announcements List */}
              <Card>
                <CardHeader>
                  <CardTitle>All Announcements ({announcements.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {announcements.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No announcements yet. Create your first announcement above.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {announcements.map((announcement) => (
                        <div
                          key={announcement.id}
                          className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium">
                                  {announcement.creator_name || 'Unknown'}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(announcement.creation_time || announcement.created_at).toLocaleDateString()}
                                </span>
                              </div>
                              {announcement.title && (
                                <h3 className="font-semibold mb-2">{announcement.title}</h3>
                              )}
                              <p className="text-muted-foreground whitespace-pre-wrap">
                                {announcement.text}
                              </p>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(announcement)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDelete(announcement.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="events">
              <EventManagement />
            </TabsContent>
            
            <TabsContent value="users">
              <UserManagement />
            </TabsContent>
            
            <TabsContent value="profile">
              <ProfileSettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;