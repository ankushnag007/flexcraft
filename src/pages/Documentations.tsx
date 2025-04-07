import { useState } from 'react';
import { BookOpen, Code, FileText, Video, Play, ChevronDown, ChevronRight, Search, ChevronLeft } from 'lucide-react';

const DocumentationPage = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'getting-started': true,
    'api-reference': false,
    tutorials: false,
  });
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const documentationSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <Play className="h-4 w-4 mr-2" />,
      items: [
        { id: 'introduction', title: 'Introduction' },
        { id: 'installation', title: 'Installation' },
        { id: 'configuration', title: 'Configuration' },
        { id: 'first-steps', title: 'First Steps' }
      ]
    },
    {
      id: 'api-reference',
      title: 'API Reference',
      icon: <Code className="h-4 w-4 mr-2" />,
      items: [
        { id: 'authentication', title: 'Authentication' },
        { id: 'users', title: 'Users API' },
        { id: 'projects', title: 'Projects API' },
        { id: 'webhooks', title: 'Webhooks' }
      ]
    },
    {
      id: 'tutorials',
      title: 'Tutorials',
      icon: <Video className="h-4 w-4 mr-2" />,
      items: [
        { id: 'user-management', title: 'User Management' },
        { id: 'data-import', title: 'Data Import' },
        { id: 'custom-integration', title: 'Custom Integration' },
        { id: 'troubleshooting', title: 'Troubleshooting' }
      ]
    }
  ];

  const popularArticles = [
    { title: 'Setting Up Your First Project', id: 'first-project' },
    { title: 'API Rate Limits Explained', id: 'rate-limits' },
    { title: 'Migrating from v1 to v2', id: 'migration' },
    { title: 'Common Error Codes', id: 'errors' }
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      {/* Sidebar Navigation */}
      <div className="w-full lg:w-64 border-r border-gray-200 bg-gray-50 p-4 lg:p-6">
        <div className="flex items-center mb-6">
          <BookOpen className="h-6 w-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">Documentation</h2>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search docs..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Documentation Sections */}
        <nav className="space-y-2">
          {documentationSections.map((section) => (
            <div key={section.id}>
              <button
                onClick={() => toggleSection(section.id)}
                className="flex items-center w-full text-left py-2 px-2 rounded-md hover:bg-gray-100 text-gray-700 font-medium"
              >
                {section.icon}
                <span className="flex-1">{section.title}</span>
                {expandedSections[section.id] ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              {expandedSections[section.id] && (
                <div className="ml-6 mt-1 space-y-1">
                  {section.items.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block py-1.5 px-2 text-sm rounded-md hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Popular Articles */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Popular Articles</h3>
          <div className="space-y-2">
            {popularArticles.map((article) => (
              <a
                key={article.id}
                href={`#${article.id}`}
                className="block text-sm py-1.5 px-2 rounded-md hover:bg-gray-100 text-blue-600 hover:text-blue-800"
              >
                {article.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 lg:p-10">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <a href="#" className="hover:text-gray-700">Documentation</a>
          <ChevronRight className="h-4 w-4 mx-2" />
          <a href="#" className="hover:text-gray-700">Getting Started</a>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-700">Introduction</span>
        </div>

        {/* Article Content */}
        <article className="prose max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Introduction</h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Welcome to our product documentation. This guide will help you get started with our platform and make the most of its features.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Before you start</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>Make sure you have administrator access to your account to complete the setup process.</p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Key Concepts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-2">Projects</h3>
              <p className="text-gray-600">Organize your work into projects that contain all related resources.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-2">Teams</h3>
              <p className="text-gray-600">Collaborate with team members by assigning roles and permissions.</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Getting Help</h2>
          <p className="text-gray-600 mb-4">
            If you encounter any issues or have questions, we're here to help:
          </p>
          <ul className="text-gray-600 mb-8">
            <li className="mb-2">Check our <a href="#" className="text-blue-600 hover:underline">FAQ section</a></li>
            <li className="mb-2">Join our <a href="#" className="text-blue-600 hover:underline">community forum</a></li>
            <li>Contact <a href="#" className="text-blue-600 hover:underline">support@yourproduct.com</a></li>
          </ul>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex justify-between">
              <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                <ChevronLeft className="h-5 w-5 mr-1" />
                Previous: Overview
              </a>
              <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                Next: Installation
                <ChevronRight className="h-5 w-5 ml-1" />
              </a>
            </div>
          </div>
        </article>

        {/* Feedback Section */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Was this page helpful?</h3>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
              Yes
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;