import React, { useState } from "react";
import logo from "../Assets/videos/images/logo.png";
import {
  GitBranch,
  GitPullRequest,
  GitCommit,
  MessageSquare,
  Star,
  Eye,
  Code,
  AlertCircle,
  CheckCircle,
  Clock,
  GitMerge,
  Settings,
  RefreshCw,
  Plus,
  Filter,
  Search,
} from "lucide-react";

interface Repository {
  id: string;
  name: string;
  description: string;
  stars: number;
  forks: number;
  watchers: number;
  lastUpdated: string;
  language: string;
  openIssues: number;
  isPrivate: boolean;
}

interface PullRequest {
  id: string;
  title: string;
  author: string;
  status: "open" | "merged" | "closed" | "draft";
  updatedAt: string;
  comments: number;
  commits: number;
  checks?: {
    status: "success" | "failure" | "pending";
    count: number;
  };
}

interface Issue {
  id: string;
  title: string;
  author: string;
  status: "open" | "closed";
  labels: string[];
  updatedAt: string;
  comments: number;
}

const GitHubIntegration = () => {
  const [activeTab, setActiveTab] = useState<
    "repos" | "prs" | "issues" | "actions"
  >("repos");
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  const [repositories] = useState<Repository[]>([
    {
      id: "1",
      name: "enterprise-saas",
      description: "Enterprise SaaS Platform with AI capabilities",
      stars: 25,
      forks: 12,
      watchers: 8,
      lastUpdated: "2024-03-15",
      language: "TypeScript",
      openIssues: 3,
      isPrivate: false,
    },
    {
      id: "2",
      name: "mobile-app",
      description: "React Native mobile application",
      stars: 15,
      forks: 5,
      watchers: 4,
      lastUpdated: "2024-03-10",
      language: "JavaScript",
      openIssues: 2,
      isPrivate: true,
    },
  ]);

  const [pullRequests] = useState<PullRequest[]>([
    {
      id: "1",
      title: "Add authentication system",
      author: "johndoe",
      status: "open",
      updatedAt: "2024-03-15",
      comments: 4,
      commits: 3,
      checks: {
        status: "success",
        count: 5,
      },
    },
    {
      id: "2",
      title: "Implement chat feature",
      author: "janesmith",
      status: "merged",
      updatedAt: "2024-03-14",
      comments: 12,
      commits: 8,
    },
    {
      id: "3",
      title: "Update documentation",
      author: "alexjohnson",
      status: "draft",
      updatedAt: "2024-03-16",
      comments: 0,
      commits: 1,
    },
  ]);

  const [issues] = useState<Issue[]>([
    {
      id: "1",
      title: "Fix login page responsive issues",
      author: "design-team",
      status: "open",
      labels: ["bug", "frontend"],
      updatedAt: "2024-03-12",
      comments: 3,
    },
    {
      id: "2",
      title: "Add dark mode support",
      author: "ux-team",
      status: "open",
      labels: ["enhancement"],
      updatedAt: "2024-03-10",
      comments: 8,
    },
    {
      id: "3",
      title: "API timeout under heavy load",
      author: "devops",
      status: "closed",
      labels: ["bug", "backend"],
      updatedAt: "2024-03-05",
      comments: 15,
    },
  ]);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 1500);
  };

  const renderStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="w-4 h-4 text-green-600" />;
      case "closed":
        return <CheckCircle className="w-4 h-4 text-purple-600" />;
      case "merged":
        return <GitMerge className="w-4 h-4 text-purple-600" />;
      case "draft":
        return <Clock className="w-4 h-4 text-gray-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2">
  <img src={logo} className="h-6 w-auto" /> {/* Adjusted height and width */}
  <h1 className="text-2xl font-bold">GitHub Integration</h1>
</div>
        <div className="flex space-x-3">
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className={`flex items-center px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 ${
              isSyncing ? "opacity-70" : ""
            }`}
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${isSyncing ? "animate-spin" : ""}`}
            />
            <span>Sync</span>
          </button>
          <button className="flex items-center px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            <span>Connect Repo</span>
          </button>
          <button className="flex items-center px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200">
            <Settings className="w-4 h-4 mr-2" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {!isConnected ? (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Your GitHub connection needs attention.{" "}
                <a
                  href="#"
                  className="font-medium underline text-yellow-700 hover:text-yellow-600"
                >
                  Reconnect now
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("repos")}
            className={`py-2 px-4 font-medium text-sm flex items-center ${
              activeTab === "repos"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <GitBranch className="w-4 h-4 mr-2" />
            Repositories
          </button>
          <button
            onClick={() => setActiveTab("prs")}
            className={`py-2 px-4 font-medium text-sm flex items-center ${
              activeTab === "prs"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <GitPullRequest className="w-4 h-4 mr-2" />
            Pull Requests
          </button>
          <button
            onClick={() => setActiveTab("issues")}
            className={`py-2 px-4 font-medium text-sm flex items-center ${
              activeTab === "issues"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <AlertCircle className="w-4 h-4 mr-2" />
            Issues
          </button>
          <button
            onClick={() => setActiveTab("actions")}
            className={`py-2 px-4 font-medium text-sm flex items-center ${
              activeTab === "actions"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Actions
          </button>
        </div>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200">
            <Filter className="w-4 h-4 mr-2" />
            <span>Filter</span>
          </button>
          {selectedRepo && (
            <button
              onClick={() => setSelectedRepo(null)}
              className="px-3 py-1.5 text-sm rounded-md bg-gray-100 hover:bg-gray-200"
            >
              Clear selection
            </button>
          )}
        </div>
      </div>

      {activeTab === "repos" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {repositories.map((repo) => (
            <div
              key={repo.id}
              className={`bg-white p-4 rounded-lg shadow ${
                selectedRepo === repo.id ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <h3 className="text-lg font-medium text-blue-600">
                      {repo.name}
                    </h3>
                    {repo.isPrivate && (
                      <span className="ml-2 px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-800">
                        Private
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-1">{repo.description}</p>
                </div>
                <button
                  onClick={() =>
                    setSelectedRepo(repo.id === selectedRepo ? null : repo.id)
                  }
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex items-center mt-3 text-sm text-gray-500 space-x-4">
                <span className="flex items-center">
                  <Code className="w-4 h-4 mr-1" />
                  {repo.language}
                </span>
                <span className="flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  {repo.stars}
                </span>
                <span className="flex items-center">
                  {/* <Fork className="w-4 h-4 mr-1" /> */}
                  {repo.forks}
                </span>
                <span className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {repo.watchers}
                </span>
                <span className="flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {repo.openIssues}
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  Updated {repo.lastUpdated}
                </span>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  View on GitHub
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "prs" && (
        <div className="space-y-4">
          {pullRequests.map((pr) => (
            <div key={pr.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center">
                    {renderStatusIcon(pr.status)}
                    <h3 className="font-medium ml-2">{pr.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    by {pr.author} • Updated {pr.updatedAt}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded capitalize ${
                    pr.status === "open"
                      ? "bg-green-100 text-green-800"
                      : pr.status === "merged"
                      ? "bg-purple-100 text-purple-800"
                      : pr.status === "closed"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {pr.status}
                </span>
              </div>

              {pr.checks && (
                <div className="mt-2 flex items-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      pr.checks.status === "success"
                        ? "bg-green-100 text-green-800"
                        : pr.checks.status === "failure"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {pr.checks.status === "success"
                      ? "All checks passed"
                      : pr.checks.status === "failure"
                      ? "Checks failed"
                      : "Checks pending"}{" "}
                    ({pr.checks.count})
                  </span>
                </div>
              )}

              <div className="flex items-center mt-3 space-x-4 text-sm">
                <button className="flex items-center text-gray-600 hover:text-gray-900">
                  <GitCommit className="w-4 h-4 mr-1" />
                  <span>{pr.commits} commits</span>
                </button>
                <button className="flex items-center text-gray-600 hover:text-gray-900">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  <span>{pr.comments} comments</span>
                </button>
                <button className="flex items-center text-blue-600 hover:text-blue-800">
                  <span>Review</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "issues" && (
        <div className="space-y-4">
          {issues.map((issue) => (
            <div key={issue.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center">
                    {renderStatusIcon(issue.status)}
                    <h3 className="font-medium ml-2">{issue.title}</h3>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {issue.labels.map((label) => (
                      <span
                        key={label}
                        className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-800"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    by {issue.author} • Updated {issue.updatedAt}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded capitalize ${
                    issue.status === "open"
                      ? "bg-green-100 text-green-800"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {issue.status}
                </span>
              </div>

              <div className="flex items-center mt-3 space-x-4 text-sm">
                <button className="flex items-center text-gray-600 hover:text-gray-900">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  <span>{issue.comments} comments</span>
                </button>
                <button className="flex items-center text-blue-600 hover:text-blue-800">
                  <span>View issue</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "actions" && (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="mx-auto max-w-md">
            <RefreshCw className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              GitHub Actions
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              View and manage your GitHub Actions workflows. Connect a
              repository to get started.
            </p>
            <div className="mt-6">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Plus className="-ml-1 mr-2 h-5 w-5" />
                Connect Repository
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubIntegration;
