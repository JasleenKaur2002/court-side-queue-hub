
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../ui/tooltip";
import { Info, Mic, Image, Star, Users, Plus, Smile, SendHorizontal, Shirt } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Message, RecentPick } from "../../lib/types";

interface ChatFeedProps {
  messages: Message[];
  recentPicks: RecentPick[];
}

const ChatFeed: React.FC<ChatFeedProps> = ({ messages, recentPicks }) => (
  <aside className="flex flex-col h-full bg-[#181825] border-r border-[#232440] w-full">
    <div className="bg-[#232536] flex flex-col items-stretch gap-0 px-2 md:px-4 border-b border-[#363957] py-1.5">
      <div className="flex items-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1.5 cursor-help">
              <span className="font-bold text-white text-xs md:text-sm">Chat &amp; Live Picks</span>
              <Info className="h-3.5 w-3.5 text-gray-400" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>This area combines live draft pick updates and community chat.</p>
            <p>Pick events will show in real time as users make selections, alongside ongoing chat.</p>
          </TooltipContent>
        </Tooltip>
        <div className="ml-auto flex items-center gap-2 md:gap-4">
          <button className="text-gray-400 hover:text-white"><Mic size={18} /></button>
          <button className="text-gray-400 hover:text-white"><Image size={18} /></button>
          <button className="text-gray-400 hover:text-white"><Star size={18} /></button>
          <button className="text-gray-400 hover:text-white"><Users size={18} /></button>
        </div>
      </div>
    </div>
    <div className="flex-1 min-h-0 overflow-y-auto px-1 md:px-3 py-1 md:py-2 space-y-4 text-xs">
      <div>
        <h3 className="text-blue-300 font-bold text-sm mb-2 px-1">Recent Picks</h3>
        <div className="space-y-2">
          {recentPicks.map(pick => (
            <div key={pick.id} className="bg-[#272940] p-2 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold">{pick.user}</span>
                <span className="text-gray-400 text-[10px]">{pick.time}</span>
              </div>
              <p className="text-white mt-1 text-[11px] md:text-xs">
                picked <span className="font-bold text-blue-400">{pick.pick}</span> (#{pick.overall} overall)
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-[#363957]"></div>
      <div>
        <h3 className="text-blue-300 font-bold text-sm mb-2 px-1">Live Chat</h3>
        <div className="space-y-3">
          {messages.map(msg => (
            <div key={msg.id} className="flex items-start gap-2">
              {msg.type === 'pick' ? (
                <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-gray-700 text-gray-300 rounded-md shrink-0 mt-1">
                  <Shirt size={16} className="md:w-5 md:h-5"/>
                </div>
              ) : (
                <Avatar className="h-6 w-6 md:h-8 md:w-8 shrink-0">
                  <AvatarImage src={(msg as any).face} alt={(msg as any).user} />
                  <AvatarFallback>{(msg as any).user.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div className="flex-1">
                {msg.type === 'pick' ? (
                  <div>
                    <div className="rounded bg-[#272940] px-2 py-1 text-white font-bold leading-tight inline-block">
                      {msg.pick}
                    </div>
                    <p className="text-gray-400 text-[11px] mt-1">
                      <span className="text-blue-300 font-semibold">{msg.team}</span> {msg.details}
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-blue-300 font-bold">{(msg as any).user}</span>
                      <span className="text-gray-400 text-[11px]">{(msg as any).time}</span>
                    </div>
                    <div className="rounded bg-[#272940] px-2 py-1 my-0.5 text-white leading-tight inline-block">
                      {(msg as any).text}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <form className="flex items-center px-2 md:px-3 py-2 border-t border-[#363957] bg-[#181825] gap-2">
      <button type="button" className="text-gray-400 hover:text-white p-1">
        <Plus size={20} />
      </button>
      <div className="flex-1 relative flex items-center">
        <input 
          className="w-full px-3 py-1.5 rounded-full bg-[#232536] text-white text-xs md:text-sm border-none focus:outline-none pr-8" 
          placeholder="Aa" 
        />
        <button type="button" className="absolute right-2 text-gray-400 hover:text-white">
          <Smile size={16} />
        </button>
      </div>
      <button className="text-blue-400 hover:text-blue-500" type="submit">
        <SendHorizontal size={20} />
      </button>
    </form>
  </aside>
);

export default ChatFeed;
