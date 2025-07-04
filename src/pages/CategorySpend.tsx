import React, {useEffect, useState} from 'react';
import Header from '@/components/layout/Header';
import {Card} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import {Progress} from '@/components/ui/progress';
import {useToast} from '@/hooks/use-toast';
import {useLeague} from '@/contexts/LeagueContext';
import {useNavigate} from 'react-router-dom';

const CategorySpend = () => {
    const {settings} = useLeague();
    const navigate = useNavigate();
    const {toast} = useToast();

    // Check if this page should be accessible
    useEffect(() => {
        if (settings?.draftType !== 'auction') {
            toast({
                title: "Access Denied",
                description: "Category Spend is only available for Auction Drafts.",
                variant: "destructive",
            });
            navigate(-1);
            return;
        }
    }, [settings?.draftType, navigate, toast]);

    // If not auction draft, don't render the component
    if (settings?.draftType !== 'auction') {
        return null;
    }

    const [budget] = useState(500);
    const categories = settings.selectedCategories;

    const getInitialSpending = () => {
        const perCategory = Math.floor(budget / categories.length);
        const remainder = budget % categories.length;

        return categories.reduce((acc, cat, index) => {
            const amount = perCategory + (index < remainder ? 1 : 0);
            return {...acc, [cat]: amount};
        }, {});
    };

    const [spending, setSpending] = useState<Record<string, number>>(getInitialSpending());
    const [isLoading, setIsLoading] = useState(false);

    const totalSpent = Object.values(spending).reduce((sum, amount) => sum + amount, 0);
    const remaining = budget - totalSpent;

    const handleSpendingChange = (category: string, value: number) => {
        setSpending(prev => ({...prev, [category]: Math.max(0, value)}));
    };

    const handleSaveSpending = async () => {
        if (totalSpent !== budget) {
            toast({
                title: "Budget Error",
                description: `You must allocate exactly $${budget}. Currently allocated: $${totalSpent}`,
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            toast({
                title: "Spending Saved",
                description: "Your category spending has been saved successfully!",
            });
        }, 1000);
    };

    const handleAutoAllocate = () => {
        const perCategory = Math.floor(budget / categories.length);
        const remainder = budget % categories.length;

        const newSpending = categories.reduce((acc, cat, index) => {
            const amount = perCategory + (index < remainder ? 1 : 0);
            return {...acc, [cat]: amount};
        }, {});

        setSpending(newSpending);
    };

    return (
        <div className="bg-gray-50 dark:bg-black min-h-screen">
            <Header/>
            <div className="pt-16">
                <header className="py-10 px-4 md:px-8">
                    <div className="max-w-4xl mx-auto flex items-center gap-4">
                        <button onClick={() => navigate(-1)}
                                className="text-white bg-slate-700 hover:bg-slate-600 rounded px-3 py-1 mr-4">Back
                        </button>
                        <div>
                            <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">Category Spend</h1>
                            <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">Allocate your budget across
                                draft
                                categories</p>
                        </div>
                    </div>
                </header>
                <main className="px-4 md:px-8 pb-8 max-w-4xl mx-auto">
                    <Card className="p-6">
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold">Budget Allocation</h2>
                                <Button variant="outline" onClick={handleAutoAllocate}>
                                    Auto-Allocate
                                </Button>
                            </div>
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="text-2xl font-bold">
                                    ${totalSpent} / ${budget}
                                </div>
                                <div
                                    className={`text-sm ${remaining === 0 ? 'text-green-600' : remaining < 0 ? 'text-red-600' : 'text-yellow-600'}`}>
                                    ${remaining} remaining
                                </div>
                            </div>
                            <Progress value={(totalSpent / budget) * 100} className="mb-4"/>
                        </div>

                        <div className="space-y-4">
                            {categories.map((category) => (
                                <div key={category}
                                     className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                                    <div className="flex-1">
                                        <Label className="text-sm font-medium">{category}</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm">$</span>
                                        <Input
                                            type="number"
                                            min="0"
                                            max={budget}
                                            value={spending[category]}
                                            onChange={(e) => handleSpendingChange(category, parseInt(e.target.value) || 0)}
                                            className="w-20"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button
                            onClick={handleSaveSpending}
                            disabled={isLoading || totalSpent !== budget}
                            className="mt-6 w-full"
                        >
                            {isLoading ? "Saving..." : "Save Spending Allocation"}
                        </Button>
                    </Card>
                </main>
            </div>
        </div>
    );
};

export default CategorySpend;
