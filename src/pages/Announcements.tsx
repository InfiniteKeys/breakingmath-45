import { useState, useEffect } from "react";
import { Heart, MessageCircle, Calendar, User, Send, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CountdownBanner from "@/components/CountdownBanner";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";

interface Announcement {
  id: string;
  title: string | null;
  text: string | null;
  creator_name: string | null;
  creation_time: string | null;
  created_at: string;
  likes: number;
  comments: Comment[];
  liked: boolean;
}

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}

const Announcements = () => {
  const { toast } = useToast();
  const { user, isAdmin } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [showPostForm, setShowPostForm] = useState(false);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from('classroom_announcements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch announcements",
          variant: "destructive",
        });
      } else {
        // Convert database format to component format and add local state for likes/comments
        const formattedAnnouncements: Announcement[] = (data || []).map(announcement => ({
          id: announcement.id,
          title: announcement.title,
          text: announcement.text,
          creator_name: announcement.creator_name, // This now includes display names from the database
          creation_time: announcement.creation_time,
          created_at: announcement.created_at,
          likes: 0,
          comments: [],
          liked: false
        }));
        setAnnouncements(formattedAnnouncements);
      }
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!newPost.content.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in the announcement content.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Get user's display name
      const { data: profile } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('user_id', user?.id)
        .maybeSingle();

      const announcementData = {
        classroom_id: 'public-announcements',
        announcement_id: `announcement-${Date.now()}`,
        title: newPost.title.trim() || null,
        text: newPost.content.trim(),
        creator_name: profile?.display_name || user?.email || 'Admin',
        creation_time: new Date().toISOString(),
      };

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
          title: "Post Created!",
          description: "Your announcement has been published successfully.",
        });
        setNewPost({ title: "", content: "" });
        setShowPostForm(false);
        fetchAnnouncements(); // Refresh the list
      }
    } catch (error) {
      console.error('Error creating announcement:', error);
      toast({
        title: "Error",
        description: "Failed to create announcement",
        variant: "destructive",
      });
    }
  };

  const handleLike = (id: string) => {
    setAnnouncements(prev => prev.map(post => 
      post.id === id ? { 
        ...post, 
        liked: !post.liked, 
        likes: post.liked ? post.likes - 1 : post.likes + 1 
      } : post
    ));
  };

  const handleComment = (postId: string) => {
    const commentText = commentInputs[postId];
    if (!commentText?.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      author: "Club Member",
      content: commentText,
      date: new Date().toISOString().split('T')[0]
    };

    setAnnouncements(prev => prev.map(post => 
      post.id === postId ? { 
        ...post, 
        comments: [...post.comments, newComment] 
      } : post
    ));

    setCommentInputs(prev => ({ ...prev, [postId]: "" }));

    toast({
      title: "Comment Added!",
      description: "Your comment has been posted.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <CountdownBanner />
        <main className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading announcements...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CountdownBanner />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Club Announcements</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Stay updated with the latest news, events, and achievements from Breaking Math.
              </p>
            </div>

            {/* Create Post Button - Only for Admins */}
            {isAdmin && (
              <div className="mb-8">
                <Button 
                  onClick={() => setShowPostForm(!showPostForm)}
                  className="btn-hero"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Create Announcement
                </Button>
              </div>
            )}

            {/* Post Creation Form - Only for Admins */}
            {isAdmin && showPostForm && (
              <Card className="p-6 mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
                <h3 className="text-xl font-semibold mb-4">Create New Announcement</h3>
                <div className="space-y-4">
                  <Input
                    placeholder="Announcement title..."
                    value={newPost.title}
                    onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                  />
                  <Textarea
                    placeholder="Share your announcement with the club..."
                    value={newPost.content}
                    onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                    rows={4}
                  />
                  <div className="flex gap-3">
                    <Button onClick={handleCreatePost} className="btn-hero">
                      <Send className="mr-2 h-4 w-4" />
                      Publish
                    </Button>
                    <Button variant="outline" onClick={() => setShowPostForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Announcements Feed */}
            <div className="space-y-8">
              {announcements.map((post) => (
                <Card key={post.id} className="p-6 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      {post.title && <h3 className="text-xl font-semibold mb-2 text-primary">{post.title}</h3>}
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {post.creator_name || 'Unknown'}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(post.creation_time || post.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="text-foreground/90 leading-relaxed mb-6 whitespace-pre-wrap">{post.text}</p>

                  {/* Post Actions */}
                  <div className="flex items-center space-x-6 pb-4 border-b border-border/30">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-2 ${post.liked ? 'text-red-500' : 'text-muted-foreground'} hover:text-red-500`}
                    >
                      <Heart className={`h-4 w-4 ${post.liked ? 'fill-current' : ''}`} />
                      <span>{post.likes}</span>
                    </Button>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments.length}</span>
                    </div>
                  </div>

                  {/* Comments Section */}
                  {post.comments.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="bg-muted/30 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">{comment.author}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(comment.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-foreground/80">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Comment Input */}
                  <div className="mt-4 flex gap-3">
                    <Input
                      placeholder="Add a comment..."
                      value={commentInputs[post.id] || ""}
                      onChange={(e) => setCommentInputs(prev => ({ 
                        ...prev, 
                        [post.id]: e.target.value 
                      }))}
                      onKeyPress={(e) => e.key === 'Enter' && handleComment(post.id)}
                    />
                    <Button 
                      size="sm" 
                      onClick={() => handleComment(post.id)}
                      className="btn-hero"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {announcements.length === 0 && (
              <div className="text-center py-16">
                <MessageCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-xl font-semibold mb-2">No announcements yet</h3>
                <p className="text-muted-foreground mb-6">{isAdmin ? "Be the first to share news with the club!" : "Check back later for updates from the club!"}</p>
                {isAdmin && (
                  <Button onClick={() => setShowPostForm(true)} className="btn-hero">
                    <Plus className="mr-2 h-5 w-5" />
                    Create First Announcement
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Announcements;