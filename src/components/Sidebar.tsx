import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Terminal, 
  MessageSquare, 
  Github,
  UploadCloudIcon , Blocks, Settings,Figma, MailCheckIcon
} from 'lucide-react';

const Header = () => {
  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/projects', icon: FolderKanban, label: 'Projects' },
    { path: '/email', icon: MailCheckIcon, label: 'Emails' },

    { path: '/api-testing', icon: Terminal, label: 'API Testing' },
    { path: '/chat', icon: MessageSquare, label: 'Chat' },
    { path: '/github', icon: Github, label: 'GitHub' },
    { path: '/figma', icon: Figma, label: 'Figma' },

    { path: '/deployment', icon: UploadCloudIcon, label: 'Deployment' },
    { path: '/integrations', icon: Blocks, label: 'Integrations' },
    { path: '/developers-options', icon: Settings, label: 'Developers-options' },


  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* <h1 className="text-xl font-bold text-gray-900 mr-10">Enterprise Suite</h1> */}
            
            <nav className="flex space-x-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
          
          {/* Optional: Add user profile or other header elements here */}
          <div className="ml-4 flex items-center">
            {/* Placeholder for user dropdown or other header elements */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;