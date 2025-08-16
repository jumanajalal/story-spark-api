import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Scroll, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface StoryCardProps {
  story: {
    id: number;
    genre: string;
    character: string;
    setting: string;
    prompt: string;
    continuations?: string[];
    createdAt: Date;
  };
  onContinue: (storyId: number) => void;
  className?: string;
}

export function StoryCard({ story, onContinue, className }: StoryCardProps) {
  return (
    <Card className={cn(
      "mystical-glow hover:shadow-glow transition-all duration-300 bg-gradient-surface border-mystical-border/50 overflow-hidden",
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scroll className="h-5 w-5 text-mystical-gold" />
            <CardTitle className="text-lg font-serif text-foreground">
              Story #{story.id}
            </CardTitle>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {story.createdAt.toLocaleDateString()}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="secondary" className="bg-mystical-purple/20 text-mystical-purple border-mystical-purple/30">
            {story.genre}
          </Badge>
          <Badge variant="outline" className="border-mystical-gold/30 text-mystical-gold">
            {story.character}
          </Badge>
          <Badge variant="outline" className="border-accent/30 text-accent">
            {story.setting}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="prose prose-invert max-w-none">
          <p className="text-foreground leading-relaxed font-serif italic text-lg">
            "{story.prompt}"
          </p>
          {story.continuations && story.continuations.length > 0 && (
            <div className="space-y-2 mt-4 pl-4 border-l-2 border-mystical-purple/30">
              {story.continuations.map((continuation, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed font-serif">
                  {continuation}
                </p>
              ))}
            </div>
          )}
        </div>
        <Button
          onClick={() => onContinue(story.id)}
          variant="outline"
          className="w-full border-mystical-purple/50 hover:bg-mystical-purple/10 hover:border-mystical-purple text-mystical-purple"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Continue Story
        </Button>
      </CardContent>
    </Card>
  );
}