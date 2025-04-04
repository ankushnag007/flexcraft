import React, { useState } from 'react';
import { 
  Plus, Calendar, Users, CheckSquare, MoreVertical, Search, Filter, 
  ChevronDown, ArrowUpDown, List, LayoutGrid, Settings, Bell, HelpCircle,
  BarChart2, Flag, Tag, Paperclip, Clock, AlertCircle, GitPullRequest
} from 'lucide-react';
import  logo from  '../Assets/videos/images/logo.png';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'backlog' | 'todo' | 'in-progress' | 'review' | 'done';
  assignee: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  type: 'task' | 'bug' | 'story' | 'epic';
  labels?: string[];
  attachments?: number;
  comments?: number;
  storyPoints?: number;
}

const JiraLikeProjectManagement = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Design System Implementation',
      description: 'Create a unified design system for all components',
      status: 'in-progress',
      assignee: 'John Doe',
      dueDate: '2024-03-20',
      priority: 'high',
      type: 'story',
      labels: ['design', 'ui'],
      attachments: 3,
      comments: 5,
      storyPoints: 5
    },
    {
      id: '2',
      title: 'API Integration',
      description: 'Integrate with the new payment gateway API',
      status: 'todo',
      assignee: 'Jane Smith',
      dueDate: '2024-03-25',
      priority: 'medium',
      type: 'task',
      labels: ['backend', 'api'],
      attachments: 1,
      comments: 2,
      storyPoints: 3
    },
    {
      id: '3',
      title: 'Fix login page bug',
      description: 'Users unable to login with Safari browser',
      status: 'review',
      assignee: 'Mike Johnson',
      dueDate: '2024-03-18',
      priority: 'critical',
      type: 'bug',
      labels: ['frontend', 'urgent'],
      attachments: 0,
      comments: 7
    },
    {
      id: '4',
      title: 'Database optimization',
      description: 'Optimize queries for better performance',
      status: 'backlog',
      assignee: 'Sarah Williams',
      dueDate: '2024-04-01',
      priority: 'medium',
      type: 'task',
      labels: ['database'],
      storyPoints: 8
    },
    {
      id: '5',
      title: 'User profile page redesign',
      description: 'Redesign according to new brand guidelines',
      status: 'done',
      assignee: 'John Doe',
      dueDate: '2024-03-15',
      priority: 'low',
      type: 'story',
      labels: ['design', 'frontend'],
      storyPoints: 5
    },
    {
      id: '6',
      title: 'Mobile app performance',
      description: 'Improve loading times on mobile devices',
      status: 'in-progress',
      assignee: 'Alex Chen',
      dueDate: '2024-03-22',
      priority: 'high',
      type: 'epic',
      labels: ['mobile', 'performance'],
      storyPoints: 13
    }
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskType, setNewTaskType] = useState<'task' | 'bug' | 'story' | 'epic'>('task');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'board'>('board');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: newTaskDescription,
      status: 'backlog',
      assignee: 'Unassigned',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      priority: newTaskPriority,
      type: newTaskType,
      labels: [],
      attachments: 0,
      comments: 0
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setNewTaskDescription('');
    setIsCreatingTask(false);
  };

  const moveTask = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'critical': return 'bg-red-600 text-white';
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: Task['type']) => {
    switch (type) {
      case 'bug': return 'bg-red-500';
      case 'story': return 'bg-blue-500';
      case 'task': return 'bg-green-500';
      case 'epic': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const openTaskDetails = (task: Task) => {
    setSelectedTask(task);
  };

  const closeTaskDetails = () => {
    setSelectedTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
  <img src={logo} className="h-6 w-auto" /> {/* Adjusted height and width */}
              
              <nav className="flex space-x-1">
                <button className="flex items-center px-3 py-2 rounded-md text-sm font-medium bg-blue-50 text-blue-600">
                  <List className="w-4 h-4 mr-2" />
                  Projects
                </button>
                <button className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  <BarChart2 className="w-4 h-4 mr-2" />
                  Dashboards
                </button>
                <button className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  <Flag className="w-4 h-4 mr-2" />
                  Reports
                </button>
                <button className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  <GitPullRequest className="w-4 h-4 mr-2" />
                  Issues
                </button>
              </nav>
            </div>
            
            <div className="ml-4 flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                <HelpCircle className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Project Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">Website Redesign</h1>
              <ChevronDown className="w-5 h-5 ml-2 text-gray-500" />
            </div>
            <div className="flex items-center mt-2 space-x-4">
              <span className="text-sm text-gray-600">Project Key: WEB</span>
              <span className="text-sm text-gray-600">Lead: John Doe</span>
              <span className="text-sm text-gray-600">Version: 2.0</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
            <button 
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => setIsCreatingTask(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create
            </button>
          </div>
        </div>

        {/* View Options */}
        <div className="flex items-center justify-between mb-6 bg-white p-3 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-4">
            <button 
              className={`flex items-center px-3 py-1 rounded ${viewMode === 'board' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setViewMode('board')}
            >
              <LayoutGrid className="w-4 h-4 mr-2" />
              Board
            </button>
            <button 
              className={`flex items-center px-3 py-1 rounded ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4 mr-2" />
              List
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Sort
            </button>
          </div>
        </div>

        {/* Task Creation Modal */}
        {isCreatingTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-medium mb-4">Create New Task</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                  <input
                    type="text"
                    placeholder="Task title"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    autoFocus
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    placeholder="Task description"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newTaskType}
                      onChange={(e) => setNewTaskType(e.target.value as any)}
                    >
                      <option value="task">Task</option>
                      <option value="bug">Bug</option>
                      <option value="story">Story</option>
                      <option value="epic">Epic</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newTaskPriority}
                      onChange={(e) => setNewTaskPriority(e.target.value as any)}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                  onClick={() => setIsCreatingTask(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={handleAddTask}
                >
                  Create Task
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Task Detail Modal */}
        {selectedTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className={`inline-block w-3 h-3 rounded-full ${getTypeColor(selectedTask.type)} mr-2`}></span>
                  <span className="text-lg font-bold">{selectedTask.title}</span>
                </div>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={closeTaskDetails}
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
                    <p className="text-gray-800">{selectedTask.description || 'No description provided'}</p>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Activity</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-gray-300 mr-3"></div>
                        <div>
                          <p className="text-sm font-medium">John Doe</p>
                          <p className="text-sm text-gray-500">Updated the status to In Progress</p>
                          <p className="text-xs text-gray-400">2 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <span className="text-gray-500 w-24">Status:</span>
                        <span className="font-medium">{selectedTask.status}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-500 w-24">Assignee:</span>
                        <span className="font-medium">{selectedTask.assignee}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-500 w-24">Priority:</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(selectedTask.priority)}`}>
                          {selectedTask.priority}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-500 w-24">Due Date:</span>
                        <span className="font-medium">{selectedTask.dueDate}</span>
                      </div>
                      {selectedTask.storyPoints && (
                        <div className="flex items-center">
                          <span className="text-gray-500 w-24">Story Points:</span>
                          <span className="font-medium">{selectedTask.storyPoints}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Labels</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTask.labels?.map(label => (
                        <span key={label} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {label}
                        </span>
                      ))}
                      {(!selectedTask.labels || selectedTask.labels.length === 0) && (
                        <span className="text-gray-400 text-sm">No labels</span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Attachments</h3>
                    {selectedTask.attachments ? (
                      <div className="flex items-center text-sm text-gray-600">
                        <Paperclip className="w-4 h-4 mr-2" />
                        <span>{selectedTask.attachments} files attached</span>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">No attachments</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Board View */}
        {viewMode === 'board' && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Backlog Column */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-gray-700">Backlog</h2>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">{filteredTasks.filter(t => t.status === 'backlog').length}</span>
                  <Plus className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                </div>
              </div>
              {filteredTasks
                .filter(task => task.status === 'backlog')
                .map(task => (
                  <div 
                    key={task.id} 
                    className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 mb-3 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => openTaskDetails(task)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-800">{task.title}</h3>
                      <MoreVertical className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                    </div>
                    <div className="flex items-center mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      <span className={`w-3 h-3 rounded-full ${getTypeColor(task.type)} ml-2`}></span>
                      {task.storyPoints && (
                        <span className="ml-2 text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                          {task.storyPoints} pts
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        <span>{task.assignee}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Other columns (To Do, In Progress, Review, Done) would follow similar structure */}
            {/* To Do Column */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-gray-700">To Do</h2>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">{filteredTasks.filter(t => t.status === 'todo').length}</span>
                  <Plus className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                </div>
              </div>
              {filteredTasks
                .filter(task => task.status === 'todo')
                .map(task => (
                  <div 
                    key={task.id} 
                    className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 mb-3 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => openTaskDetails(task)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-800">{task.title}</h3>
                      <MoreVertical className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                    </div>
                    <div className="flex items-center mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      <span className={`w-3 h-3 rounded-full ${getTypeColor(task.type)} ml-2`}></span>
                      {task.storyPoints && (
                        <span className="ml-2 text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                          {task.storyPoints} pts
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        <span>{task.assignee}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* In Progress Column */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-gray-700">In Progress</h2>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">{filteredTasks.filter(t => t.status === 'in-progress').length}</span>
                  <Plus className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                </div>
              </div>
              {filteredTasks
                .filter(task => task.status === 'in-progress')
                .map(task => (
                  <div 
                    key={task.id} 
                    className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 mb-3 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => openTaskDetails(task)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-800">{task.title}</h3>
                      <MoreVertical className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                    </div>
                    <div className="flex items-center mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      <span className={`w-3 h-3 rounded-full ${getTypeColor(task.type)} ml-2`}></span>
                      {task.storyPoints && (
                        <span className="ml-2 text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                          {task.storyPoints} pts
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        <span>{task.assignee}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Review Column */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-gray-700">Review</h2>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">{filteredTasks.filter(t => t.status === 'review').length}</span>
                  <Plus className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                </div>
              </div>
              {filteredTasks
                .filter(task => task.status === 'review')
                .map(task => (
                  <div 
                    key={task.id} 
                    className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 mb-3 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => openTaskDetails(task)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-800">{task.title}</h3>
                      <MoreVertical className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                    </div>
                    <div className="flex items-center mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      <span className={`w-3 h-3 rounded-full ${getTypeColor(task.type)} ml-2`}></span>
                      {task.storyPoints && (
                        <span className="ml-2 text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                          {task.storyPoints} pts
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        <span>{task.assignee}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Done Column */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-gray-700">Done</h2>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">{filteredTasks.filter(t => t.status === 'done').length}</span>
                  <Plus className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                </div>
              </div>
              {filteredTasks
                .filter(task => task.status === 'done')
                .map(task => (
                  <div 
                    key={task.id} 
                    className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 mb-3 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => openTaskDetails(task)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-800 line-through">{task.title}</h3>
                      <MoreVertical className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                    </div>
                    <div className="flex items-center mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      <span className={`w-3 h-3 rounded-full ${getTypeColor(task.type)} ml-2`}></span>
                      {task.storyPoints && (
                        <span className="ml-2 text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                          {task.storyPoints} pts
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        <span>{task.assignee}</span>
                      </div>
                      <div className="flex items-center">
                        <CheckSquare className="w-3 h-3 text-green-500" />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assignee
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTasks.map((task) => (
                  <tr 
                    key={task.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => openTaskDetails(task)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`w-3 h-3 rounded-full ${getTypeColor(task.type)} mr-3`}></span>
                        <div>
                          <div className="font-medium text-gray-900">{task.title}</div>
                          <div className="text-sm text-gray-500">{task.description?.substring(0, 50)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {task.assignee}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {task.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {task.type}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default JiraLikeProjectManagement;