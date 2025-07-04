
import React from "react";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Player } from "../lib/types";

export const useQueue = (initialPlayers: Player[]) => {
  const [queue, setQueue] = React.useState<string[]>([]);

  const handleToggleQueue = (
    playerId: string, 
    players: Player[], 
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>,
    currentCategory: string
  ) => {
    const player = players.find(p => p.id === playerId);
    if (!player) return;

    // Only allow queueing if player matches current category
    if (player.category !== currentCategory) return;

    const playerInQueue = queue.includes(playerId);

    setPlayers(prevPlayers => 
      prevPlayers.map(p => p.id === playerId ? { ...p, queue: !p.queue } : p)
    );

    setQueue(prevQueue => {
      if (playerInQueue) {
        return prevQueue.filter(id => id !== playerId);
      } else {
        return [...prevQueue, playerId];
      }
    });
  };

  const handleReorderQueue = (event: DragEndEvent) => {
    const {active, over} = event;
    if (over && active.id !== over.id) {
      setQueue((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const reorderQueue = (startIndex: number, endIndex: number) => {
    setQueue((items) => arrayMove(items, startIndex, endIndex));
  };

  return {
    queue,
    setQueue,
    handleToggleQueue,
    handleReorderQueue,
    reorderQueue,
  };
};
