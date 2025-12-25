"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as any },
    },
  };

  return (
    <motion.section
      className="w-full bg-[#120806] py-16 px-4 text-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#FF3D20] to-[#FF7A34] bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-gray-300">Have a question? We'd love to hear from you.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FF3D20] to-[#FF7A34] flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Email</h3>
                <p className="text-gray-400">contact@example.com</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FF3D20] to-[#FF7A34] flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Phone</h3>
                <p className="text-gray-400">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FF3D20] to-[#FF7A34] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Address</h3>
                <p className="text-gray-400">123 Gaming Street, Vegas, NV 12345</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form onSubmit={handleSubmit} variants={itemVariants} className="space-y-4">
            {success && (
              <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-sm">
                Message sent successfully! We'll get back to you soon.
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}

            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#1d1310] border border-[#3d2a24] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7A34] transition"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#1d1310] border border-[#3d2a24] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7A34] transition"
              />
            </div>

            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#1d1310] border border-[#3d2a24] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7A34] transition"
              />
            </div>

            <div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#1d1310] border border-[#3d2a24] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7A34] transition"
              />
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-[#1d1310] border border-[#3d2a24] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7A34] transition resize-none"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-[#FF3D20] to-[#FF7A34] text-white font-semibold rounded-lg hover:opacity-90 transition disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? "Sending..." : "Send Message"}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
}
