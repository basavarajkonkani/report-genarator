import { BellIcon, CodeBracketIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // This is just a UI enhancement - in a real app, this would toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-600 text-white p-2 rounded-lg">
              <CodeBracketIcon className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">GitHub Daily Report</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">WhatsApp Bot by Nighan2 Labs</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? 
                <SunIcon className="h-5 w-5 text-yellow-400" /> : 
                <MoonIcon className="h-5 w-5 text-gray-600" />
              }
            </button>
            
            <button className="btn-secondary flex items-center space-x-1 rounded-full px-4">
              <BellIcon className="h-5 w-5" />
              <span>Notifications</span>
            </button>
            
            <div className="relative group">
              <img 
                src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff" 
                alt="User" 
                className="h-10 w-10 rounded-full border-2 border-primary-500 cursor-pointer transition-transform hover:scale-105"
              />
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Your Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Settings</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Sign out</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}