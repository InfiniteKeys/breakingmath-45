import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [pendingUserId, setPendingUserId] = useState<string>('');
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) {
      toast({
        title: "Sign Up Error",
        description: error.message,
        variant: "destructive"
      });
    } else if (data.user) {
      setPendingUserId(data.user.id);
      setShowVerification(true);
      toast({
        title: "Check Your Email",
        description: "We've sent you a verification code. Please check your email and enter the code below."
      });
    }
    setLoading(false);
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: verificationCode,
      type: 'signup'
    });
    
    if (error) {
      toast({
        title: "Verification Error",
        description: error.message,
        variant: "destructive"
      });
    } else if (data.user) {
      toast({
        title: "Account Verified!",
        description: "Your account has been successfully created and verified."
      });
      navigate('/');
    }
    setLoading(false);
  };
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const {
      error
    } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) {
      toast({
        title: "Sign In Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in."
      });
      navigate('/');
    }
    setLoading(false);
  };
  return <div className="min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
        
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Access Restricted</CardTitle>
            <CardDescription>User registration is currently disabled</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center p-8">
              <p className="text-muted-foreground mb-6">
                Regular user registration has been disabled. Only administrators can create accounts.
              </p>
              <Link to="/admins">
                <Button variant="outline" className="mb-4">
                  Admin Login
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">
                Contact an administrator if you need access.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default Auth;