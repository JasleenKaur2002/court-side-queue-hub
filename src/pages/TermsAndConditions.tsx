import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { useNavigate } from 'react-router-dom';

const TermsAndConditions = () => {
  const [checkboxes, setCheckboxes] = useState({
    terms: false,
    age: false,
    privacy: false
  });
  const [canAccept, setCanAccept] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = (name: string) => {
    const newCheckboxes = {
      ...checkboxes,
      [name]: !checkboxes[name as keyof typeof checkboxes]
    };
    setCheckboxes(newCheckboxes);
    setCanAccept(Object.values(newCheckboxes).every(value => value));
  };

  const handleAccept = () => {
    navigate('/');
  };

  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen">
      <Header />
      <div className="pt-16">
        <header className="py-6 px-4 md:px-8 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Terms of Service</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Last updated April 2024</p>
          </div>
        </header>
        <main className="px-4 md:px-8 pb-8 max-w-4xl mx-auto">
          <div className="mt-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
            <div className="h-[400px] overflow-y-auto p-6 text-gray-800 dark:text-gray-200" style={{ scrollbarWidth: 'thin' }}>
              <section className="mb-6">
                <h2 className="text-lg font-semibold mb-2">1. Terms</h2>
                <p className="mb-4">By accessing or using 4Cast Platform (the "Service"), you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access the Service.</p>
              </section>
              
              <section className="mb-6">
                <h2 className="text-lg font-semibold mb-2">2. User Eligibility</h2>
                <p className="mb-4">You must be at least 18 years old or the legal age in your jurisdiction to participate. By using the Service, you represent and warrant that you meet all eligibility requirements.</p>
              </section>

              <section className="mb-6">
                <h2 className="text-lg font-semibold mb-2">3. Fair Play & Conduct</h2>
                <p className="mb-4">Users must maintain integrity and respect. Any form of cheating, collusion, or platform abuse will result in immediate account suspension.</p>
              </section>

              <section className="mb-6">
                <h2 className="text-lg font-semibold mb-2">4. Drafts & Scoring</h2>
                <p className="mb-4">All contest rules, scoring systems, and management features are outlined within the platform. We reserve the right to modify rules for fairness.</p>
              </section>

              <section className="mb-6">
                <h2 className="text-lg font-semibold mb-2">5. Privacy</h2>
                <p className="mb-4">We respect your privacy and protect your personal information. See our Privacy Policy for details on data collection and usage.</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-2">6. Liability</h2>
                <p className="mb-4">The Service is provided "as is." We are not liable for any damages or losses resulting from your use of the platform.</p>
              </section>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-800">
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={checkboxes.terms}
                    onChange={() => handleCheckboxChange('terms')}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">I have read and agree to the Terms of Service</span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={checkboxes.age}
                    onChange={() => handleCheckboxChange('age')}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">I confirm that I am at least 18 years old</span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={checkboxes.privacy}
                    onChange={() => handleCheckboxChange('privacy')}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">I agree to the Privacy Policy</span>
                </label>
              </div>

              <div className="mt-6 flex space-x-4">
                <button
                  onClick={() => navigate('/')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  disabled={!canAccept} 
                  className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                    canAccept
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-blue-400 cursor-not-allowed'
                  }`}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TermsAndConditions;
