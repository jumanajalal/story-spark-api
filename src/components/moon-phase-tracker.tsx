import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getMoonPhase, getUpcomingPhases, formatDate, formatTodayDate } from '@/lib/moon-phases';
import { ChevronDown, ChevronUp, Moon } from 'lucide-react';

export function MoonPhaseTracker() {
  const [showUpcoming, setShowUpcoming] = useState(false);
  
  const today = new Date();
  const todayPhase = getMoonPhase(today);
  const upcomingPhases = getUpcomingPhases(7);

  return (
    <div className="min-h-screen bg-gradient-mystical p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Moon className="h-8 w-8 text-mystical-gold" />
            <h1 className="text-4xl font-serif font-bold text-foreground">
              Moon Phase Tracker
            </h1>
          </div>
          <p className="text-muted-foreground">
            Track lunar cycles with mystical precision
          </p>
        </div>

        {/* Today's Phase */}
        <Card className="mystical-glow border-mystical-purple/20">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-serif text-mystical-gold">
              Today's Moon Phase
            </CardTitle>
            <p className="text-muted-foreground">
              {formatTodayDate(today)}
            </p>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="space-y-2">
              <div className="text-8xl" role="img" aria-label={todayPhase.name}>
                {todayPhase.emoji}
              </div>
              <h2 className="text-2xl font-serif font-semibold text-foreground">
                {todayPhase.name}
              </h2>
              <p className="text-lg text-mystical-gold">
                {todayPhase.illumination}% Illuminated
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Next 7 Days Button */}
        <div className="text-center">
          <Button
            onClick={() => setShowUpcoming(!showUpcoming)}
            variant="outline"
            size="lg"
            className="group border-mystical-purple/30 hover:border-mystical-gold hover:bg-mystical-purple/10"
          >
            Next 7 Days
            {showUpcoming ? (
              <ChevronUp className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
            ) : (
              <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
            )}
          </Button>
        </div>

        {/* Upcoming Phases */}
        {showUpcoming && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in">
            {upcomingPhases.map((item, index) => (
              <Card 
                key={index}
                className="hover:shadow-mystical transition-all duration-300 border-mystical-purple/10 hover:border-mystical-gold/30"
              >
                <CardContent className="p-4 text-center space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">
                    {formatDate(item.date)}
                  </div>
                  <div className="space-y-2">
                    <div className="text-4xl" role="img" aria-label={item.phase.name}>
                      {item.phase.emoji}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-serif font-semibold text-sm text-foreground">
                        {item.phase.name}
                      </h3>
                      <p className="text-xs text-mystical-gold">
                        {item.phase.illumination}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground py-4">
          <p>Calculations based on astronomical approximation</p>
          <p className="mt-1">Synodic month: ~29.53 days</p>
        </div>
      </div>
    </div>
  );
}