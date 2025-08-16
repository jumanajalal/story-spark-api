from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random
from typing import Optional

app = FastAPI(title="Story Prompt API", description="Generate creative writing prompts")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory story storage
stories = {}
story_id_counter = 1

# Story templates by genre
story_templates = {
    "fantasy": {
        "settings": ["ancient forest", "floating castle", "haunted swamp", "crystal caves", "dragon's lair", "magical academy", "enchanted garden", "mystical tower"],
        "hooks": ["where every tree whispers secrets", "guarded by a sleeping dragon", "cursed with eternal night", "filled with ancient magic", "that defies the laws of nature", "where time moves differently", "protected by forgotten spells", "hiding a powerful artifact"],
        "continuations": [
            "Suddenly, a hidden door opens, revealing a secret chamber.",
            "A shadowy figure emerges, watching silently from the shadows.",
            "The air shimmers, and magic bursts into life around them.",
            "An ancient voice echoes through the mystical realm.",
            "A glowing rune appears, pulsing with forbidden power.",
            "The ground trembles as something ancient awakens."
        ]
    },
    "sci-fi": {
        "settings": ["space station", "alien planet", "cyberpunk city", "time portal", "research facility", "distant galaxy", "underground bunker", "orbital colony"],
        "hooks": ["where technology has failed", "inhabited by hostile aliens", "controlled by AI overlords", "experiencing temporal anomalies", "conducting forbidden experiments", "on the edge of known space", "sealed for decades", "drifting through the void"],
        "continuations": [
            "Suddenly, the ship's AI begins to malfunction.",
            "An unknown signal pierces through the cosmic silence.",
            "The quantum field fluctuates, revealing parallel dimensions.",
            "Warning alarms blare as life support systems fail.",
            "A mysterious artifact activates, defying all known physics.",
            "The crew discovers they're not alone in this sector."
        ]
    },
    "mystery": {
        "settings": ["old mansion", "foggy harbor", "abandoned library", "small town", "locked room", "dark alley", "grand hotel", "isolated cabin"],
        "hooks": ["with a decades-old secret", "where people vanish without a trace", "hiding crucial evidence", "where nothing is as it seems", "with a history of strange deaths", "concealing a dangerous truth", "where the past haunts the present", "holding the key to everything"],
        "continuations": [
            "Suddenly, a crucial piece of evidence comes to light.",
            "The suspect's alibi begins to unravel under scrutiny.",
            "A witness emerges with shocking new information.",
            "The detective realizes they've been looking in the wrong place.",
            "An unexpected connection between victims is discovered.",
            "The truth becomes more twisted than anyone imagined."
        ]
    },
    "horror": {
        "settings": ["abandoned asylum", "cemetery at midnight", "dark basement", "haunted house", "cursed forest", "old church", "deserted hospital", "forgotten graveyard"],
        "hooks": ["where screams echo endlessly", "haunted by restless spirits", "sealed for unspeakable reasons", "where reality bends and breaks", "cursed by ancient evil", "where the dead don't rest", "hiding unspeakable horrors", "where nightmares become real"],
        "continuations": [
            "Suddenly, the lights flicker and die completely.",
            "A blood-curdling scream pierces the silence.",
            "The temperature drops as an unseen presence approaches.",
            "Shadows begin to move independently of their sources.",
            "A voice whispers from an impossible direction.",
            "The walls themselves seem to pulse with malevolent life."
        ]
    },
    "romance": {
        "settings": ["charming café", "moonlit beach", "cozy bookstore", "flower garden", "art gallery", "mountain cabin", "city rooftop", "vintage library"],
        "hooks": ["where two hearts unexpectedly meet", "under the spell of first love", "where past and present collide", "filled with unspoken feelings", "where destiny plays cupid", "hiding a romantic secret", "where love conquers all obstacles", "perfect for a chance encounter"],
        "continuations": [
            "Suddenly, their eyes meet across the crowded room.",
            "A handwritten note reveals hidden feelings.",
            "An unexpected gesture changes everything between them.",
            "The past returns to complicate their budding romance.",
            "A misunderstanding threatens to tear them apart.",
            "Love finds a way despite all the obstacles."
        ]
    }
}

@app.get("/")
def read_root():
    return {"message": "Story Prompt API is running!", "version": "1.0"}

@app.get("/story")
def get_story(genre: str = "fantasy", character: str = "traveler", setting: Optional[str] = None):
    global story_id_counter
    
    # Get genre templates or default to fantasy
    genre_data = story_templates.get(genre.lower(), story_templates["fantasy"])
    
    # Choose random setting if not provided
    chosen_setting = setting or random.choice(genre_data["settings"])
    hook = random.choice(genre_data["hooks"])
    
    # Generate the prompt
    prompt = f"A {character} enters a {chosen_setting} {hook}. What destiny awaits?"
    
    # Store the story
    story_id = story_id_counter
    stories[story_id] = {
        "genre": genre,
        "character": character,
        "setting": chosen_setting,
        "parts": [prompt]
    }
    story_id_counter += 1
    
    return {
        "story_id": story_id,
        "genre": genre,
        "character": character,
        "setting": chosen_setting,
        "prompt": prompt
    }

@app.get("/continue/{story_id}")
def continue_story(story_id: int):
    if story_id not in stories:
        return {"error": "Story not found"}
    
    story = stories[story_id]
    genre_data = story_templates.get(story["genre"].lower(), story_templates["fantasy"])
    
    # Get a random continuation
    continuation = random.choice(genre_data["continuations"])
    
    # Add to story parts
    stories[story_id]["parts"].append(continuation)
    
    return {
        "story_id": story_id,
        "next_part": continuation,
        "total_parts": len(stories[story_id]["parts"])
    }

@app.get("/stories")
def get_all_stories():
    return {
        "total_stories": len(stories),
        "stories": [
            {
                "story_id": sid,
                "genre": story["genre"],
                "character": story["character"],
                "setting": story["setting"],
                "parts_count": len(story["parts"])
            }
            for sid, story in stories.items()
        ]
    }

@app.get("/story/{story_id}")
def get_story_by_id(story_id: int):
    if story_id not in stories:
        return {"error": "Story not found"}
    
    story = stories[story_id]
    return {
        "story_id": story_id,
        "genre": story["genre"],
        "character": story["character"],
        "setting": story["setting"],
        "parts": story["parts"],
        "full_story": " ".join(story["parts"])
    }

@app.get("/genres")
def get_available_genres():
    return {
        "genres": list(story_templates.keys()),
        "total": len(story_templates)
    }