import React, {useState} from "react";
import {Player} from "../../lib/types";
import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar";
import {Tooltip, TooltipContent, TooltipTrigger} from "../ui/tooltip";
import {Info, Search} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select";
import {Input} from "../ui/input";
import {isTeamBasedCategory} from "../../utils/draftUtils";
import {useLeague} from '../../contexts/LeagueContext';

const columns = [
    {id: "vegas", title: "Vegas Odds"},
    {id: "rankls", title: "Rank Last Season"},
    {id: "4castrk", title: "4cast Rank"},
    {id: "myrank", title: "My Rank"},
];

function QueueButton({queued, onClick}: { queued: boolean, onClick: () => void }) {
    return (
        <button className={`ml-1 md:ml-2 w-5 md:w-6 h-5 md:h-6 rounded border 
      ${queued ? "bg-green-500 border-green-600" : "bg-gray-700 border-gray-600 hover:bg-blue-600"}  
      flex items-center justify-center transition-colors`}
                title={queued ? "Remove from Queue" : "Add to Queue"}
                onClick={onClick}
        >
            <span className="text-xs text-white">{queued ? "✓" : "+"}</span>
        </button>
    );
}

interface SelectionTableProps {
    rows: Player[];
    onToggleQueue: (id: string) => void;
    onDraftPlayer: (id: string) => void;
    currentCategory: string;
    onCategoryChange: (category: string) => void;
}

const SelectionTable: React.FC<SelectionTableProps> = ({
                                                           rows,
                                                           onToggleQueue,
                                                           onDraftPlayer,
                                                           currentCategory,
                                                           onCategoryChange
                                                       }) => {
    const {settings} = useLeague();
    const selectedCategories = settings.selectedCategories;
    const [searchTerm, setSearchTerm] = useState("");

    const filteredRows = rows.filter(row =>
        row.category === currentCategory &&
        row.player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isTeamBased = isTeamBasedCategory(currentCategory);
    const headerLabel = isTeamBased ? "Team" : "Player";

    return (
        <div className="flex flex-col h-full w-full flex-1 px-0.5 md:px-2">
            {/* Header with controls */}
            <div className="border-b border-[#232440] py-2 mb-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                    <span className="font-semibold text-white text-xs md:text-sm">Draft Pool</span>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button className="text-gray-400 hover:text-white">
                                <Info size={14}/>
                            </button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-800 text-white border-gray-700 max-w-xs text-xs p-3">
                            <p>All ranking columns managed by draft logic</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <div className="flex items-center gap-2">
                    <Select
                        value={currentCategory}
                        onValueChange={onCategoryChange}
                    >
                        <SelectTrigger
                            className="w-[200px] md:w-[280px] h-auto py-1 px-2 rounded bg-[#27293c] border-none text-white text-xs focus:outline-none focus:ring-0 focus:ring-offset-0">
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
                </div>
            </div>

            {/* Search Bar */}
            <div className="mb-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16}/>
                <Input
                    type="text"
                    placeholder={`Search ${headerLabel.toLowerCase()}s...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-[#27293c] border-gray-600 text-white placeholder-gray-400 text-sm h-8"
                />
            </div>

            <div className="flex-1 min-h-0 overflow-auto">
                <table className="min-w-full text-xs md:text-sm text-white border-collapse">
                    <thead className="sticky top-0 bg-[#22223A] z-10">
                    <tr className="text-gray-300 font-bold border-b border-[#313158]">
                        <th className="px-1 md:px-2 py-1 text-xs md:text-sm text-left border-r border-[#313158]">
                            {headerLabel}
                        </th>
                        {columns.map(col => (
                            <th key={col.id}
                                className="px-1.5 md:px-3 py-1 text-xs md:text-sm border-r border-[#313158]">
                                {col.title}
                            </th>
                        ))}
                        <th className="px-1.5 md:px-2 py-1 text-xs md:text-sm border-r border-[#313158]">ADP</th>
                        <th className="px-1.5 md:px-2 py-1 text-xs md:text-sm border-r border-[#313158]">Queue</th>
                        <th className="px-1.5 md:px-2 py-1 text-xs md:text-sm">Draft</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredRows.map((row) => (
                        <tr key={row.id} className="border-b border-[#313158] hover:bg-[#232748] transition-colors">
                            <td className="flex items-center gap-1 md:gap-2 py-1.5 px-1 md:px-2 border-r border-[#313158]">
                                <Avatar className="w-6 h-6 md:w-8 md:h-8 border border-gray-600">
                                    <AvatarImage src={row.player.face} alt={row.player.name}/>
                                    <AvatarFallback>{row.player.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <span className="text-xs md:text-sm">{row.player.name}</span>
                            </td>
                            <td className="text-center py-1.5 px-1 border-r border-[#313158] text-xs">{row.vegas}</td>
                            <td className="text-center py-1.5 px-1 border-r border-[#313158] text-xs">{row.rankls}</td>
                            <td className="text-center py-1.5 px-1 border-r border-[#313158] text-xs">{row["4castrk"]}</td>
                            <td className="text-center py-1.5 px-1 border-r border-[#313158] text-xs">{row.myrank}</td>
                            <td className="text-center py-1.5 px-1 border-r border-[#313158] text-xs">{row.adp}</td>
                            <td className="text-center py-1.5 px-1 border-r border-[#313158]">
                                <QueueButton queued={row.queue} onClick={() => onToggleQueue(row.id)}/>
                            </td>
                            <td className="text-center py-1.5 px-1">
                                <button
                                    onClick={() => onDraftPlayer(row.id)}
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-[10px] md:text-xs"
                                >
                                    Draft
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SelectionTable;
