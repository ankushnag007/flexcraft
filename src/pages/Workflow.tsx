import React, { useState } from 'react';
import { 
  Zap, 
  Plus, 
  Settings, 
  ChevronDown, 
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Pause,
  Play,
  Trash2,
  Edit2,
  Copy,
  Search
} from 'lucide-react';

type WorkflowStatus = 'active' | 'paused' | 'error' | 'draft';
type TriggerType = 'schedule' | 'webhook' | 'manual' | 'event';

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: WorkflowStatus;
  lastRun: string | null;
  nextRun: string | null;
  trigger: TriggerType;
  steps: number;
  createdAt: string;
}

const WorkflowAutomation: React.FC = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: '1',
      name: 'Data Backup',
      description: 'Daily database backup to cloud storage',
      status: 'active',
      lastRun: '2023-05-15T08:30:00',
      nextRun: '2023-05-16T08:30:00',
      trigger: 'schedule',
      steps: 3,
      createdAt: '2023-04-10'
    },
    {
      id: '2',
      name: 'Email Notification',
      description: 'Send weekly report emails to team',
      status: 'paused',
      lastRun: '2023-05-08T09:00:00',
      nextRun: null,
      trigger: 'schedule',
      steps: 2,
      createdAt: '2023-03-22'
    },
    {
      id: '3',
      name: 'User Onboarding',
      description: 'Automated steps for new user signup',
      status: 'active',
      lastRun: '2023-05-15T14:22:00',
      nextRun: null,
      trigger: 'event',
      steps: 5,
      createdAt: '2023-05-01'
    },
    {
      id: '4',
      name: 'API Sync',
      description: 'Sync data with external API',
      status: 'error',
      lastRun: '2023-05-14T23:15:00',
      nextRun: '2023-05-15T23:15:00',
      trigger: 'schedule',
      steps: 4,
      createdAt: '2023-02-18'
    }
  ]);

  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<WorkflowStatus | 'all'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         workflow.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || workflow.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleWorkflow = (id: string) => {
    setSelectedWorkflow(selectedWorkflow === id ? null : id);
  };

  const toggleWorkflowStatus = (id: string) => {
    setWorkflows(workflows.map(workflow => {
      if (workflow.id === id) {
        return {
          ...workflow,
          status: workflow.status === 'active' ? 'paused' : 'active'
        };
      }
      return workflow;
    }));
  };

  const deleteWorkflow = (id: string) => {
    setWorkflows(workflows.filter(workflow => workflow.id !== id));
  };

  const getStatusIcon = (status: WorkflowStatus) => {
    switch (status) {
      case 'active': return <Play className="w-4 h-4 text-green-500" />;
      case 'paused': return <Pause className="w-4 h-4 text-yellow-500" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'draft': return <Edit2 className="w-4 h-4 text-gray-500" />;
      default: return null;
    }
  };

  const getTriggerIcon = (trigger: TriggerType) => {
    switch (trigger) {
      case 'schedule': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'webhook': return <Zap className="w-4 h-4 text-purple-500" />;
      case 'manual': return <CheckCircle className="w-4 h-4 text-orange-500" />;
      case 'event': return <AlertCircle className="w-4 h-4 text-green-500" />;
      default: return null;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <Zap className="mr-2 text-yellow-500" /> Workflow Automation
          </h1>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="mr-2 w-4 h-4" /> Create Workflow
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search workflows..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <label htmlFor="status-filter" className="mr-2 text-sm text-gray-600">Status:</label>
                <select
                  id="status-filter"
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as WorkflowStatus | 'all')}
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="error">Error</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Workflows List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredWorkflows.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No workflows found. Create your first workflow to get started.
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {filteredWorkflows.map((workflow) => (
                <li key={workflow.id} className="hover:bg-gray-50 transition-colors">
                  <div 
                    className="flex items-center justify-between p-4 cursor-pointer"
                    onClick={() => toggleWorkflow(workflow.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-full bg-blue-50">
                        <Zap className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{workflow.name}</h3>
                        <p className="text-sm text-gray-500">{workflow.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center">
                        {getStatusIcon(workflow.status)}
                        <span className="ml-2 text-sm capitalize">{workflow.status}</span>
                      </div>
                      <div className="flex items-center">
                        {getTriggerIcon(workflow.trigger)}
                        <span className="ml-2 text-sm capitalize">{workflow.trigger}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {workflow.steps} {workflow.steps === 1 ? 'step' : 'steps'}
                      </div>
                      {selectedWorkflow === workflow.id ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                  
                  {/* Expanded Workflow Details */}
                  {selectedWorkflow === workflow.id && (
                    <div className="px-4 pb-4 pt-2 bg-gray-50 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                        <div className="bg-white p-4 rounded-md shadow-sm">
                          <h4 className="font-medium text-gray-700 mb-2">Last Run</h4>
                          <p className="text-gray-600">
                            {workflow.lastRun ? new Date(workflow.lastRun).toLocaleString() : 'Never'}
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-md shadow-sm">
                          <h4 className="font-medium text-gray-700 mb-2">Next Run</h4>
                          <p className="text-gray-600">
                            {workflow.nextRun ? new Date(workflow.nextRun).toLocaleString() : 'Not scheduled'}
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-md shadow-sm">
                          <h4 className="font-medium text-gray-700 mb-2">Created</h4>
                          <p className="text-gray-600">
                            {new Date(workflow.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-3">
                        <button 
                          onClick={() => toggleWorkflowStatus(workflow.id)}
                          className={`px-3 py-1 rounded-md text-sm flex items-center ${
                            workflow.status === 'active' 
                              ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
                              : 'bg-green-100 text-green-800 hover:bg-green-200'
                          }`}
                        >
                          {workflow.status === 'active' ? (
                            <>
                              <Pause className="w-4 h-4 mr-1" /> Pause
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-1" /> Activate
                            </>
                          )}
                        </button>
                        <button className="px-3 py-1 rounded-md text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 flex items-center">
                          <Edit2 className="w-4 h-4 mr-1" /> Edit
                        </button>
                        <button className="px-3 py-1 rounded-md text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 flex items-center">
                          <Copy className="w-4 h-4 mr-1" /> Duplicate
                        </button>
                        <button 
                          onClick={() => deleteWorkflow(workflow.id)}
                          className="px-3 py-1 rounded-md text-sm bg-red-100 text-red-800 hover:bg-red-200 flex items-center"
                        >
                          <Trash2 className="w-4 h-4 mr-1" /> Delete
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Create Workflow Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="flex justify-between items-center border-b border-gray-200 p-4">
              <h2 className="text-xl font-semibold text-gray-800">Create New Workflow</h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <form>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Workflow Name</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Data Backup"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Describe what this workflow does"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trigger Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select trigger type</option>
                    <option value="schedule">Schedule</option>
                    <option value="webhook">Webhook</option>
                    <option value="manual">Manual</option>
                    <option value="event">Event</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button 
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Create Workflow
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowAutomation;