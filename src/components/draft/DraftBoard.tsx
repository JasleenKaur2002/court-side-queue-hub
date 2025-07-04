import React, {useEffect, useRef} from "react";
import {Tooltip, TooltipContent, TooltipTrigger} from "../ui/tooltip";
import {Info, LocateFixed} from "lucide-react";
import {CATEGORIES, TEAMS} from "../../lib/draft-data";
import { useDraft } from "@/hooks/useDraft";

interface DraftBoardProps {
    picks: any[][];
}

const DraftBoard: React.FC<DraftBoardProps> = ({picks}) => {
    const currentPickRef = useRef<HTMLDivElement>(null);

    const {currentTeamOnClock, pickOrderMapping, currentPickNumber, dynamicTeams, dynamicCategories} = useDraft()

    const focusOnCurrentPick = () => {
        if (currentPickRef.current) {
            currentPickRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center",
            });
        }
    };


    // Find current and next pick positions based on draft progress within the current category
    const findPickPositions = () => {
        const currentRound = Math.floor((currentPickNumber - 1) / dynamicTeams.length);
        if (currentRound >= dynamicCategories.length) return { current: null, next: null };
        
        const currentCategoryRow = picks[currentRound];
        if (!currentCategoryRow) return { current: null, next: null };
        
        // Count how many picks have been made in this category (players drafted)
        const picksAlreadyMade = currentCategoryRow.filter(cell => cell?.player !== null).length;
        
        // The current pick number is the next one to be made
        const currentPickNum = picksAlreadyMade + 1;
        const nextPickNum = picksAlreadyMade + 2;
        
        let currentPosition = null;
        let nextPosition = null;
        
        // Find team with the current pick number
        const currentTeamIdx = currentCategoryRow.findIndex(cell => cell?.pickNumber === currentPickNum);
        if (currentTeamIdx !== -1) {
            currentPosition = { row: currentRound, col: currentTeamIdx };
        }
        
        // Find team with the next pick number
        const nextTeamIdx = currentCategoryRow.findIndex(cell => cell?.pickNumber === nextPickNum);
        if (nextTeamIdx !== -1) {
            nextPosition = { row: currentRound, col: nextTeamIdx };
        }
        
        return { current: currentPosition, next: nextPosition };
    };

    const { current: currentPickPosition, next: nextPickPosition } = findPickPositions();

    const tooltipContent = (
        <div className="text-left">
            <b className="text-blue-300">Draft Board Details</b>
            <br/>
            Each square shows the pick number for that team in each category.
            <br/>
            Active (current) picks highlighted in yellow, next pick in blue.
            <br/>
            Draft progresses based on randomized pick order within each category.
        </div>
    );




    return (
        <div className="h-full overflow-auto bg-[#191a24] border-b border-[#232440] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-transparent">
            <div className="relative">
                {/* Header Row: sticky top */}
                <div className="flex flex-row sticky top-0 z-20">
                    {/* Top-left corner: sticky left */}
                    <div
                        className="sticky left-0 bg-[#191a24] z-30 w-[92px] md:w-[220px] flex-shrink-0 flex items-center border-b border-r border-[#22223A] py-0 md:py-2 pr-1 md:pr-4 pl-2 md:pl-8">
                        <div className="font-bold text-slate-200 h-6 md:h-8 flex-shrink-0 flex items-center">
                            <span
                                className="font-bold text-[10px] md:text-xs px-2 py-1 bg-blue-900/60 rounded mr-1 md:mr-2">Category</span>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button className="ml-1 text-gray-400 hover:text-white">
                                        <Info size={14}/>
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent className="bg-gray-800 text-white border-gray-700 max-w-xs text-xs p-3">
                                    {tooltipContent}
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button onClick={focusOnCurrentPick}
                                            className="ml-1 text-gray-400 hover:text-white">
                                        <LocateFixed size={14}/>
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent className="bg-gray-800 text-white border-gray-700 text-xs p-2">
                                    <p>Focus on current pick</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </div>
                    {/* Team Headers */}
                    {dynamicTeams.map((team, colIdx) => (
                        <div key={colIdx}
                             className="flex-shrink-0 min-w-[72px] md:min-w-[120px] border-b border-r border-[#22223A] bg-[#191a24]">
                            <div className="h-6 md:h-8 flex items-center justify-center pb-0.5 md:pb-1">
                                <span className="text-[10px] md:text-xs text-blue-300 font-bold">{team.name}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Body content */}
                <div className="flex flex-row">
                    {/* Category Column */}
                    <div className="sticky left-0 z-10 w-[92px] md:w-[220px] flex-shrink-0 flex flex-col bg-[#191a24]">
                        {dynamicCategories.map((category, i) => (
                            <div key={i}
                                 className="h-[49px] md:h-[76px] flex-shrink-0 flex items-center border-b border-r border-[#22223A] pr-2 pl-2 md:pl-8">
                                <span
                                    className="text-white/90 text-xs md:text-sm font-semibold leading-tight">{category}</span>
                            </div>
                        ))}
                    </div>

                    {/* Picks Grid */}
                    <div className="flex flex-row">
                        {dynamicTeams.map((team, colIdx) => (
                            <div key={colIdx} className="flex flex-col min-w-[72px] md:min-w-[120px]">
                                {dynamicCategories.map((_, rowIdx) => {
                                    const cell = picks[rowIdx]?.[colIdx];

                                    const isCurrentPick = currentPickPosition && 
                                        colIdx === currentPickPosition.col && 
                                        rowIdx === currentPickPosition.row;
                                    const isNextPick = nextPickPosition && 
                                        colIdx === nextPickPosition.col && 
                                        rowIdx === nextPickPosition.row;

                                    let extraClasses = "";
                                    if (isCurrentPick) {
                                        extraClasses = "border-4 border-yellow-400 shadow-lg shadow-yellow-200/30 animate-pulse bg-yellow-400/10";
                                    } else if (isNextPick) {
                                        extraClasses = "border-4 border-blue-400 shadow-lg shadow-blue-200/30 bg-blue-400/10";
                                    } else {
                                        extraClasses = "border-[#313158]";
                                    }
                                    return (
                                        <div key={rowIdx}
                                             ref={isCurrentPick ? currentPickRef : null}
                                             className={`h-[49px] md:h-[76px] flex-shrink-0 flex items-center justify-center border-b border-r border-[#22223A]`}
                                        >
                                            <div
                                                className={`relative w-[calc(100%-4px)] h-[calc(100%-4px)] md:w-[calc(100%-8px)] md:h-[calc(100%-8px)] rounded-lg p-1 md:p-2 flex items-center justify-center shadow bg-[#25243a] ${extraClasses} ${cell?.highlightOutline ? "outline outline-2 outline-blue-400" : ""}`}
                                            >
                                                {/* Pick number in top left corner - always show */}
                                                <span
                                                    className="absolute top-1 left-1 text-[8px] md:text-[10px] text-gray-300 font-bold bg-black/50 px-1 py-0.5 rounded">
                                Pick {cell?.pickNumber ?? ''}
                              </span>

                                                {/* Player name in center - only show if picked */}
                                                {cell?.player && (
                                                    <div className="flex items-center justify-center text-center">
                                                        <span
                                                            className="text-white font-semibold text-[10px] md:text-xs leading-tight">{cell.player}</span>
                                                    </div>
                                                )}

                                                {isCurrentPick && (
                                                    <span
                                                        className="absolute bottom-0 right-0 bg-black bg-opacity-60 text-yellow-300 text-[8px] md:text-[10px] font-bold px-1 py-0.5 rounded-tl">Current</span>
                                                )}
                                                {isNextPick && (
                                                    <span
                                                        className="absolute bottom-0 right-0 bg-black bg-opacity-60 text-blue-300 text-[8px] md:text-[10px] font-bold px-1 py-0.5 rounded-tl">Next</span>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DraftBoard;
