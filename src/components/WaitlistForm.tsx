"use client";

import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useMiniAppSdk } from "~/hooks/use-miniapp-sdk";
import { useToast } from "~/hooks/use-toast";

interface WaitlistFormProps {
  onSuccess?: () => void;
}

export default function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const [projectIdea, setProjectIdea] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submittedIdea, setSubmittedIdea] = useState("");
  const { isSDKLoaded, context } = useMiniAppSdk();
  const { toast } = useToast();

  const charactersRemaining = 50 - projectIdea.length;

  useEffect(() => {
    // Fetch current waitlist count on component mount
    const fetchWaitlistCount = async () => {
      try {
        const response = await fetch("/api/waitlist");
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setWaitlistCount(data.count + 23);
          }
        }
      } catch (error) {
        console.error("Failed to fetch waitlist count:", error);
      }
    };

    fetchWaitlistCount();
  }, []);

  useEffect(() => {
    // Check if user already submitted
    const checkExistingSubmission = async () => {
      if (!context?.user) return;

      try {
        const userName = context.user.displayName || context.user.username || "Anonymous";
        const response = await fetch(`/api/waitlist?userName=${encodeURIComponent(userName)}`);
        if (response.ok) {
          const data = await response.json();
          if (data.exists && data.projectIdea) {
            setSubmittedIdea(data.projectIdea);
            setHasSubmitted(true);
          }
        }
      } catch (error) {
        console.error("Failed to check existing submission:", error);
      }
    };

    if (isSDKLoaded && context?.user) {
      checkExistingSubmission();
    }
  }, [isSDKLoaded, context]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSDKLoaded || !context?.user) {
      toast({
        title: "Error",
        description: "Please wait for the app to load completely",
        variant: "destructive",
      });
      return;
    }

    if (!projectIdea.trim() || !prompt.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (projectIdea.length > 50) {
      toast({
        title: "Error",
        description: "Project idea must be 50 characters or less",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectIdea: projectIdea.trim(),
          prompt: prompt.trim(),
          userName:
            context.user.displayName || context.user.username || "Anonymous",
          fid: context.user.fid,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success!",
          description: "You&apos;ve been added to the Vibe School waitlist",
        });
        setSubmittedIdea(projectIdea.trim());
        setHasSubmitted(true);
        setProjectIdea("");
        setPrompt("");
        setWaitlistCount((prev) => (prev || 0) + 1);
        onSuccess?.();
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to join waitlist",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // If SDK loaded but no user context, show link to open in Farcaster
  if (isSDKLoaded && !context?.user) {
    return (
      <div className="w-full space-y-6">
        <Card>
          <CardContent className="pt-6 pb-6">
            <div className="text-center space-y-4">
              <p className="text-lg text-muted-foreground">
                This mini app must be opened in Farcaster
              </p>
              <Button asChild className="w-full h-14 text-lg font-semibold">
                <a
                  href="https://farcaster.xyz/miniapps/nd8YX-tCnHNv/vibeschool"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Farcaster
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {waitlistCount !== null && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold">
                {waitlistCount}
              </div>
              <div className="text-base sm:text-lg text-muted-foreground">
                {waitlistCount === 1 ? "person is" : "people are"} on the
                waitlist
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {hasSubmitted && submittedIdea && (
        <Card className="border-green-500/50 bg-green-500/5">
          <CardContent className="pt-6 pb-6">
            <div className="text-center space-y-3">
              <div className="text-sm font-medium text-green-600 dark:text-green-400">
                Your mini app idea:
              </div>
              <div className="text-lg font-semibold">
                &quot;{submittedIdea}&quot;
              </div>
              <div className="text-sm text-muted-foreground mt-4">
                You&apos;ve already applied to Vibe School. We&apos;ll be in touch soon!
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!hasSubmitted && (
        <Card>
          <CardHeader className="space-y-3">
            <CardTitle className="text-xl sm:text-2xl">Apply Now</CardTitle>
            <CardDescription className="text-base sm:text-lg">
              Co-create a mini app with me and get ready to launch in the Base app
              on Farcaster
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label htmlFor="projectIdea" className="text-base font-medium">
                Describe what your mini app does (50 characters max)
              </label>
              <Input
                id="projectIdea"
                value={projectIdea}
                onChange={(e) => setProjectIdea(e.target.value)}
                placeholder="e.g., Social trading game for crypto enthusiasts"
                maxLength={50}
                disabled={isSubmitting}
                className="h-12 text-base"
              />
              <div className="text-sm text-muted-foreground">
                {charactersRemaining} characters remaining
              </div>
            </div>

            <div className="space-y-3">
              <label htmlFor="prompt" className="text-base font-medium">
                How would you prompt an AI to build this?
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Create a mini app where users can create virtual trading groups..."
                className="min-h-24 w-full rounded-md border border-input bg-background px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isSubmitting}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium"
              disabled={isSubmitting || !isSDKLoaded || !context?.user}
            >
              {isSubmitting ? "Joining..." : "Join Waitlist"}
            </Button>

            {!isSDKLoaded && (
              <div className="text-sm text-muted-foreground text-center">
                Loading Farcaster context...
              </div>
            )}
          </form>
        </CardContent>
      </Card>
      )}
    </div>
  );
}
