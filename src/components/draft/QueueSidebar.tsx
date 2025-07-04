import React, {useState} from "react";
import {Player} from "../../lib/types";
import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select";
import {isTeamBasedCategory} from "../../utils/draftUtils";
import {useLeague} from '../../contexts/LeagueContext';

interface QueueSidebarProps {
    queuedPlayers: Player[];
    onRemoveFromQueue: (id: string) => void;
    onReorderQueue: (startIndex: number, endIndex: number) => void;
    currentCategory: string;
    onCategoryChange: (category: string) => void;
}

const QueueSidebar: React.FC<QueueSidebarProps> = ({
                                                       queuedPlayers,
                                                       onRemoveFromQueue,
                                                       currentCategory,
                                                       onCategoryChange
                                                   }) => {
    const [viewMode, setViewMode] = useState<'queue' | 'selections'>('queue');
    const {settings} = useLeague();
    const selectedCategories = settings.selectedCategories;

    const isTeamBased = isTeamBasedCategory(currentCategory);
    const headerLabel = isTeamBased ? "Team" : "Player";

    // Mock selections data - in real app this would come from props or state
    const mockSelections = [
        {category: "NBA East Champ", selection: "Boston Celtics"},
        {category: "MVP", selection: "Jalen Brunson"},
        {category: "NBA West Champ", selection: "San Antonio Spurs"},
    ];

    const filteredQueuedPlayers = queuedPlayers.filter(player => player.category === currentCategory);

    const renderQueueView = () => (
        <div className="flex-1 min-h-0 overflow-auto">
            {filteredQueuedPlayers.length === 0 ? (
                <div className="p-4 text-center text-gray-400 text-sm">
                    No items queued for {currentCategory}
                </div>
            ) : (
                <div className="space-y-2 p-2">
                    {filteredQueuedPlayers.map((player, index) => (
                        <div key={player.id}
                             className="flex items-center gap-2 p-2 bg-[#232748] rounded border border-[#313158]">
                            <span className="text-xs text-gray-400 w-6">{index + 1}.</span>
                            <Avatar className="w-6 h-6 border border-gray-600">
                                <AvatarImage src={player.player.face} alt={player.player.name}/>
                                <AvatarFallback
                                    className="text-xs">{player.player.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <span className="flex-1 text-white text-sm">{player.player.name}</span>
                            <button
                                onClick={() => onRemoveFromQueue(player.id)}
                                className="w-4 h-4 rounded bg-red-600 hover:bg-red-700 flex items-center justify-center"
                                title="Remove from Queue"
                            >
                                <span className="text-white text-xs">×</span>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    const renderSelectionsView = () => (
        <div className="flex-1 min-h-0 overflow-auto">
            {mockSelections.length === 0 ? (
                <div className="p-4 text-center text-gray-400 text-sm">
                    No selections made yet
                </div>
            ) : (
                <div className="space-y-2 p-2">
                    {mockSelections.map((selection, index) => (
                        <div key={index} className="p-3 bg-[#232748] rounded border border-[#313158]">
                            <div className="text-xs text-gray-400 mb-1">{selection.category}</div>
                            <div className="text-white text-sm font-medium">{selection.selection}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <div className="flex flex-col h-full bg-[#191a24] border-r border-[#232440]">
            {/* Header with toggle dropdown */}
            <div className="border-b border-[#232440] p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="relative">
                        <Select value={viewMode} onValueChange={(value: 'queue' | 'selections') => setViewMode(value)}>
                            <SelectTrigger
                                className="w-auto h-auto py-1 px-3 rounded bg-[#27293c] border-none text-white text-sm focus:outline-none focus:ring-0 focus:ring-offset-0">
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent className="bg-[#27293c] text-white border-gray-600">
                                <SelectItem value="queue" className="text-sm focus:bg-slate-500">My Queue</SelectItem>
                                <SelectItem value="selections" className="text-sm focus:bg-slate-500">My
                                    Selections</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {viewMode === 'queue' && (
                    <Select
                        value={currentCategory}
                        onValueChange={onCategoryChange}
                    >
                        <SelectTrigger
                            className="w-full h-auto py-1 px-2 rounded bg-[#27293c] border-none text-white text-xs focus:outline-none focus:ring-0 focus:ring-offset-0">
                            <SelectValue placeholder="Select a category"/>
                        </SelectTrigger>
                        <SelectContent className="bg-[#27293c] text-white border-gray-600">
                            {selectedCategories.map((category) => (
                                <SelectItem key={category} value={category} className="text-xs focus:bg-slate-500">
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            </div>

            {viewMode === 'queue' ? renderQueueView() : renderSelectionsView()}
        </div>
    );
};

export default QueueSidebar;
