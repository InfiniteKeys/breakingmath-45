import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Plus, Edit, Calendar, Clock, MapPin, Users } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Event {
  id: string;
  name: string;
  description: string | null;
  date: string;
  time: string;
  location: string;
  participants: string;
  created_by: string;
  created_at: string;
}

export const EventManagement = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [participants, setParticipants] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch events",
        variant: "destructive",
      });
    } else {
      setEvents(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !date || !time || !location.trim() || !participants.trim()) {
      toast({
        title: "Error",
        description: "All fields except description are required",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    const eventData = {
      name: name.trim(),
      description: description.trim() || null,
      date,
      time,
      location: location.trim(),
      participants: participants.trim(),
      created_by: user?.id,
    };

    if (editingId) {
      const { error } = await supabase
        .from('events')
        .update(eventData)
        .eq('id', editingId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update event",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Event updated successfully",
        });
        resetForm();
        fetchEvents();
      }
    } else {
      const { error } = await supabase
        .from('events')
        .insert([eventData]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create event",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Event created successfully",
        });
        resetForm();
        fetchEvents();
      }
    }

    setSubmitting(false);
  };

  const handleEdit = (event: Event) => {
    setEditingId(event.id);
    setName(event.name);
    setDescription(event.description || '');
    setDate(event.date);
    setTime(event.time);
    setLocation(event.location);
    setParticipants(event.participants);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Event deleted successfully",
      });
      fetchEvents();
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setDate('');
    setTime('');
    setLocation('');
    setParticipants('');
    setEditingId(null);
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Create/Edit Event */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Manage Events</CardTitle>
              <CardDescription>
                Create and manage events for the Breaking Math club
              </CardDescription>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => resetForm()}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Event
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingId ? 'Edit Event' : 'Create New Event'}
                  </DialogTitle>
                  <DialogDescription>
                    {editingId ? 'Update the event details' : 'Fill in the details for your new event'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Event Name*</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Regional Math Competition"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Event description..."
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date*</Label>
                      <Input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time*</Label>
                      <Input
                        id="time"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location*</Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="University of Toronto"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="participants">Participants*</Label>
                    <Input
                      id="participants"
                      value={participants}
                      onChange={(e) => setParticipants(e.target.value)}
                      placeholder="All grades welcome"
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" disabled={submitting}>
                      {submitting ? 'Saving...' : (editingId ? 'Update' : 'Create')} Event
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

      {/* Events List */}
      <Card>
        <CardHeader>
          <CardTitle>All Events ({events.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {events.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No events yet. Create your first event above.
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-3">{event.name}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(event.date).toLocaleDateString('en-US', { 
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {new Date(`2000-01-01T${event.time}`).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                          })}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {event.location}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          {event.participants}
                        </div>
                      </div>
                      {event.description && (
                        <p className="text-muted-foreground whitespace-pre-wrap">
                          {event.description}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(event)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(event.id)}
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
    </div>
  );
};