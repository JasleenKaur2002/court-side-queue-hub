import React, { useState } from 'react';
import SectionCard from './SectionCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ClipboardCopy, Check, ChevronsUpDown } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useLeague } from '@/contexts/LeagueContext';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface RoomManagementCardProps {
  isCommissioner: boolean;
}

// Available league name suggestions
const availableLeagueNames = [
  "Epic NBA Draft",
  "NBA Championship Draft",
  "Basketball Fantasy League",
  "Ultimate NBA Challenge",
  "Hoops Dynasty Draft",
  "NBA All-Star Draft",
  "Court Kings League",
  "NBA Legends Draft",
  "Basketball Masters",
  "NBA Elite Draft",
  "Hardwood Heroes League",
  "NBA Dream Team Draft"
];

// Function to generate league code based on league name
const generateLeagueCode = (leagueName: string): string => {
  // Take first letter of each word and add a random number
  const words = leagueName.split(' ');
  const letters = words.map(word => word.charAt(0).toUpperCase()).join('');
  const randomNum = Math.floor(Math.random() * 900) + 100; // 3-digit number
  return `${letters}${randomNum}`;
};

const RoomManagementCard: React.FC<RoomManagementCardProps> = ({ isCommissioner }) => {
  const { settings, updateSettings } = useLeague();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(settings.leagueName);

  const copyRoomCode = () => {
    navigator.clipboard.writeText(settings.leagueCode);
    toast({
      title: "Copied!",
      description: "League code copied to clipboard",
    });
  };

  const handleLeagueNameSelect = (value: string) => {
    if (isCommissioner) {
      const newLeagueCode = generateLeagueCode(value);
      updateSettings({ 
        leagueName: value,
        leagueCode: newLeagueCode
      });
      setInputValue(value);
      setOpen(false);
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (isCommissioner && value.trim()) {
      const newLeagueCode = generateLeagueCode(value);
      updateSettings({ 
        leagueName: value,
        leagueCode: newLeagueCode
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim() && isCommissioner) {
      const newLeagueCode = generateLeagueCode(inputValue);
      updateSettings({ 
        leagueName: inputValue,
        leagueCode: newLeagueCode
      });
      setOpen(false);
    }
  };

  return (
    <SectionCard title="League Management">
      <div className="space-y-4">
        <div>
          <Label htmlFor="room-code" className="text-sm font-medium text-gray-500 dark:text-gray-400">League Code</Label>
          <div className="flex items-center gap-2 mt-1">
            <Input id="room-code" readOnly value={settings.leagueCode} className="bg-gray-100 dark:bg-zinc-800" />
            <Button variant="outline" size="icon" onClick={copyRoomCode}>
              <ClipboardCopy className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-400 mt-1">Auto-generated: Share this unique code with friends to invite them to your league</p>
        </div>
        <div>
          <Label htmlFor="draft-name" className="text-sm font-medium text-gray-500 dark:text-gray-400">League Name *</Label>
          <div className="mt-1">
            {isCommissioner ? (
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {settings.leagueName || "Enter league name..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput 
                      placeholder="Type your league name or select from suggestions..." 
                      value={inputValue}
                      onValueChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                    />
                    <CommandList>
                      <CommandEmpty>
                        <div className="p-2 text-sm text-gray-500">
                          Press Enter to use "{inputValue}" as your league name
                        </div>
                      </CommandEmpty>
                      <CommandGroup heading="Suggestions">
                        {availableLeagueNames
                          .filter(name => name.toLowerCase().includes(inputValue.toLowerCase()))
                          .map((name) => (
                          <CommandItem
                            key={name}
                            value={name}
                            onSelect={() => handleLeagueNameSelect(name)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                settings.leagueName === name ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            ) : (
              <Input 
                id="draft-name" 
                value={settings.leagueName}
                readOnly
                className="bg-gray-100 dark:bg-zinc-800" 
              />
            )}
          </div>
          <p className="text-xs text-gray-400 mt-1">Required: Type your own league name or choose from suggestions. Press Enter to confirm custom names.</p>
        </div>
      </div>
    </SectionCard>
  );
};

export default RoomManagementCard;
