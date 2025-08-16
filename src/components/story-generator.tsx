import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wand2, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Story {
  id: number;
  genre: string;
  character: string;
  setting: string;
  prompt: string;
  continuations?: string[];
  createdAt: Date;
}

interface StoryGeneratorProps {
  onStoryGenerated: (story: Story) => void;
}

const GENRES = [
  "fantasy",
  "sci-fi", 
  "mystery",
  "romance",
  "horror",
  "adventure",
  "historical",
  "dystopian"
];

const CHARACTERS = {
  fantasy: ["wizard", "knight", "dragon", "elf", "dwarf", "fairy", "sorcerer", "warrior"],
  "sci-fi": ["astronaut", "robot", "alien", "cyborg", "space captain", "android", "pilot", "scientist"],
  mystery: ["detective", "thief", "spy", "investigator", "criminal", "witness", "journalist", "lawyer"],
  romance: ["prince", "princess", "artist", "writer", "doctor", "teacher", "chef", "musician"],
  horror: ["ghost", "vampire", "monster", "witch", "demon", "survivor", "exorcist", "investigator"],
  adventure: ["explorer", "pirate", "treasure hunter", "sailor", "mountaineer", "archaeologist", "guide", "nomad"],
  historical: ["knight", "nobleman", "peasant", "merchant", "scholar", "warrior", "monk", "artisan"],
  dystopian: ["rebel", "survivor", "soldier", "citizen", "outcast", "leader", "spy", "guard"]
};

const SETTINGS = {
  fantasy: ["ancient forest", "floating castle", "haunted swamp", "crystal cave", "enchanted tower", "magical academy", "dragon's lair", "mystical ruins"],
  "sci-fi": ["space station", "alien planet", "starship", "cyberpunk city", "space colony", "research facility", "time portal", "distant galaxy"],
  mystery: ["manor house", "foggy street", "locked room", "abandoned warehouse", "museum", "train", "island mansion", "dark alley"],
  romance: ["royal palace", "cozy café", "beach resort", "mountain cabin", "art gallery", "vineyard", "bookstore", "garden party"],
  horror: ["haunted mansion", "dark cemetery", "abandoned asylum", "cursed forest", "old church", "underground tunnel", "isolated cabin", "ghost town"],
  adventure: ["jungle temple", "mountain peak", "pirate ship", "desert oasis", "hidden valley", "ancient ruins", "treasure island", "wild frontier"],
  historical: ["medieval castle", "roman colosseum", "viking village", "renaissance court", "samurai dojo", "pharaoh's tomb", "aztec temple", "colonial town"],
  dystopian: ["ruined city", "underground bunker", "surveillance state", "wasteland", "factory complex", "forbidden zone", "rebel hideout", "corporate tower"]
};

const PLOT_HOOKS = {
  fantasy: [
    "where every tree whispers secrets of forgotten spells",
    "guarded by a sleeping dragon",
    "cursed with eternal night",
    "where time flows differently",
    "filled with enchanted creatures",
    "protected by ancient magic",
    "hiding a powerful artifact",
    "where reality bends to will"
  ],
  "sci-fi": [
    "where time itself is breaking down",
    "under alien invasion", 
    "experiencing gravity anomalies",
    "with failing life support systems",
    "hiding advanced technology",
    "where AI has gained consciousness",
    "threatened by cosmic phenomenon",
    "containing interdimensional portals"
  ],
  mystery: [
    "where nothing is as it seems",
    "filled with hidden passages",
    "where everyone has secrets",
    "under surveillance",
    "with a dark history",
    "where evidence keeps disappearing",
    "hiding a conspiracy",
    "where the past haunts the present"
  ],
  romance: [
    "where hearts find their match",
    "during a magical celebration",
    "where love conquers all obstacles",
    "filled with romantic tension",
    "where destiny brings souls together",
    "during a chance encounter",
    "where passion ignites",
    "where second chances bloom"
  ],
  horror: [
    "where screams echo endlessly",
    "cursed by ancient evil",
    "where shadows come alive",
    "haunted by restless spirits",
    "where nightmares become real",
    "stained with blood",
    "where darkness feeds",
    "where the dead don't rest"
  ],
  adventure: [
    "filled with deadly traps",
    "hiding legendary treasure",
    "where danger lurks everywhere",
    "requiring great courage",
    "tested by harsh elements",
    "where legends are born",
    "demanding ultimate sacrifice",
    "where only the brave survive"
  ],
  historical: [
    "during a time of great change",
    "where honor is everything",
    "amid political intrigue",
    "during wartime",
    "where tradition meets progress",
    "shaped by ancient customs",
    "during a cultural revolution",
    "where empires rise and fall"
  ],
  dystopian: [
    "where freedom is forbidden",
    "under totalitarian control",
    "where hope is scarce",
    "filled with surveillance",
    "where rebellion stirs",
    "controlled by corporations",
    "where truth is hidden",
    "where resistance is the only option"
  ]
};

export function StoryGenerator({ onStoryGenerated }: StoryGeneratorProps) {
  const [genre, setGenre] = useState<string>("");
  const [character, setCharacter] = useState<string>("");
  const [customSetting, setCustomSetting] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateStory = async () => {
    if (!genre) {
      toast({
        title: "Missing Genre",
        description: "Please select a genre first.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    const genreKey = genre as keyof typeof CHARACTERS;
    const availableCharacters = CHARACTERS[genreKey] || ["traveler"];
    const availableSettings = SETTINGS[genreKey] || ["mysterious place"];
    const availableHooks = PLOT_HOOKS[genreKey] || ["where adventure awaits"];

    const selectedCharacter = character || availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
    const selectedSetting = customSetting || availableSettings[Math.floor(Math.random() * availableSettings.length)];
    const selectedHook = availableHooks[Math.floor(Math.random() * availableHooks.length)];

    const prompt = `A ${selectedCharacter} enters ${selectedSetting} ${selectedHook}. What destiny awaits?`;

    const newStory: Story = {
      id: Date.now(),
      genre,
      character: selectedCharacter,
      setting: selectedSetting,
      prompt,
      continuations: [],
      createdAt: new Date()
    };

    onStoryGenerated(newStory);
    setIsGenerating(false);

    toast({
      title: "Story Generated!",
      description: "Your new story prompt is ready.",
    });
  };

  return (
    <Card className="mystical-glow bg-gradient-surface border-mystical-border/50">
      <CardHeader>
        <CardTitle className="text-2xl font-serif text-center text-foreground flex items-center justify-center gap-2">
          <Wand2 className="h-6 w-6 text-mystical-gold" />
          Story Prompt Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="genre" className="text-foreground font-serif">Genre *</Label>
            <Select value={genre} onValueChange={setGenre}>
              <SelectTrigger id="genre" className="bg-mystical-surface border-mystical-border">
                <SelectValue placeholder="Choose your genre..." />
              </SelectTrigger>
              <SelectContent className="bg-mystical-surface border-mystical-border">
                {GENRES.map((g) => (
                  <SelectItem key={g} value={g} className="hover:bg-mystical-purple/20">
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="character" className="text-foreground font-serif">Character (optional)</Label>
            <Select value={character} onValueChange={setCharacter}>
              <SelectTrigger id="character" className="bg-mystical-surface border-mystical-border">
                <SelectValue placeholder="Random character..." />
              </SelectTrigger>
              <SelectContent className="bg-mystical-surface border-mystical-border">
                {genre && CHARACTERS[genre as keyof typeof CHARACTERS]?.map((char) => (
                  <SelectItem key={char} value={char} className="hover:bg-mystical-purple/20">
                    {char.charAt(0).toUpperCase() + char.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="setting" className="text-foreground font-serif">Custom Setting (optional)</Label>
          <Input
            id="setting"
            value={customSetting}
            onChange={(e) => setCustomSetting(e.target.value)}
            placeholder="Enter a custom setting or leave blank for random..."
            className="bg-mystical-surface border-mystical-border"
          />
        </div>

        <Button
          onClick={generateStory}
          disabled={isGenerating}
          className="w-full bg-gradient-mystical hover:opacity-90 text-white font-serif text-lg py-6"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
              Weaving Your Story...
            </>
          ) : (
            <>
              <Wand2 className="h-5 w-5 mr-2" />
              Generate Story Prompt
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}