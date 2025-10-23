import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MakeAdminButtonProps {
  email: string;
  onAdminMade?: () => void;
}

export const MakeAdminButton = ({ email, onAdminMade }: MakeAdminButtonProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const makeAdmin = async () => {
    setIsLoading(true);
    try {
      // Update the user's role to admin
      const { data, error } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('email', email)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to update user role: ${error.message}`);
      }

      toast({
        title: 'Success',
        description: `User ${email} is now an admin`,
      });

      if (onAdminMade) {
        onAdminMade();
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={makeAdmin}
      disabled={isLoading}
    >
      {isLoading ? (
        "Making Admin..."
      ) : (
        <>
          <Shield className="h-4 w-4 mr-2" />
          Make Admin
        </>
      )}
    </Button>
  );
};