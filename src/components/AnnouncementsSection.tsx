import { Bell, Award, Calendar, Users, Megaphone } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
interface Announcement {
  id: string;
  title: string | null;
  text: string | null;
  creator_name: string | null;
  creation_time: string | null;
  created_at: string;
}
const AnnouncementsSection = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const {
    toast
  } = useToast();
  const fetchAnnouncements = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('classroom_announcements').select('id, title, text, creator_name, creation_time, created_at').order('created_at', {
        ascending: false
      });
      if (error) {
        console.error('Error fetching announcements:', error);
        toast({
          title: "Error",
          description: "Failed to fetch announcements from database",
          variant: "destructive"
        });
        return;
      }
      setAnnouncements(data || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      toast({
        title: "Error",
        description: "Failed to fetch announcements",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
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
      day: 'numeric'
    });
  };

  // Static announcements as fallback when no admin announcements
  const staticAnnouncements = [{
    id: 1,
    type: "success",
    icon: Award,
    title: "Congratulations to Our Winners!",
    date: "December 15, 2023",
    content: "Sarah Chen and Marcus Johnson placed 1st and 3rd respectively at the Regional Math Competition. Amazing work representing Breaking Math!"
  }, {
    id: 2,
    type: "info",
    icon: Calendar,
    title: "Winter Break Meeting Schedule",
    date: "December 10, 2023",
    content: "Please note that our regular meetings will resume on January 8th, 2024. We'll be sending out competition prep materials during the break."
  }, {
    id: 3,
    type: "announcement",
    icon: Users,
    title: "New Member Orientation",
    date: "December 8, 2023",
    content: "Welcome to all our new members who joined this month! Orientation session will be held next Wednesday at 3:30 PM in Room 205."
  }];
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
  return <section id="announcements" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Bell className="h-4 w-4" />
              <span className="text-sm font-medium">Latest Updates</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Announcements</h2>
            <p className="text-xl text-muted-foreground">
              Stay up to date with the latest news, achievements, and important information from Breaking Math.
            </p>
          </div>

          {loading ? <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading announcements...</p>
            </div> : announcements.length === 0 ?
        // Show static announcements when no admin announcements
        <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                  <Megaphone className="w-5 h-5" />
                  <span className="font-medium">No announcements yet</span>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">
                  Administrators can create announcements through the admin panel. Here are some example announcements:
                </p>
              </div>
              
              {staticAnnouncements.map(announcement => {
            const IconComponent = announcement.icon;
            return <div key={announcement.id} className={`rounded-lg p-6 ${getAnnouncementStyle(announcement.type)} hover:shadow-md transition-shadow`}>
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
                  </div>;
          })}
            </div> :
        // Show admin panel announcements
        <div className="space-y-6">
              {announcements.map(announcement => <div key={announcement.id} className={`rounded-lg p-6 ${getAnnouncementStyle()} hover:shadow-md transition-shadow`}>
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 ${getIconColor()}`}>
                      <Megaphone className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">
                          {announcement.title || 'Announcement'}
                        </h3>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(announcement.creation_time || announcement.created_at)}
                        </span>
                      </div>
                      <div className="text-muted-foreground leading-relaxed">
                        {announcement.text ? <div dangerouslySetInnerHTML={{
                    __html: announcement.text.replace(/\n/g, '<br />')
                  }} /> : <em>No content</em>}
                      </div>
                      {announcement.creator_name && <div className="mt-2 text-sm text-muted-foreground">
                          — {announcement.creator_name}
                        </div>}
                    </div>
                  </div>
                </div>)}
            </div>}

          {/* Newsletter Signup */}
          <div className="mt-16 text-center">
            
          </div>
        </div>
      </div>
    </section>;
};
export default AnnouncementsSection;