import { useState } from "react";
import { StoryGenerator } from "@/components/story-generator";
import { StoryLibrary } from "@/components/story-library";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Wand2, Sparkles, Moon, Stars } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-mystical-library.jpg";

interface Story {
  id: number;
  genre: string;
  character: string;
  setting: string;
  prompt: string;
  continuations?: string[];
  createdAt: Date;
}

const CONTINUATIONS = [
  "Suddenly, a hidden door opens, revealing a secret chamber filled with ancient treasures.",
  "A shadowy figure emerges from the darkness, watching silently with glowing eyes.",
  "The air shimmers with magic, and mysterious symbols begin appearing in the air.",
  "A voice whispers from nowhere, speaking in a language long forgotten.",
  "The ground trembles, and something powerful stirs beneath the surface.",
  "Lightning crackles without thunder, and reality seems to bend and twist.",
  "A gentle breeze carries the scent of roses and the sound of distant music.",
  "Time slows to a crawl as an otherworldly presence makes itself known.",
  "The shadows dance independently, forming shapes that shouldn't exist.",
  "A portal tears open in the fabric of space, revealing glimpses of another world."
];

const Index = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [activeTab, setActiveTab] = useState("generate");

  const handleStoryGenerated = (newStory: Story) => {
    setStories(prev => [newStory, ...prev]);
    setActiveTab("library");
  };

  const handleContinueStory = (storyId: number) => {
    const continuation = CONTINUATIONS[Math.floor(Math.random() * CONTINUATIONS.length)];
    
    setStories(prev => prev.map(story => {
      if (story.id === storyId) {
        return {
          ...story,
          continuations: [...(story.continuations || []), continuation]
        };
      }
      return story;
    }));

    toast({
      title: "Story Continued!",
      description: "A new chapter has been added to your tale.",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Moon className="h-8 w-8 text-mystical-gold animate-pulse" />
              <h1 className="text-5xl md:text-7xl font-serif font-bold bg-gradient-gold bg-clip-text text-transparent">
                Story Weaver
              </h1>
              <Stars className="h-8 w-8 text-mystical-purple animate-pulse" />
            </div>
            
            <p className="text-xl md:text-2xl text-foreground/90 font-serif leading-relaxed max-w-3xl mx-auto">
              Unleash your imagination with AI-powered story prompts. Generate unique tales across genres, 
              continue epic narratives, and build your personal library of creative inspiration.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Button 
                size="lg" 
                className="bg-gradient-mystical hover:opacity-90 text-white font-serif px-8 py-6 text-lg"
                onClick={() => setActiveTab("generate")}
              >
                <Wand2 className="h-5 w-5 mr-2" />
                Start Weaving
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-mystical-gold/50 text-mystical-gold hover:bg-mystical-gold/10 font-serif px-8 py-6 text-lg"
                onClick={() => setActiveTab("library")}
              >
                <BookOpen className="h-5 w-5 mr-2" />
                View Library
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-mystical-surface border border-mystical-border">
              <TabsTrigger 
                value="generate" 
                className="font-serif data-[state=active]:bg-mystical-purple data-[state=active]:text-white"
              >
                <Wand2 className="h-4 w-4 mr-2" />
                Generate
              </TabsTrigger>
              <TabsTrigger 
                value="library"
                className="font-serif data-[state=active]:bg-mystical-purple data-[state=active]:text-white"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Library ({stories.length})
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="generate" className="space-y-8">
            <StoryGenerator onStoryGenerated={handleStoryGenerated} />
            
            {stories.length > 0 && (
              <>
                <Separator className="bg-mystical-border/30" />
                <div className="text-center">
                  <p className="text-muted-foreground font-serif mb-4">
                    You have {stories.length} {stories.length === 1 ? 'story' : 'stories'} in your collection
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => setActiveTab("library")}
                    className="border-mystical-purple/50 text-mystical-purple hover:bg-mystical-purple/10"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    View All Stories
                  </Button>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="library">
            <StoryLibrary stories={stories} onContinueStory={handleContinueStory} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="border-t border-mystical-border/30 mt-20">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground font-serif">
            Where stories come to life • Built with passion for storytellers
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;