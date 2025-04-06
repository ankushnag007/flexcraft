import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Terminal, 
  MessageSquare, 
  Github,
  UploadCloudIcon, 
  Blocks, 
  Settings, 
  Figma, 
  MailCheckIcon,Workflow,
  File
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
    { path: '/workflow-automation', icon: Workflow, label: 'workflow-automation' },
    { path: '/developers-docs', icon: File, label: 'developers-docs' },

  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10 w-full">
      <div className="w-full px-4">
        <div className="flex items-center justify-between h-16 w-full">
          {/* Left-aligned navigation items */}
          <div className="flex items-center overflow-hidden whitespace-nowrap">
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
          
          {/* Right-aligned elements (empty for now) */}
          <div className="flex items-center">
            {/* Placeholder for user dropdown, notification button, etc. */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;