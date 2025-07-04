import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LeagueProvider } from "./contexts/LeagueContext";
import { LoadingProvider, useLoading } from "./contexts/LoadingContext";
import Loader from "./components/ui/loader";
import Index from "./pages/Index";
import DraftLobby from "./pages/DraftLobby";
import Draft from "./pages/Draft";
import CommissionerLobby from "./pages/CommissionerLobby";
import Profile from "./pages/Profile";
import Security from "./pages/Security";
import LeagueChat from "./pages/LeagueChat";
import FAQs from "./pages/FAQs";
import Support from "./pages/Support";
import RankCategories from "./pages/RankCategories";
import CategorySpend from "./pages/CategorySpend";
import InviteFriends from "./pages/InviteFriends";
import FourCastAdvice from "./pages/FourCastAdvice";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import TermsAndConditions from "./pages/TermsAndConditions";
import LandingRouter from "./routes/LandingRouter";
import PreSignUpLanding from "./pages/LandingPage/PreSignUpLanding";
import PostDraftLanding from "./pages/LandingPage/PostDraftLanding";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isLoading, loadingMessage } = useLoading();

  return (
    <>
      <Loader isLoading={isLoading} message={loadingMessage} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingRouter />} />
          <Route path="/pre-signup" element={<PreSignUpLanding />} />
          <Route path="/commissioner-lobby" element={<CommissionerLobby />} />
          <Route path="/post-draft" element={<PostDraftLanding />} />
          <Route path="/draft-lobby" element={<DraftLobby />} />
          {/* <Route path="/" element={<CommissionerLobby />} /> */}
          <Route path="/commissioner-draft" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/lobby" element={<DraftLobby />} />
          <Route path="/draft" element={<Draft />} />
          <Route path="/commissioner" element={<CommissionerLobby />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/security" element={<Security />} />
          <Route path="/league-chat" element={<LeagueChat />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/support" element={<Support />} />
          <Route path="/terms" element={<TermsAndConditions />} />  
          <Route path="/rank-categories" element={<RankCategories />} />
          <Route path="/category-spend" element={<CategorySpend />} />
          <Route path="/invite-friends" element={<InviteFriends />} />
          <Route path="/4cast-advice" element={<FourCastAdvice />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LoadingProvider>
      <LeagueProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppContent />
        </TooltipProvider>
      </LeagueProvider>
    </LoadingProvider>
  </QueryClientProvider>
);

export default App;
