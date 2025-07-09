import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaEnvelope, FaReply, FaUser } from 'react-icons/fa';
import axios from 'axios';

const MessagesManager = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState({});
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  useEffect(() => {
    const loadMessages = () => {
      try {
        setLoading(true);
        // Get messages from localStorage
        const storedMessages = JSON.parse(localStorage.getItem('portfolioMessages') || '[]');
        setMessages(storedMessages);
        
        // Get replies from localStorage
        const storedReplies = JSON.parse(localStorage.getItem('messageReplies') || '{}');
        setReplies(storedReplies);
        
        setLoading(false);
      } catch (err) {
        console.error('Error loading messages:', err);
        setError('Failed to load messages. Please try again.');
        setLoading(false);
      }
    };

    loadMessages();
  }, []);
  
  const handleReplyChange = (e) => {
    setReplyText(e.target.value);
  };
  
  const handleReplySubmit = (messageId) => {
    if (!replyText.trim()) return;
    
    const now = new Date();
    const newReply = {
      id: Date.now().toString(),
      text: replyText,
      date: now.toISOString(),
      sender: 'admin'
    };
    
    // Update replies state
    const updatedReplies = { ...replies };
    if (!updatedReplies[messageId]) {
      updatedReplies[messageId] = [];
    }
    updatedReplies[messageId] = [...updatedReplies[messageId], newReply];
    
    // Save to localStorage
    localStorage.setItem('messageReplies', JSON.stringify(updatedReplies));
    
    // Update state
    setReplies(updatedReplies);
    setReplyText('');
    setShowReplyForm(false);
  };

  const handleDeleteClick = (id, e) => {
    if (e) e.stopPropagation();
    const message = messages.find(msg => msg.id === id);
    setMessageToDelete(message);
    setShowDeleteConfirm(true);
  };

  const handleDelete = () => {
    if (!messageToDelete) return;
    
    try {
      const id = messageToDelete.id;
      // Get current messages from localStorage
      const storedMessages = JSON.parse(localStorage.getItem('portfolioMessages') || '[]');
      
      // Filter out the message to delete
      const updatedMessages = storedMessages.filter(message => message.id !== id);
      
      // Save updated messages back to localStorage
      localStorage.setItem('portfolioMessages', JSON.stringify(updatedMessages));
      
      // Update state
      setMessages(updatedMessages);
      
      // Close modal if the deleted message was selected
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(null);
        setShowModal(false);
      }

      // Close confirmation dialog
      setShowDeleteConfirm(false);
      setMessageToDelete(null);
    } catch (err) {
      console.error('Error deleting message:', err);
      alert('Failed to delete message. Please try again.');
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setMessageToDelete(null);
  };

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setShowModal(true);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
      <p>{error}</p>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Contact Messages</h2>
        <div className="text-sm text-gray-500">
          {messages.length} {messages.length === 1 ? 'message' : 'messages'} total
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <FaEnvelope className="mx-auto text-gray-400 text-4xl mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">No Messages Yet</h3>
          <p className="text-gray-500">When visitors send you messages through your contact form, they will appear here.</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="divide-y divide-gray-200">
            {messages.map((message) => (
              <div key={message.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => handleViewMessage(message)}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                      {message.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{message.name}</h4>
                      <p className="text-sm text-gray-500">{message.email}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{formatDate(message.date)}</div>
                </div>
                
                <div className="ml-13 pl-10">
                  <h3 className="font-medium text-gray-800 mb-1 max-w-md truncate" title={message.subject}>
                    {message.subject}
                  </h3>
                  <div className="text-gray-600 whitespace-pre-line line-clamp-2 mb-2 max-w-md">
                    {message.message}
                  </div>
                </div>
                
                <div className="flex justify-end mt-2">
                  <button 
                    onClick={(e) => handleDeleteClick(message.id, e)}
                    className="text-red-600 hover:text-red-900 flex items-center text-sm"
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                  <button 
                    className="text-blue-600 hover:text-blue-900 flex items-center text-sm ml-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewMessage(message);
                      // Set a small timeout to ensure the modal is open before focusing
                      setTimeout(() => {
                        const textarea = document.querySelector('.message-reply-textarea');
                        if (textarea) textarea.focus();
                      }, 100);
                    }}
                  >
                    <FaReply className="mr-1" /> Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && messageToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative"
          >
            <div className="text-center mb-6">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <FaTrash className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Message</h3>
              <p className="text-gray-500">
                Are you sure you want to delete this message from <span className="font-medium">{messageToDelete.name}</span>?
                This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-center gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Message Detail Modal */}
      {showModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[90] p-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Modal Header */}
            <div className="bg-gray-100 border-b border-gray-200 p-4 flex justify-between items-center">
              <div className="flex items-center">
                <FaEnvelope className="text-blue-600 mr-2" />
                <h3 className="text-lg font-bold">Message Details</h3>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                &times;
              </button>
            </div>
            
            {/* Message Content */}
            <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 250px)' }}>
              {/* Subject Line */}
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800">{selectedMessage.subject}</h2>
              </div>
              
              {/* Sender Info */}
              <div className="mb-4 pb-2 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    {selectedMessage.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{selectedMessage.name}</div>
                    <div className="text-sm text-gray-600">
                      <a href={`mailto:${selectedMessage.email}`} className="hover:underline" onClick={(e) => e.stopPropagation()}>
                        {selectedMessage.email}
                      </a>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Received on {formatDate(selectedMessage.date)}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Chat-like Message Thread */}
              <div className="mb-4 space-y-4">
                {/* Original Message */}
                <div className="flex">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                    {selectedMessage.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-[85%] inline-block overflow-hidden">
                      <div className="text-gray-700 whitespace-pre-wrap break-all overflow-auto max-h-[300px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pr-2" style={{ wordBreak: 'break-word', overflowWrap: 'break-word', hyphens: 'auto', maxWidth: '100%' }}>
                        {selectedMessage.message}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 text-right">
                        {new Date(selectedMessage.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Replies */}
                {replies[selectedMessage.id] && replies[selectedMessage.id].map(reply => (
                  <div className="flex justify-end" key={reply.id}>
                    <div className="flex-1 text-right">
                      <div className="bg-blue-500 text-white p-3 rounded-lg rounded-tr-none max-w-[85%] inline-block text-left overflow-hidden">
                        <div className="whitespace-pre-wrap break-all overflow-auto max-h-[300px] scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-transparent pr-2" style={{ wordBreak: 'break-word', overflowWrap: 'break-word', hyphens: 'auto', maxWidth: '100%' }}>
                          {reply.text}
                        </div>
                        <div className="text-xs text-blue-100 mt-1 text-right">
                          {new Date(reply.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center ml-2 flex-shrink-0 mt-1">
                      <FaUser size={12} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Reply Form */}
            <div className="bg-gray-100 border-t border-gray-200 p-4">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <textarea
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none message-reply-textarea"
                    placeholder="Type your reply here..."
                    rows="2"
                    value={replyText}
                    onChange={handleReplyChange}
                  ></textarea>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleReplySubmit(selectedMessage.id)}
                    disabled={!replyText.trim()}
                    className={`p-4 rounded-lg ${replyText.trim() ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'} transition-colors shadow-sm flex items-center justify-center min-w-[50px] min-h-[50px]`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteClick(selectedMessage.id)}
                    className="p-4 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm flex items-center justify-center min-w-[50px] min-h-[50px]"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                <span>Your reply will be saved locally and visible only to you.</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MessagesManager;
