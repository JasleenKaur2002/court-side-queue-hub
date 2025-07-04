import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {useLeague} from '@/contexts/LeagueContext';

const Header = () => {
    const {settings} = useLeague();
    const isAuctionDraft = settings?.draftType === 'auction';

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-zinc-800 shadow-sm">
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-16">
                <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    4Cast
                </Link>

                <NavigationMenu className="hidden md:flex">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Draft</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className="grid gap-3 p-6 w-[400px]">
                                    <NavigationMenuLink asChild>
                                        <Link to="/"
                                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                            <div className="text-sm font-medium leading-none">Mock Draft</div>
                                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                Practice drafting with AI opponents
                                            </p>
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link to="/lobby"
                                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                            <div className="text-sm font-medium leading-none">Draft Lobby</div>
                                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                Join your league's draft lobby
                                            </p>
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link to="/commissioner"
                                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                            <div className="text-sm font-medium leading-none">Commissioner Dashboard
                                            </div>
                                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                Manage league settings and configuration
                                            </p>
                                        </Link>
                                    </NavigationMenuLink>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Prepare</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className="grid gap-3 p-6 w-[400px]">
                                    <NavigationMenuLink asChild>
                                        <Link to="/rank-categories"
                                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                            <div className="text-sm font-medium leading-none">Rank Categories</div>
                                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                Set your category preferences and rankings
                                            </p>
                                        </Link>
                                    </NavigationMenuLink>
                                    {isAuctionDraft && (
                                        <NavigationMenuLink asChild>
                                            <Link to="/category-spend"
                                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                                <div className="text-sm font-medium leading-none">Category Spend</div>
                                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                    Allocate budget for auction drafts
                                                </p>
                                            </Link>
                                        </NavigationMenuLink>
                                    )}
                                    <NavigationMenuLink asChild>
                                        <Link to="/4cast-advice"
                                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                            <div className="text-sm font-medium leading-none">4Cast Advice</div>
                                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                AI-powered draft insights and recommendations
                                            </p>
                                        </Link>
                                    </NavigationMenuLink>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link to="/league-chat"
                                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                                    League Chat
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link to="/invite-friends"
                                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                                    Invite Friends
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Help</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className="grid gap-3 p-6 w-[300px]">
                                    <NavigationMenuLink asChild>
                                        <Link to="/faqs"
                                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                            <div className="text-sm font-medium leading-none">FAQs</div>
                                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                Frequently asked questions
                                            </p>
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link to="/support"
                                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                            <div className="text-sm font-medium leading-none">Support</div>
                                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                Get help and submit tickets
                                            </p>
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link to="/terms"   
                                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                            <div className="text-sm font-medium leading-none">Terms and Conditions</div>
                                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                Read our terms and conditions
                                            </p>
                                        </Link>
                                    </NavigationMenuLink>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost"
                                    className="flex items-center gap-2 text-gray-500 dark:text-gray-400 px-2 hover:bg-transparent hover:text-gray-800 dark:hover:text-gray-100">
                                Profile
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                                <Link to="/profile">Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to="/security">Security</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem>Sign Out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="hidden md:flex items-center gap-4">
                        <Link to="/auth">
                            <Button variant="ghost">Sign In</Button>
                        </Link>
                        <Link to="/auth">
                            <Button>Sign Up</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
