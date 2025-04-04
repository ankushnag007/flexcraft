import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Homepage from './pages/Homepage';
import ProjectManagement from './pages/ProjectManagement';
import ApiTesting from './pages/ApiTesting';
import Chat from './pages/Chat';
import GitHubIntegration from './pages/GitHubIntegration';
import ProjectDeployment from './pages/ProjectDeployment';
import Integrations from './pages/Integrations';
import Developers from './pages/Developers';
import Dashboard from './pages/Dashboard';
import EmailApp from './pages/Email';
import Figma from './pages/Figma'
function App() {
  const isAuthenticated = true; // Replace with your actual auth logic

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <main className="flex-1 overflow-x-hidden">
        {isAuthenticated && <Sidebar />}
          <Routes>
            {!isAuthenticated ? (
              <>
                <Route path="/" element={<Homepage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            ) : (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/email" element={<EmailApp
 />} />

                <Route path="/projects" element={<ProjectManagement />} />
                <Route path="/api-testing" element={<ApiTesting />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/github" element={<GitHubIntegration />} />
                <Route path="/deployment" element={<ProjectDeployment />} />
                <Route path="/figma" element={<Figma />} />
                <Route path="/integrations" element={<Integrations />} />
                <Route path="/developers-options" element={<Developers />} />
                <Route path="/" element={<Navigate to="/projects" replace />} />
                <Route path="*" element={<Navigate to="/projects" replace />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;