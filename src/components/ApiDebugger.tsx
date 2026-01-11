'use client';

import React, { useState, useEffect } from 'react';
import config from '@/config';

interface ApiStatus {
  url: string;
  status: 'checking' | 'success' | 'error';
  message: string;
  responseTime?: number;
  errorType?: 'network' | 'cors' | 'not_found' | 'server_error' | 'env_misconfig';
  suggestions?: string[];
}

export default function ApiDebugger() {
  const [apiStatus, setApiStatus] = useState<ApiStatus>({
    url: config.api.baseUrl,
    status: 'checking',
    message: 'Checking API connection...'
  });

  const testApiConnection = async () => {
    const startTime = Date.now();
    setApiStatus({
      url: config.api.baseUrl,
      status: 'checking',
      message: 'Testing connection...'
    });

    try {
      // Test basic connectivity
      const response = await fetch(`${config.api.baseUrl}categories/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseTime = Date.now() - startTime;

      if (response.ok) {
        setApiStatus({
          url: config.api.baseUrl,
          status: 'success',
          message: `✅ API is accessible (${response.status})`,
          responseTime
        });
      } else {
        let errorType: ApiStatus['errorType'] = 'server_error';
        let suggestions: string[] = [];

        if (response.status === 404) {
          errorType = 'not_found';
          suggestions = [
            'Check if the API endpoint exists',
            'Verify the API base URL is correct',
            'Ensure the backend server is running'
          ];
        } else if (response.status >= 500) {
          errorType = 'server_error';
          suggestions = [
            'Backend server may be experiencing issues',
            'Check backend logs for errors',
            'Verify database connectivity'
          ];
        }

        setApiStatus({
          url: config.api.baseUrl,
          status: 'error',
          message: `❌ API responded with ${response.status}: ${response.statusText}`,
          responseTime,
          errorType,
          suggestions
        });
      }
    } catch (error) {
      const responseTime = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      let errorType: ApiStatus['errorType'] = 'network';
      let suggestions: string[] = [];

      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorType = 'network';
        suggestions = [
          'Backend server is not running on port 8000',
          'Check if Django server is started with: python manage.py runserver 8000',
          'Verify no firewall is blocking the connection',
          'Ensure the backend is accessible at http://127.0.0.1:8000'
        ];
      } else if (errorMessage.includes('CORS')) {
        errorType = 'cors';
        suggestions = [
          'CORS configuration issue in backend',
          'Check Django CORS settings',
          'Verify frontend origin is allowed'
        ];
      }

      setApiStatus({
        url: config.api.baseUrl,
        status: 'error',
        message: `❌ Connection failed: ${errorMessage}`,
        responseTime,
        errorType,
        suggestions
      });
    }
  };

  useEffect(() => {
    testApiConnection();
  }, []);

  const getStatusColor = (status: ApiStatus['status']) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'checking': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: ApiStatus['status']) => {
    switch (status) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'checking': return '⏳';
      default: return '❓';
    }
  };

  const getErrorTypeLabel = (errorType?: ApiStatus['errorType']) => {
    switch (errorType) {
      case 'network': return '🌐 Network Unreachable';
      case 'cors': return '🚫 CORS Error';
      case 'not_found': return '🔍 404 Not Found';
      case 'server_error': return '💥 Server Error';
      case 'env_misconfig': return '⚙️ Environment Misconfig';
      default: return '❓ Unknown Error';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm z-50">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-700">API Debugger</h3>
        <button
          onClick={testApiConnection}
          className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded transition-colors"
        >
          🔄 Test
        </button>
      </div>
      
      <div className="space-y-2 text-xs">
        <div className="flex items-center space-x-2">
          <span>{getStatusIcon(apiStatus.status)}</span>
          <span className={getStatusColor(apiStatus.status)}>
            {apiStatus.message}
          </span>
        </div>
        
        {apiStatus.errorType && (
          <div className="text-gray-600 font-medium">
            {getErrorTypeLabel(apiStatus.errorType)}
          </div>
        )}
        
        {apiStatus.responseTime && (
          <div className="text-gray-500">
            Response time: {apiStatus.responseTime}ms
          </div>
        )}
        
        <div className="text-gray-600 break-all">
          <strong>URL:</strong> {apiStatus.url}
        </div>
        
        <div className="text-gray-600">
          <strong>Env Var:</strong> {process.env.NEXT_PUBLIC_API_BASE_URL || 'Not set'}
        </div>

        {apiStatus.suggestions && apiStatus.suggestions.length > 0 && (
          <div className="mt-3 p-2 bg-blue-50 rounded border border-blue-200">
            <div className="text-blue-800 font-medium mb-1">💡 Suggestions:</div>
            <ul className="text-blue-700 space-y-1">
              {apiStatus.suggestions.map((suggestion, index) => (
                <li key={index} className="text-xs">• {suggestion}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
