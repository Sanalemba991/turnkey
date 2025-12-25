'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Mail, User, Phone, Calendar, AlertCircle } from 'lucide-react';

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'read' | 'unread';
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        console.error('No admin token found');
        setLoading(false);
        return;
      }
      const response = await fetch('/api/admin/contacts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setContacts(data.contacts || []);
      } else {
        console.error('Failed to fetch contacts:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;

    setDeleteLoading(id);
    setError(null);
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError('No admin token found. Please log in again.');
        console.error('No admin token found');
        setDeleteLoading(null);
        return;
      }

      console.log('Attempting to delete contact:', id);
      console.log('Token available:', !!token);

      const response = await fetch('/api/admin/contacts', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      console.log('Delete response status:', response.status);

      if (response.ok) {
        const updatedContacts = contacts.filter((c) => c._id !== id);
        setContacts(updatedContacts);
        setSelectedContact(null);
        setSuccess('Contact deleted successfully');
        setTimeout(() => setSuccess(null), 3000);
        console.log('Contact deleted successfully');
      } else {
        let errorMessage = `Failed to delete contact (${response.status})`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
          console.error('Server error response:', errorData);
        } catch (e) {
          console.error('Could not parse error response');
        }
        setError(errorMessage);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error deleting contact';
      setError(errorMessage);
      console.error('Delete error:', error);
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-white text-2xl">Loading contacts...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-4 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200"
        >
          <p>{error}</p>
        </motion.div>
      )}

      {/* Success Message */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-4 p-4 bg-green-900/50 border border-green-700 rounded-lg text-green-200"
        >
          <p>{success}</p>
        </motion.div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Contact Enquiries</h1>
        <p className="text-gray-400">Manage all contact messages and enquiries</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contacts List */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden"
          >
            {contacts.length === 0 ? (
              <div className="p-8 text-center">
                <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">No contacts found</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-700">
                {contacts.map((contact, index) => (
                  <motion.div
                    key={contact._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedContact(contact)}
                    className={`p-4 cursor-pointer hover:bg-gray-700/50 transition ${
                      selectedContact?._id === contact._id ? 'bg-gray-700/50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-white">{contact.name}</h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              contact.status === 'unread'
                                ? 'bg-red-900/50 text-red-200'
                                : 'bg-green-900/50 text-green-200'
                            }`}
                          >
                            {contact.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">{contact.email}</p>
                        <p className="text-sm text-gray-500 mt-1">{contact.subject}</p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Contact Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-800 border border-gray-700 rounded-lg p-6"
        >
          {selectedContact ? (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">Message Details</h2>

              <div>
                <label className="text-gray-400 text-sm">Name</label>
                <div className="flex items-center gap-2 mt-1">
                  <User className="w-4 h-4 text-gray-500" />
                  <p className="text-white">{selectedContact.name}</p>
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm">Email</label>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="text-blue-400 hover:underline"
                  >
                    {selectedContact.email}
                  </a>
                </div>
              </div>

              {selectedContact.phone && (
                <div>
                  <label className="text-gray-400 text-sm">Phone</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <p className="text-white">{selectedContact.phone}</p>
                  </div>
                </div>
              )}

              <div>
                <label className="text-gray-400 text-sm">Subject</label>
                <p className="text-white mt-1 font-semibold">{selectedContact.subject}</p>
              </div>

              <div>
                <label className="text-gray-400 text-sm">Message</label>
                <p className="text-gray-300 mt-2 bg-gray-700/50 p-3 rounded-lg">
                  {selectedContact.message}
                </p>
              </div>

              <div>
                <label className="text-gray-400 text-sm">Received</label>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <p className="text-white">
                    {new Date(selectedContact.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleDelete(selectedContact._id)}
                disabled={deleteLoading === selectedContact._id}
                className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 disabled:bg-red-700 text-white rounded-lg font-semibold disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition"
              >
                <Trash2 className="w-4 h-4" />
                {deleteLoading === selectedContact._id ? 'Deleting...' : 'Delete Message'}
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400">Select a contact to view details</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
