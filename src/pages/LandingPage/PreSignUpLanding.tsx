import React from 'react'
import Header from '@/components/layout/Header'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const PreSignUpLanding = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth', { state: { redirectTo: '/commissioner-lobby' } });
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div 
        className="absolute inset-0 bg-[url('/splash.jpg')] bg-cover bg-center"
        style={{ backgroundPosition: '75% center' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-transparent"></div>
      </div>

      <div className="relative min-h-screen flex flex-col z-10">
        <Header />
        <div className="flex-1 flex items-center">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Welcome to{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                  CourtSide Queue Hub
                </span>
              </h1>
              <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-xl leading-relaxed">
                Experience the future of draft management. Our platform offers seamless 
                team organization and real-time draft coordination for serious sports enthusiasts.
              </p>
              <div className="flex gap-4 items-center">
                <Button 
                  onClick={handleGetStarted}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg rounded-lg 
                           transition-all duration-300 transform hover:scale-105 hover:shadow-lg 
                           hover:shadow-blue-500/25"
                >
                  Get Started Now
                </Button>
                <span className="text-gray-400 text-sm">
                  Join thousands of sports commissioners
                </span>
              </div>

              <div className="mt-12 flex flex-wrap gap-4">
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-blue-400">✓</span>
                  <span className="text-gray-200 ml-2">Real-time Draft Management</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-blue-400">✓</span>
                  <span className="text-gray-200 ml-2">Team Organization</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-blue-400">✓</span>
                  <span className="text-gray-200 ml-2">Live Updates</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-blue-500/10 blur-3xl rounded-full"></div>
        <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-cyan-500/10 blur-3xl rounded-full"></div>
      </div>
    </div>
  )
}

export default PreSignUpLanding
