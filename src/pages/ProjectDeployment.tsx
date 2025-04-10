import { useState } from 'react';
import logo from "../Assets/videos/images/logo.png";

import {
  Settings,
  GitBranch,
  Globe,
  Lock,
  Server,
  CreditCard,
  Clock,
  UploadCloud,
  GitPullRequest,
  Cpu,
  Zap
} from 'lucide-react';

const VercelDeploymentUI = () => {
  const [selectedTab, setSelectedTab] = useState('deployment');
  const [framework, setFramework] = useState('nextjs');
  const [branch, setBranch] = useState('main');
  const [autoDeploy, setAutoDeploy] = useState(true);
  const [previewDeploy, setPreviewDeploy] = useState(true);
  const [serverless, setServerless] = useState(true);
  const [edgeFunctions, setEdgeFunctions] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
  <h1 className="text-xl font-semibold whitespace-nowrap">Project Deployment Settings</h1>
</div>
        <div className="project-selector">
          <select className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>my-nextjs-app</option>
            <option>my-react-app</option>
            <option>my-astro-site</option>
          </select>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row">
        {/* Sidebar Navigation */}
        <nav className="bg-white border-r border-gray-200 w-full md:w-56 p-4">
          <div className="space-y-1">
            <button
              className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${selectedTab === 'deployment' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
              onClick={() => setSelectedTab('deployment')}
            >
              <UploadCloud className="w-4 h-4 mr-2" />
              Deployment
            </button>
            <button
              className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${selectedTab === 'domains' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
              onClick={() => setSelectedTab('domains')}
            >
              <Globe className="w-4 h-4 mr-2" />
              Domains
            </button>
            <button
              className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${selectedTab === 'security' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
              onClick={() => setSelectedTab('security')}
            >
              <Lock className="w-4 h-4 mr-2" />
              Security
            </button>
            <button
              className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${selectedTab === 'functions' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
              onClick={() => setSelectedTab('functions')}
            >
              <Server className="w-4 h-4 mr-2" />
              Functions
            </button>
            <button
              className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${selectedTab === 'billing' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
              onClick={() => setSelectedTab('billing')}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Billing
            </button>
          </div>
        </nav>

        {/* Settings Panel */}
        <div className="flex-1 p-6">
          {selectedTab === 'deployment' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium flex items-center mb-6">
                <UploadCloud className="w-5 h-5 mr-2 text-blue-600" />
                Deployment Configuration
              </h2>
              
              {/* Git Integration */}
              <div className="mb-8">
                <h3 className="text-md font-medium mb-4">Git Integration</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Connected Repository</label>
                    <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">GitHub</span>
                        <span className="text-gray-600">username/my-nextjs-app</span>
                      </div>
                      <button className="text-sm text-blue-600 hover:text-blue-800">Change</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Build Settings */}
              <div className="mb-8">
                <h3 className="text-md font-medium mb-4">Build Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Framework Preset</label>
                    <select 
                      className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={framework} 
                      onChange={(e) => setFramework(e.target.value)}
                    >
                      <option value="nextjs">Next.js</option>
                      <option value="react">React</option>
                      <option value="vue">Vue.js</option>
                      <option value="astro">Astro</option>
                      <option value="svelte">Svelte</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Build Command</label>
                    <input
                      type="text"
                      className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                      value={framework === 'nextjs' ? 'next build' : 'npm run build'}
                      disabled={framework !== 'custom'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Output Directory</label>
                    <input
                      type="text"
                      className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                      value={framework === 'nextjs' ? '.next' : 'out'}
                      disabled={framework !== 'custom'}
                    />
                  </div>
                </div>
              </div>

              {/* Deployment Triggers */}
              <div className="mb-8">
                <h3 className="text-md font-medium mb-4">Deployment Triggers</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="auto-deploy"
                      checked={autoDeploy}
                      onChange={(e) => setAutoDeploy(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="auto-deploy" className="ml-2 block text-sm text-gray-700 flex items-center">
                      <GitBranch className="w-4 h-4 mr-1" />
                      Automatic Deployments on Git Push
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="preview-deploy"
                      checked={previewDeploy}
                      onChange={(e) => setPreviewDeploy(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="preview-deploy" className="ml-2 block text-sm text-gray-700 flex items-center">
                      <GitPullRequest className="w-4 h-4 mr-1" />
                      Create Preview Deployments for Pull Requests
                    </label>
                  </div>
                </div>
              </div>

              {/* Branch Settings */}
              <div className="mb-8">
                <h3 className="text-md font-medium mb-4">Branch Settings</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Production Branch</label>
                  <select
                    className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                  >
                    <option value="main">main</option>
                    <option value="master">master</option>
                    <option value="production">production</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Save Changes
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 text-sm font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Deploy Manually
                </button>
              </div>
            </div>
          )}

          {selectedTab === 'functions' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium flex items-center mb-6">
                <Server className="w-5 h-5 mr-2 text-blue-600" />
                Serverless Functions Configuration
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="serverless"
                    checked={serverless}
                    onChange={(e) => setServerless(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="serverless" className="ml-2 block text-sm text-gray-700 flex items-center">
                    <Cpu className="w-4 h-4 mr-1" />
                    Enable Serverless Functions
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="edge-functions"
                    checked={edgeFunctions}
                    onChange={(e) => setEdgeFunctions(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="edge-functions" className="ml-2 block text-sm text-gray-700 flex items-center">
                    <Zap className="w-4 h-4 mr-1" />
                    Enable Edge Functions (Beta)
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Function Regions</label>
                  <select
                    className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue="auto"
                  >
                    <option value="auto">Automatic (Recommended)</option>
                    <option value="iad1">Washington, D.C., USA</option>
                    <option value="sfo1">San Francisco, USA</option>
                    <option value="ams1">Amsterdam, NL</option>
                    <option value="sin1">Singapore</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Execution Duration</label>
                  <select
                    className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue="10"
                  >
                    <option value="5">5 seconds</option>
                    <option value="10">10 seconds</option>
                    <option value="15">15 seconds</option>
                    <option value="30">30 seconds</option>
                  </select>
                </div>

                <div>
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Save Function Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-white border-t border-gray-200 px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500">
        <div className="flex items-center mb-2 sm:mb-0">
          <Clock className="w-4 h-4 mr-2" />
          <span>Last Deployed: 2 hours ago</span>
        </div>
        <div className="flex items-center mb-2 sm:mb-0">
          <GitBranch className="w-4 h-4 mr-2" />
          <span>Production: main@a1b2c3d</span>
        </div>
        <div className="flex items-center">
          <Globe className="w-4 h-4 mr-2" />
          <span>my-nextjs-app.vercel.app</span>
        </div>
      </div>
    </div>
  );
};

export default VercelDeploymentUI;