import React, { useState } from 'react';
import type { WebsiteProject } from './types';

interface DeploymentManagerProps {
  websiteProject: WebsiteProject;
  onDeploy: (platform: string) => void;
}

interface DeploymentPlatform {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
  pricing: string;
  setupTime: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
}

const DeploymentManager: React.FC<DeploymentManagerProps> = ({
  websiteProject,
  onDeploy
}) => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'deploying' | 'success' | 'error'>('idle');

  const deploymentPlatforms: DeploymentPlatform[] = [
    {
      id: 'netlify',
      name: 'Netlify',
      description: 'Instant deployment with continuous integration',
      icon: '▲',
      features: ['Instant deployment', 'Free SSL', 'CDN', 'Form handling'],
      pricing: 'Free tier available',
      setupTime: '2 minutes',
      difficulty: 'Easy'
    },
    {
      id: 'vercel',
      name: 'Vercel',
      description: 'Optimized for modern frameworks and edge computing',
      icon: '▲',
      features: ['Edge network', 'Automatic SSL', 'CI/CD', 'Serverless functions'],
      pricing: 'Free tier available',
      setupTime: '1 minute',
      difficulty: 'Easy'
    },
    {
      id: 'github-pages',
      name: 'GitHub Pages',
      description: 'Free hosting directly from your GitHub repository',
      icon: '🐙',
      features: ['Free hosting', 'Custom domains', 'SSL support', 'Git integration'],
      pricing: 'Free',
      setupTime: '5 minutes',
      difficulty: 'Medium'
    },
    {
      id: 'render',
      name: 'Render',
      description: 'Modern cloud platform for static sites and web services',
      icon: '⚡',
      features: ['Auto SSL', 'Global CDN', 'Pull request previews', 'Auto scaling'],
      pricing: 'Free tier available',
      setupTime: '3 minutes',
      difficulty: 'Easy'
    }
  ];

  const handleDeploy = async (platformId: string) => {
    setSelectedPlatform(platformId);
    setIsDeploying(true);
    setDeploymentStatus('deploying');
    
    // Simulate deployment process
    setTimeout(() => {
      setDeploymentStatus('success');
      setIsDeploying(false);
      onDeploy(platformId);
    }, 4000);
  };

  const PlatformCard: React.FC<{ platform: DeploymentPlatform }> = ({ platform }) => {
    const isSelected = selectedPlatform === platform.id;
    const isDeployingThis = isDeploying && isSelected;

    return (
      <div
        className={`border-2 rounded-xl p-6 transition-all ${
          isSelected
            ? 'border-green-500 bg-green-50'
            : 'border-gray-200 hover:border-green-300'
        } ${isDeployingThis ? 'animate-pulse' : ''}`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{platform.icon}</div>
            <div>
              <h4 className="font-semibold text-gray-800 text-lg">{platform.name}</h4>
              <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                platform.difficulty === 'Easy' 
                  ? 'bg-green-100 text-green-800'
                  : platform.difficulty === 'Medium'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {platform.difficulty}
              </span>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4">{platform.description}</p>

        {/* Features */}
        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-2">Features</div>
          <ul className="text-sm text-gray-700 space-y-1">
            {platform.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Platform Details */}
        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <div>
            <div className="text-gray-600">Pricing</div>
            <div className="font-medium">{platform.pricing}</div>
          </div>
          <div>
            <div className="text-gray-600">Setup Time</div>
            <div className="font-medium">{platform.setupTime}</div>
          </div>
        </div>

        {/* Deploy Button */}
        <button
          onClick={() => handleDeploy(platform.id)}
          disabled={isDeploying}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
            isSelected && deploymentStatus === 'success'
              ? 'bg-green-600 text-white'
              : isDeployingThis
              ? 'bg-blue-600 text-white'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          } disabled:opacity-50`}
        >
          {isDeployingThis ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Deploying...</span>
            </div>
          ) : deploymentStatus === 'success' && isSelected ? (
            <div className="flex items-center justify-center space-x-2">
              <span>✓</span>
              <span>Deployed Successfully!</span>
            </div>
          ) : (
            `Deploy to ${platform.name}`
          )}
        </button>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🚀</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Deploy Your Website</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Your website is ready! Choose a platform to deploy instantly. 
          All platforms offer free tiers and automatic SSL certificates.
        </p>
      </div>

      {/* Project Summary */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h4 className="font-semibold text-gray-800 mb-4">Website Summary</h4>
        <div className="grid md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{websiteProject.components.length}</div>
            <div className="text-gray-600">Components</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {Object.keys(websiteProject.content).length}
            </div>
            <div className="text-gray-600">Content Sections</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {websiteProject.seo.keywords.length}
            </div>
            <div className="text-gray-600">SEO Keywords</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">100%</div>
            <div className="text-gray-600">AI Generated</div>
          </div>
        </div>
      </div>

      {/* Deployment Platforms */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {deploymentPlatforms.map((platform) => (
          <PlatformCard key={platform.id} platform={platform} />
        ))}
      </div>

      {/* Deployment Status */}
      {deploymentStatus === 'success' && selectedPlatform && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h4 className="font-semibold text-green-800 text-lg mb-2">
            Website Deployed Successfully!
          </h4>
          <p className="text-green-700 mb-4">
            Your website is now live on {deploymentPlatforms.find(p => p.id === selectedPlatform)?.name}.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              View Live Site
            </button>
            <button className="px-6 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50">
              Download Code
            </button>
          </div>
        </div>
      )}

      {/* Next Steps */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-3">Next Steps After Deployment</h4>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start space-x-2">
            <span className="text-blue-500">1.</span>
            <div>
              <div className="font-medium text-gray-800">Set Custom Domain</div>
              <div className="text-gray-600">Connect your domain name</div>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-500">2.</span>
            <div>
              <div className="font-medium text-gray-800">Google Analytics</div>
              <div className="text-gray-600">Track your website traffic</div>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-500">3.</span>
            <div>
              <div className="font-medium text-gray-800">Submit to Search Engines</div>
              <div className="text-gray-600">Get indexed faster</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeploymentManager;