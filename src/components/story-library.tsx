import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { StoryCard } from "@/components/ui/story-card";
import { BookOpen, Search, Filter } from "lucide-react";

interface Story {
  id: number;
  genre: string;
  character: string;
  setting: string;
  prompt: string;
  continuations?: string[];
  createdAt: Date;
}

interface StoryLibraryProps {
  stories: Story[];
  onContinueStory: (storyId: number) => void;
}

export function StoryLibrary({ stories, onContinueStory }: StoryLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGenre, setFilterGenre] = useState("all");

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.character.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.setting.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = filterGenre === "all" || story.genre === filterGenre;
    return matchesSearch && matchesGenre;
  });

  const genres = [...new Set(stories.map(story => story.genre))];

  if (stories.length === 0) {
    return (
      <Card className="mystical-glow bg-gradient-surface border-mystical-border/50 text-center py-12">
        <CardContent>
          <BookOpen className="h-16 w-16 text-mystical-gold mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-serif text-foreground mb-2">Your Story Library Awaits</h3>
          <p className="text-muted-foreground">Generate your first story prompt to begin your collection.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-surface border-mystical-border/50">
        <CardHeader>
          <CardTitle className="text-xl font-serif text-foreground flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-mystical-gold" />
            Story Library
            <Badge variant="secondary" className="ml-auto bg-mystical-purple/20 text-mystical-purple">
              {stories.length} {stories.length === 1 ? 'Story' : 'Stories'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search stories, characters, or settings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-mystical-surface border-mystical-border"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={filterGenre} onValueChange={setFilterGenre}>
                <SelectTrigger className="w-40 bg-mystical-surface border-mystical-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-mystical-surface border-mystical-border">
                  <SelectItem value="all">All Genres</SelectItem>
                  {genres.map(genre => (
                    <SelectItem key={genre} value={genre}>
                      {genre.charAt(0).toUpperCase() + genre.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {filteredStories.length === 0 ? (
        <Card className="bg-gradient-surface border-mystical-border/50 text-center py-8">
          <CardContent>
            <p className="text-muted-foreground">No stories match your search criteria.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredStories.map(story => (
            <StoryCard
              key={story.id}
              story={story}
              onContinue={onContinueStory}
              className="float"
            />
          ))}
        </div>
      )}
    </div>
  );
}