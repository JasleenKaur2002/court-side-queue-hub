
import React from 'react';
import Header from '@/components/layout/Header';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQs = () => {
  const faqs = [
    {
      question: "How do I create a league?",
      answer: "To create a league, go to the Commissioner Dashboard and click 'Create New League'. You'll be able to set up all the league settings, including draft type, number of teams, and categories."
    },
    {
      question: "What is the difference between Auction and Balanced drafts?",
      answer: "In an Auction draft, you bid on players with a budget. In a Balanced draft, you take turns picking players in a set order."
    },
    {
      question: "How do I invite friends to my league?",
      answer: "Share your league code with friends, or use the 'Invite Friends' feature to send them direct invitations."
    },
    {
      question: "When should I allocate my spend?",
      answer: "You should allocate your spend before the deadline set by your commissioner. This determines how much you want to spend on each category."
    },
    {
      question: "Can I change my rankings after submitting them?",
      answer: "Yes, you can update your rankings and category preferences until the draft begins."
    },
    {
      question: "What happens if I miss the draft?",
      answer: "If you miss the draft, the AI will draft for you based on your pre-set rankings and spend allocation."
    }
  ];

  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen">
      <Header />
      <div className="pt-16">
        <header className="py-10 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">FAQs</h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">Frequently Asked Questions</p>
          </div>
        </header>
        <main className="px-4 md:px-8 pb-8 max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white dark:bg-zinc-900 rounded-lg px-6">
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </main>
      </div>
    </div>
  );
};

export default FAQs;
