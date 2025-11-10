// src/pages/InboxPage.tsx
import React, { useState, useEffect } from 'react';
import type { MessageThread } from '../types/message';
import { messageStorage, initializeSampleData } from '../utils/messageStorage';

const InboxPage: React.FC = () => {
  const [threads, setThreads] = useState<MessageThread[]>([]);
  const [selectedThread, setSelectedThread] = useState<MessageThread | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'high'>('all');

  useEffect(() => {
    initializeSampleData();
    setThreads(messageStorage.getThreads());
  }, []);

  const filteredThreads = threads.filter(thread => {
    const matchesSearch = thread.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thread.participants.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'unread' ? thread.unreadCount > 0 :
      filter === 'high' ? thread.messages.some(msg => msg.priority === 'high') : true;

    return matchesSearch && matchesFilter;
  });

  const handleThreadSelect = (thread: MessageThread) => {
    setSelectedThread(thread);
    messageStorage.markThreadAsRead(thread.id);
    setThreads(messageStorage.getThreads()); // Refresh to update unread counts
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'normal': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inbox</h1>
          <p className="text-gray-600">Manage your messages and communications</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex flex-col lg:flex-row h-[calc(100vh-200px)]">
            {/* Thread List */}
            <div className="lg:w-1/3 border-r border-gray-200 flex flex-col">
              {/* Search and Filters */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative mb-3">
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                
                <div className="flex space-x-2">
                  {(['all', 'unread', 'high'] as const).map((filterType) => (
                    <button
                      key={filterType}
                      onClick={() => setFilter(filterType)}
                      className={`px-3 py-1 rounded-full text-sm font-medium capitalize transition-colors ${
                        filter === filterType
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {filterType}
                    </button>
                  ))}
                </div>
              </div>

              {/* Threads List */}
              <div className="flex-1 overflow-y-auto">
                {filteredThreads.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p>No messages found</p>
                  </div>
                ) : (
                  filteredThreads.map((thread) => (
                    <div
                      key={thread.id}
                      onClick={() => handleThreadSelect(thread)}
                      className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 ${
                        selectedThread?.id === thread.id ? 'bg-blue-50 border-blue-200' : ''
                      } ${thread.unreadCount > 0 ? 'bg-blue-25' : ''}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                            {thread.participants.find(p => p.id !== 'user')?.avatar || 
                             thread.participants.find(p => p.id !== 'user')?.name.charAt(0) || '?'}
                          </div>
                          <div className="font-semibold text-gray-900">
                            {thread.participants.find(p => p.id !== 'user')?.name}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 whitespace-nowrap">
                          {formatTime(thread.lastMessage)}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <h3 className={`font-medium truncate flex-1 mr-2 ${
                          thread.unreadCount > 0 ? 'text-gray-900 font-semibold' : 'text-gray-700'
                        }`}>
                          {thread.subject}
                        </h3>
                        {thread.unreadCount > 0 && (
                          <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                            {thread.unreadCount}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-500 truncate mt-1">
                        {thread.messages[thread.messages.length - 1].body.substring(0, 60)}...
                      </p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getPriorityColor(thread.messages[0].priority)}`}>
                          {thread.messages[0].priority}
                        </span>
                        <span className="text-xs text-gray-400 capitalize">
                          {thread.messages[0].category}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Message View */}
            <div className="lg:w-2/3 flex flex-col">
              {selectedThread ? (
                <>
                  {/* Message Header */}
                  <div className="p-4 border-b border-gray-200 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-xl font-bold text-gray-900">{selectedThread.subject}</h2>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(selectedThread.messages[0].priority)}`}>
                          {selectedThread.messages[0].priority}
                        </span>
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span>With: </span>
                      {selectedThread.participants
                        .filter(p => p.id !== 'user')
                        .map(p => p.name)
                        .join(', ')}
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50">
                    {selectedThread.messages.map((message) => (
                      <div key={message.id} className="flex space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm">
                            {message.sender.avatar || message.sender.name.charAt(0)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold text-gray-900">{message.sender.name}</span>
                                <span className="text-gray-500">•</span>
                                <span className="text-sm text-gray-500">{message.sender.email}</span>
                              </div>
                              <span className="text-sm text-gray-500">{formatTime(message.timestamp)}</span>
                            </div>
                            <div className="text-gray-700 whitespace-pre-wrap">
                              {message.body}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Reply Box */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center text-white font-medium text-sm">
                          You
                        </div>
                      </div>
                      <div className="flex-1">
                        <textarea
                          placeholder="Type your reply..."
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        />
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex space-x-2">
                            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                              </svg>
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </button>
                          </div>
                          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                            Send Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p className="text-lg font-medium text-gray-900 mb-2">Select a message</p>
                    <p className="text-gray-600">Choose a conversation from the list to view messages</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboxPage;