import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Button} from '@/components/ui/button';
import {useToast} from '@/hooks/use-toast';
import {useLeague} from '@/contexts/LeagueContext';

interface ActionLinksProps {
    isCommissioner: boolean;
}

const ActionLinks: React.FC<ActionLinksProps> = ({isCommissioner}) => {
    const [isAddingAI, setIsAddingAI] = useState(false);
    const {toast} = useToast();
    const {settings} = useLeague();
    const isAuctionDraft = settings?.draftType === 'auction';

    const handleAllocateSpend = () => {
        toast({
            title: "Allocate Spend",
            description: "Opening spend allocation interface...",
        });
    };

    const handleMyRanks = () => {
        toast({
            title: "My Ranks",
            description: "Opening rankings and categories...",
        });
    };

    const handleAddAIOpponents = async () => {
        setIsAddingAI(true);

        // Simulate AI opponent addition
        setTimeout(() => {
            setIsAddingAI(false);
            toast({
                title: "AI Opponent Added",
                description: "Successfully added AI opponent to the league",
            });
        }, 2000);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Quick Actions</h3>
            <p className="text-xs text-gray-400 mb-4">Optional: Additional tools to enhance your draft experience</p>

            <div className="grid grid-cols-1 gap-3">
                <Button variant="outline" asChild className="justify-start">
                    <Link to="/rank-categories">
                        <span>Rank Categories</span>
                    </Link>
                </Button>
                {isAuctionDraft && (
                    <Button variant="outline" asChild className="justify-start">
                        <Link to="/category-spend">
                            <span>Category Spend</span>
                        </Link>
                    </Button>
                )}
                <Button variant="outline" asChild className="justify-start">
                    <Link to="/4cast-advice">
                        <span>4Cast Advice</span>
                    </Link>
                </Button>
                <Button variant="outline" asChild className="justify-start">
                    <Link to="/invite-friends">
                        <span>Invite Friends</span>
                    </Link>
                </Button>
                {isCommissioner && (
                    <Button
                        variant="outline"
                        onClick={handleAddAIOpponents}
                        disabled={isAddingAI}
                        className="justify-start"
                    >
                        {isAddingAI ? "Adding AI..." : "Add AI Opponent"}
                    </Button>
                )}
            </div>

            <div className="flex flex-col items-start space-y-2 mt-4">
                <Button variant="link" asChild>
                    <Link to="/">Mock Draft</Link>
                </Button>
                <p className="text-xs text-gray-400 mt-2">Use these tools to prepare your strategy before the draft</p>
            </div>
        </div>
    );
};

export default ActionLinks;
