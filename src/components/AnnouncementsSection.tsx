import { Bell, Award, Calendar, Users, RefreshCw, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ClassroomAnnouncement {
  id: string;
  classroom_id: string;
  announcement_id: string;
  title: string | null;
  text: string | null;
  creator_name: string | null;
  creation_time: string | null;
  update_time: string | null;
  attachments: any;
  created_at: string;
  updated_at: string;
}

const AnnouncementsSection = () => {
  const [announcements, setAnnouncements] = useState<ClassroomAnnouncement[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { toast } = useToast();

  // Replace this with your actual Google Classroom Course ID
  const COURSE_ID = "your-course-id-here";

  const fetchAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from('classroom_announcements')
        .select('*')
        .order('creation_time', { ascending: false });

      if (error) {
        console.error('Error fetching announcements:', error);
        toast({
          title: "Error",
          description: "Failed to fetch announcements from database",
          variant: "destructive",
        });
        return;
      }

      setAnnouncements(data || []);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching announcements:', error);
      toast({
        title: "Error", 
        description: "Failed to fetch announcements",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshFromClassroom = async () => {
    if (!COURSE_ID || COURSE_ID === "your-course-id-here") {
      toast({
        title: "Configuration Required",
        description: "Please set your Google Classroom Course ID in the component",
        variant: "destructive",
      });
      return;
    }

    setRefreshing(true);
    try {
      const { data, error } = await supabase.functions.invoke('fetch-classroom-announcements', {
        body: { courseId: COURSE_ID },
      });

      if (error) {
        console.error('Error calling edge function:', error);
        toast({
          title: "Error",
          description: "Failed to fetch announcements from Google Classroom",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: `${data.count} announcements synced from Google Classroom`,
      });

      // Refresh the local data
      fetchAnnouncements();
    } catch (error) {
      console.error('Error refreshing from classroom:', error);
      toast({
        title: "Error",
        description: "Failed to refresh announcements",
        variant: "destructive",
      });
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Unknown date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Static announcements as fallback when no classroom data
  const staticAnnouncements = [
    {
      id: 1,
      type: "success",
      icon: Award,
      title: "Congratulations to Our Winners!",
      date: "December 15, 2023",
      content: "Sarah Chen and Marcus Johnson placed 1st and 3rd respectively at the Regional Math Competition. Amazing work representing Breaking Math!"
    },
    {
      id: 2,
      type: "info",
      icon: Calendar,
      title: "Winter Break Meeting Schedule",
      date: "December 10, 2023",
      content: "Please note that our regular meetings will resume on January 8th, 2024. We'll be sending out competition prep materials during the break."
    },
    {
      id: 3,
      type: "announcement",
      icon: Users,
      title: "New Member Orientation",
      date: "December 8, 2023",
      content: "Welcome to all our new members who joined this month! Orientation session will be held next Wednesday at 3:30 PM in Room 205."
    }
  ];

  const getAnnouncementStyle = (type?: string) => {
    switch (type) {
      case "success":
        return "border-l-4 border-l-green-500 bg-green-50 dark:bg-green-950/20";
      case "info":
        return "border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-950/20";
      case "announcement":
        return "border-l-4 border-l-accent bg-accent/5";
      default:
        return "border-l-4 border-l-primary bg-primary/5";
    }
  };

  const getIconColor = (type?: string) => {
    switch (type) {
      case "success":
        return "text-green-600";
      case "info":
        return "text-blue-600";
      case "announcement":
        return "text-accent";
      default:
        return "text-primary";
    }
  };

  return (
    <section id="announcements" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Bell className="h-4 w-4" />
              <span className="text-sm font-medium">Latest Updates</span>
            </div>
            <div className="flex items-center justify-center gap-4 mb-6">
              <h2 className="text-4xl md:text-5xl font-bold">Announcements</h2>
              <Button 
                onClick={refreshFromClassroom}
                disabled={refreshing || COURSE_ID === "your-course-id-here"}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Syncing...' : 'Sync from Classroom'}
              </Button>
            </div>
            <p className="text-xl text-muted-foreground">
              {announcements.length > 0 
                ? "Latest announcements from Google Classroom" 
                : "Stay up to date with the latest news, achievements, and important information from Breaking Math."
              }
            </p>
            {lastUpdated && announcements.length > 0 && (
              <p className="text-sm text-muted-foreground mt-2">
                Last synced: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading announcements...</p>
            </div>
          ) : announcements.length === 0 ? (
            // Show static announcements when no classroom data
            <div className="space-y-6">
              {COURSE_ID === "your-course-id-here" && (
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                    <Megaphone className="w-5 h-5" />
                    <span className="font-medium">Google Classroom Integration Ready</span>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">
                    Update the COURSE_ID variable in AnnouncementsSection.tsx with your Google Classroom Course ID to start syncing announcements automatically.
                  </p>
                </div>
              )}
              
              {staticAnnouncements.map((announcement) => {
                const IconComponent = announcement.icon;
                return (
                  <div
                    key={announcement.id}
                    className={`rounded-lg p-6 ${getAnnouncementStyle(announcement.type)} hover:shadow-md transition-shadow`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 ${getIconColor(announcement.type)}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold">{announcement.title}</h3>
                          <span className="text-sm text-muted-foreground">{announcement.date}</span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {announcement.content}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Show Google Classroom announcements
            <div className="space-y-6">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className={`rounded-lg p-6 ${getAnnouncementStyle()} hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 ${getIconColor()}`}>
                      <Megaphone className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">
                          {announcement.creator_name || 'Teacher Announcement'}
                        </h3>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(announcement.creation_time)}
                        </span>
                      </div>
                      <div className="text-muted-foreground leading-relaxed">
                        {announcement.text ? (
                          <div dangerouslySetInnerHTML={{ 
                            __html: announcement.text.replace(/\n/g, '<br />') 
                          }} />
                        ) : (
                          <em>No content</em>
                        )}
                      </div>
                      {announcement.attachments && Array.isArray(announcement.attachments) && announcement.attachments.length > 0 && (
                        <div className="mt-4 p-3 bg-muted/50 rounded-md">
                          <p className="text-sm font-medium mb-2">Attachments:</p>
                          <div className="space-y-1">
                            {announcement.attachments.map((attachment: any, index: number) => (
                              <div key={index} className="text-sm text-primary hover:underline">
                                {attachment.link?.title || attachment.driveFile?.title || `Attachment ${index + 1}`}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Newsletter Signup */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Stay Informed</h3>
              <p className="text-lg mb-6 opacity-90">
                Get the latest announcements and updates delivered directly to your email.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
                />
                <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnnouncementsSection;