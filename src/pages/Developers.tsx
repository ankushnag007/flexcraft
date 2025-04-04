import React, { useState } from 'react';
import logo from "../Assets/videos/images/logo.png";

import {
  Code, Key, Server, Zap, Terminal,
  Lock, Cpu, Database, Settings, ChevronDown,
  ChevronRight, Copy, Plus, Trash2, Eye,
  EyeOff, RefreshCw, Download, Upload, Check,
  X, AlertCircle, Clock, BarChart2, Link,
  Mail, MessageSquare, Users, Globe, Shield
} from 'lucide-react';

const DeveloperOptions = () => {
  const [activeTab, setActiveTab] = useState('apiKeys');
  const [apiKeys, setApiKeys] = useState([
    { id: 'key_1', name: 'Production API Key', key: 'sk_live_...wXyZ', lastUsed: '2 hours ago', created: 'May 15, 2023' },
    { id: 'key_2', name: 'Development Key', key: 'sk_test_...aBcD', lastUsed: '5 days ago', created: 'Apr 28, 2023' }
  ]);
  const [webhooks, setWebhooks] = useState([
    { id: 'wh_1', name: 'Order Notifications', url: 'https://api.yourdomain.com/webhooks/orders', status: 'active', lastTriggered: '15 minutes ago' },
    { id: 'wh_2', name: 'Customer Sync', url: 'https://api.yourdomain.com/webhooks/customers', status: 'inactive', lastTriggered: '3 days ago' }
  ]);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [showWebhookModal, setShowWebhookModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newWebhook, setNewWebhook] = useState({
    name: '',
    url: '',
    events: ['orders.create', 'orders.update']
  });
  const [showSecret, setShowSecret] = useState(false);
  const [newKey, setNewKey] = useState('');

  const generateNewKey = () => {
    const key = `sk_live_${Math.random().toString(36).substring(2, 10)}_${Math.random().toString(36).substring(2, 10)}`;
    setNewKey(key);
    return key;
  };

  const createApiKey = () => {
    const key = generateNewKey();
    setApiKeys([...apiKeys, {
      id: `key_${Date.now()}`,
      name: newKeyName,
      key: key,
      lastUsed: 'Never',
      created: new Date().toLocaleDateString()
    }]);
    setNewKeyName('');
    setShowKeyModal(false);
  };

  const createWebhook = () => {
    setWebhooks([...webhooks, {
      id: `wh_${Date.now()}`,
      name: newWebhook.name,
      url: newWebhook.url,
      status: 'active',
      lastTriggered: 'Never'
    }]);
    setNewWebhook({ name: '', url: '', events: [] });
    setShowWebhookModal(false);
  };

  const deleteApiKey = (id) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
  };

  const toggleWebhookStatus = (id) => {
    setWebhooks(webhooks.map(wh => 
      wh.id === id ? { ...wh, status: wh.status === 'active' ? 'inactive' : 'active' } : wh
    ));
  };

  const tabs = [
    { id: 'apiKeys', name: 'API Keys', icon: Key },
    { id: 'webhooks', name: 'Webhooks', icon: Zap },
    { id: 'events', name: 'Events', icon: Terminal },
    { id: 'logs', name: 'Logs', icon: Database },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const eventTypes = [
    { id: 'orders.create', name: 'Order Created', description: 'Triggered when a new order is created' },
    { id: 'orders.update', name: 'Order Updated', description: 'Triggered when an order is updated' },
    { id: 'customers.create', name: 'Customer Created', description: 'Triggered when a new customer is added' },
    { id: 'payments.success', name: 'Payment Success', description: 'Triggered when a payment is successful' },
    { id: 'invoices.generate', name: 'Invoice Generated', description: 'Triggered when an invoice is generated' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
      <div className="flex items-center gap-2">
  <img src={logo} className="h-5 w-auto" /> {/* Slightly increased height for better balance */}
  <h1 className="text-xl font-semibold whitespace-nowrap">Developer Options</h1>
</div>
     
      </div>
        <p className="text-gray-600">
          Manage your API keys, webhooks, and integration settings for FlexCraft
        </p>

      {/* Tabs */}
      <div className="border-b mb-8">
        <div className="flex overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`flex items-center px-4 py-3 ${activeTab === tab.id ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* API Keys Tab */}
      {activeTab === 'apiKeys' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">API Keys</h2>
            <button
              onClick={() => setShowKeyModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Key
            </button>
          </div>

          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Used</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {apiKeys.map(apiKey => (
                  <tr key={apiKey.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{apiKey.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <code className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                          {apiKey.key.substring(0, 10)}...
                        </code>
                        <button 
                          onClick={() => navigator.clipboard.writeText(apiKey.key)}
                          className="ml-2 text-gray-500 hover:text-blue-600"
                          title="Copy to clipboard"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {apiKey.lastUsed}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {apiKey.created}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => deleteApiKey(apiKey.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex">
              <Shield className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-800 mb-2">API Key Security</h3>
                <p className="text-blue-700 text-sm">
                  Your API keys carry many privileges. Be sure to keep them secure and avoid committing them to version control.
                  Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, etc.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Webhooks Tab */}
      {activeTab === 'webhooks' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Webhooks</h2>
            <button
              onClick={() => setShowWebhookModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Webhook
            </button>
          </div>

          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Triggered</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {webhooks.map(webhook => (
                  <tr key={webhook.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{webhook.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 font-mono truncate max-w-xs">
                        {webhook.url}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        webhook.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {webhook.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {webhook.lastTriggered}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button 
                        onClick={() => toggleWebhookStatus(webhook.id)}
                        className={`${
                          webhook.status === 'active' ? 'text-yellow-600 hover:text-yellow-900' : 'text-green-600 hover:text-green-900'
                        }`}
                      >
                        {webhook.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
              <div>
                <h3 className="font-medium text-yellow-800 mb-2">Webhook Security</h3>
                <p className="text-yellow-700 text-sm">
                  FlexCraft will send a <code className="bg-yellow-100 px-1 rounded">X-FlexCraft-Signature</code> header with each webhook request.
                  Verify this signature to ensure the request is coming from FlexCraft.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Events Tab */}
      {activeTab === 'events' && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Event Types</h2>
            <p className="text-gray-600">
              These are the events that can trigger webhooks or be subscribed to via our API.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eventTypes.map(event => (
              <div key={event.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <Zap className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium">{event.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                    <div className="mt-3">
                      <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded font-mono">
                        {event.id}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Logs Tab */}
      {activeTab === 'logs' && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">API Request Logs</h2>
            <p className="text-gray-600">
              View recent API requests made with your API keys.
            </p>
          </div>

          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button className="px-3 py-1 bg-gray-100 rounded">Last 7 days</button>
                <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">Filter</button>
              </div>
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
            </div>
            <div className="p-4 text-center text-gray-500">
              <Clock className="w-8 h-8 mx-auto mb-2" />
              <p>No recent API requests found</p>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Developer Settings</h2>
            <p className="text-gray-600">
              Configure your developer preferences and permissions.
            </p>
          </div>

          <div className="space-y-6">
            <div className="border rounded-lg p-6">
              <h3 className="font-medium mb-4">API Access</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Enable API Access</h4>
                    <p className="text-sm text-gray-600">Allow API requests to your FlexCraft account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Webhook Notifications</h4>
                    <p className="text-sm text-gray-600">Receive webhook events from FlexCraft</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="font-medium mb-4">Rate Limits</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium">API Requests</h4>
                  <p className="text-sm text-gray-600">100 requests per minute per API key</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium">Webhook Requests</h4>
                  <p className="text-sm text-gray-600">50 requests per minute per webhook</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Create New API Key</h2>
                <button 
                  onClick={() => setShowKeyModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Key Name</label>
                  <input
                    type="text"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Production Server"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Permissions</label>
                  <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Read & Write</option>
                    <option>Read Only</option>
                    <option>Write Only</option>
                  </select>
                </div>
                
                {newKey && (
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">Your New API Key</label>
                      <button 
                        onClick={() => navigator.clipboard.writeText(newKey)}
                        className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                      >
                        <Copy className="w-4 h-4 mr-1" /> Copy
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showSecret ? "text" : "password"}
                        value={newKey}
                        readOnly
                        className="w-full px-3 py-2 pr-10 border rounded-lg bg-gray-100 font-mono"
                      />
                      <button 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowSecret(!showSecret)}
                      >
                        {showSecret ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    <p className="text-xs text-red-600 mt-2">
                      This is the only time you'll see this key. Be sure to copy it now.
                    </p>
                  </div>
                )}
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button 
                    onClick={() => setShowKeyModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={createApiKey}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {newKey ? 'Done' : 'Create Key'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Webhook Modal */}
      {showWebhookModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Create New Webhook</h2>
                <button 
                  onClick={() => setShowWebhookModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Webhook Name</label>
                  <input
                    type="text"
                    value={newWebhook.name}
                    onChange={(e) => setNewWebhook({...newWebhook, name: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Order Notifications"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payload URL</label>
                  <input
                    type="url"
                    value={newWebhook.url}
                    onChange={(e) => setNewWebhook({...newWebhook, url: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://api.yourdomain.com/webhooks"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Events to Listen For</label>
                  <div className="space-y-2">
                    {eventTypes.map(event => (
                      <div key={event.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={event.id}
                          checked={newWebhook.events.includes(event.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewWebhook({...newWebhook, events: [...newWebhook.events, event.id]});
                            } else {
                              setNewWebhook({...newWebhook, events: newWebhook.events.filter(id => id !== event.id)});
                            }
                          }}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={event.id} className="ml-2 block text-sm text-gray-700">
                          {event.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button 
                    onClick={() => setShowWebhookModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={createWebhook}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Create Webhook
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeveloperOptions;