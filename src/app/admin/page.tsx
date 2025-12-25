"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogOut, Trash2, Mail, User, Phone, Calendar } from "lucide-react";

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [token, setToken] = useState("");
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }

      setToken(data.token);
      setIsLoggedIn(true);
      setLoginForm({ username: "", password: "" });
      fetchContacts(data.token);
    } catch (error) {
      alert("Login error");
    } finally {
      setLoginLoading(false);
    }
  };

  const fetchContacts = async (authToken: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/contacts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setContacts(data.contacts || []);
      } else {
        alert(data.message || "Failed to fetch contacts");
      }
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
      alert("Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) {
      return;
    }

    setDeleteLoading(id);
    try {
      console.log("Deleting contact with ID:", id);
      const response = await fetch("/api/admin/contacts", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      console.log("Delete response status:", response.status);

      if (response.ok) {
        setContacts(contacts.filter((c) => c._id !== id));
        alert("Contact deleted successfully");
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Delete failed:", response.status, errorData);
        alert(errorData.message || "Failed to delete contact");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete error: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken("");
    setContacts([]);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#120806] flex items-center justify-center px-4">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-[#1d1310] border border-[#3d2a24] rounded-xl p-8">
            <h1 className="text-3xl font-bold text-white mb-2 text-center">Admin Login</h1>
            <p className="text-gray-400 text-center mb-6">Access the admin dashboard</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Username</label>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, username: e.target.value })
                  }
                  placeholder="Enter username"
                  className="w-full px-4 py-2 bg-[#0a0603] border border-[#3d2a24] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7A34]"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                  placeholder="Enter password"
                  className="w-full px-4 py-2 bg-[#0a0603] border border-[#3d2a24] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7A34]"
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={loginLoading}
                className="w-full px-4 py-2 bg-gradient-to-r from-[#FF3D20] to-[#FF7A34] text-white font-semibold rounded-lg hover:opacity-90 transition disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loginLoading ? "Logging in..." : "Login"}
              </motion.button>
            </form>

            <p className="text-gray-400 text-xs text-center mt-6">
              Default: admin / admin123456
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#120806] text-white px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-400 mt-1">Manage contact messages</p>
          </div>
          <motion.button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid md:grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <div className="bg-[#1d1310] border border-[#3d2a24] rounded-lg p-4">
            <p className="text-gray-400 text-sm">Total Messages</p>
            <p className="text-3xl font-bold text-[#FF7A34] mt-2">{contacts.length}</p>
          </div>
          <div className="bg-[#1d1310] border border-[#3d2a24] rounded-lg p-4">
            <p className="text-gray-400 text-sm">Unread</p>
            <p className="text-3xl font-bold text-[#FF7A34] mt-2">
              {contacts.filter((c) => c.status === "unread").length}
            </p>
          </div>
          <div className="bg-[#1d1310] border border-[#3d2a24] rounded-lg p-4">
            <p className="text-gray-400 text-sm">Read</p>
            <p className="text-3xl font-bold text-[#FF7A34] mt-2">
              {contacts.filter((c) => c.status === "read").length}
            </p>
          </div>
        </motion.div>

        {/* Contacts Table */}
        <motion.div
          className="bg-[#1d1310] border border-[#3d2a24] rounded-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-8 text-center text-gray-400">Loading contacts...</div>
            ) : contacts.length === 0 ? (
              <div className="p-8 text-center text-gray-400">No contacts yet</div>
            ) : (
              <table className="w-full">
                <thead className="bg-[#0a0603] border-b border-[#3d2a24]">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Subject</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact, index) => (
                    <motion.tr
                      key={contact._id}
                      className="border-b border-[#3d2a24] hover:bg-[#2a1814] transition"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="px-6 py-4 text-sm">{contact.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">{contact.email}</td>
                      <td className="px-6 py-4 text-sm truncate max-w-xs">{contact.subject}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            contact.status === "unread"
                              ? "bg-yellow-500/20 text-yellow-300"
                              : "bg-green-500/20 text-green-300"
                          }`}
                        >
                          {contact.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <motion.button
                          onClick={() => handleDelete(contact._id)}
                          disabled={deleteLoading === contact._id}
                          className="text-red-400 hover:text-red-300 transition disabled:opacity-50"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
