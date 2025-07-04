import React, {useEffect, useState} from 'react';
import Header from '@/components/layout/Header';
import {Card} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {GripVertical, Search} from 'lucide-react';
import {useToast} from '@/hooks/use-toast';
import {Player} from '@/lib/types';
import {initialPlayers} from '@/data/initialPlayers';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Input} from '@/components/ui/input';
import {useLeague} from '@/contexts/LeagueContext';
import {useNavigate} from 'react-router-dom';

const SortableTableRow = ({item, index}: { item: Player; index: number }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: item.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <tr
            ref={setNodeRef}
            style={style}
            className="border-b border-slate-700 text-white hover:bg-slate-700 transition-colors"
        >
            <td className="flex items-center gap-2 py-1 px-2">
                <div {...attributes} {...listeners} className="cursor-grab p-1 text-slate-400 hover:text-white">
                    <GripVertical className="h-4 w-4"/>
                </div>
                <Avatar className="w-6 h-6 border border-slate-600">
                    <AvatarImage src={item.player.face} alt={item.player.name}/>
                    <AvatarFallback>{item.player.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <span>{item.player.name}</span>
            </td>
            <td className="text-center px-2">{item.vegas ?? '—'}</td>
            <td className="text-center px-2">{item["4castrk"] ?? '—'}</td>
            <td className="text-center px-2">{item.adp ?? '—'}</td>
            <td className="text-center px-2">{item.rankls ?? '—'}</td>
            <td className="text-center px-2 font-bold text-blue-400">{index + 1}</td>
        </tr>
    );
};

const RankCategories = () => {
    const {settings, updateUserRankings} = useLeague();
    const [selectedCategory, setSelectedCategory] = useState<string>(settings.selectedCategories[0] || '');
    const [rankedItems, setRankedItems] = useState<Player[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const {toast} = useToast();
    const navigate = useNavigate();

    const availableCategories = settings.selectedCategories;

    useEffect(() => {
        if (selectedCategory) {
            // Check if rankings for this category already exist in the context
            if (settings.userRankings[selectedCategory]) {
                setRankedItems(settings.userRankings[selectedCategory]);
            } else {
                // Otherwise, initialize from the main data source
                const itemsForCategory = initialPlayers.filter(p => p.category === selectedCategory);
                // Sort by Vegas odds (ascending), fallback to rankls if vegas is missing
                const sorted = [...itemsForCategory].sort((a, b) => {
                    if (a.vegas != null && b.vegas != null) return a.vegas - b.vegas;
                    if (a.vegas != null) return -1;
                    if (b.vegas != null) return 1;
                    if (a.rankls != null && b.rankls != null) return a.rankls - b.rankls;
                    return 0;
                });
                setRankedItems(sorted);
            }
        } else {
            setRankedItems([]);
        }
    }, [selectedCategory, settings.userRankings]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        if (active.id !== over?.id) {
            setRankedItems((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over!.id);
                const newOrder = arrayMove(items, oldIndex, newIndex);

                // Update the context with the new order
                updateUserRankings(selectedCategory, newOrder);

                return newOrder;
            });
        }
    };

    const handleSaveRankings = () => {
        setIsLoading(true);
        // Rankings are already updated in context on drag end.
        // This button can just be for user confirmation.
        setTimeout(() => {
            setIsLoading(false);
            toast({
                title: "Rankings Saved",
                description: `Your rankings for ${selectedCategory} have been saved.`,
            });
            console.log("Saved Rankings:", settings.userRankings);
        }, 500);
    };

    const filteredRankedItems = rankedItems.filter(item =>
        item.player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-[#191929] min-h-screen">
            <Header/>
            <div className="pt-16">
                <header className="py-10 px-4 md:px-8">
                    <div className="max-w-4xl mx-auto flex items-center gap-4">
                        <button onClick={() => navigate(-1)}
                                className="text-white bg-slate-700 hover:bg-slate-600 rounded px-3 py-1 mr-4">Back
                        </button>
                        <div>
                            <h1 className="text-4xl font-extrabold text-white">Rank Selections</h1>
                            <p className="text-lg text-slate-400 mt-2">
                                Create your own rankings for selections within each category.
                            </p>
                        </div>
                    </div>
                </header>
                <main className="px-4 md:px-8 pb-8 max-w-4xl mx-auto">
                    <Card className="p-6 bg-[#22223a] border-slate-700">
                        <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger
                                    className="w-full md:w-[280px] bg-[#27293c] border-slate-600 text-white focus:ring-slate-500">
                                    <SelectValue placeholder="Select a category to rank..."/>
                                </SelectTrigger>
                                <SelectContent className="bg-[#27293c] text-white border-slate-600">
                                    {availableCategories.map((category) => (
                                        <SelectItem key={category} value={category} className="focus:bg-slate-500">
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <div className="w-full md:w-auto relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                        size={16}/>
                                <Input
                                    type="text"
                                    placeholder="Search selections..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 w-full bg-[#27293c] border-slate-600 text-white placeholder-gray-400"
                                    disabled={!selectedCategory}
                                />
                            </div>
                        </div>

                        {selectedCategory ? (
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >
                                <SortableContext items={filteredRankedItems.map(item => item.id)}
                                                 strategy={verticalListSortingStrategy}>
                                    <div className="overflow-x-auto">
                                        <table
                                            className="min-w-full text-xs md:text-sm border border-slate-700 bg-[#23223a] rounded-lg">
                                            <thead>
                                            <tr className="bg-[#23223a] text-white">
                                                <th className="px-2 py-2 text-left font-semibold">Player</th>
                                                <th className="px-2 py-2 font-semibold">Vegas</th>
                                                <th className="px-2 py-2 font-semibold">4Cast</th>
                                                <th className="px-2 py-2 font-semibold">ADP</th>
                                                <th className="px-2 py-2 font-semibold">Rank Last Season</th>
                                                <th className="px-2 py-2 font-semibold">My Rank</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {filteredRankedItems.map((item, index) => (
                                                <SortableTableRow key={item.id} item={item} index={index}/>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </SortableContext>
                            </DndContext>
                        ) : (
                            <div className="min-h-[300px] flex items-center justify-center text-slate-500">
                                <p>Please select a category to start ranking.</p>
                            </div>
                        )}

                        <Button onClick={handleSaveRankings} disabled={isLoading || !selectedCategory}
                                className="mt-6 w-full">
                            {isLoading ? "Saving..." : "Save Current Category Rankings"}
                        </Button>
                    </Card>
                </main>
            </div>
        </div>
    );
};

export default RankCategories;
