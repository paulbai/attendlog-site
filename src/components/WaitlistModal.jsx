import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function WaitlistModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setForm({ name: '', email: '', company: '', phone: '' });
    } catch {
      setStatus('error');
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setStatus('idle'), 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative px-8 pt-8 pb-4">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X size={16} className="text-gray-500" />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00696f] to-[#00f2ff] flex items-center justify-center mb-4">
                <UserPlus size={20} className="text-white" />
              </div>
              <h2 className="font-headline font-bold text-2xl text-gray-900 tracking-tight">
                Join the Waitlist
              </h2>
              <p className="text-gray-500 text-sm mt-1 font-body">
                Be the first to experience next-gen attendance tracking.
              </p>
            </div>

            {/* Content */}
            <div className="px-8 pb-8">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-8 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className="font-headline font-bold text-lg text-gray-900 mb-1">You're on the list!</h3>
                  <p className="text-gray-500 text-sm font-body">
                    We'll reach out when it's your turn. Stay tuned.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-6 px-6 py-2.5 rounded-full bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 font-body">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Amara Okafor"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm font-body placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00696f]/20 focus:border-[#00696f] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 font-body">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="amara@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm font-body placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00696f]/20 focus:border-[#00696f] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 font-body">
                      Company <span className="text-gray-400 normal-case">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Your organization"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm font-body placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00696f]/20 focus:border-[#00696f] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 font-body">
                      Phone <span className="text-gray-400 normal-case">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+232 76 123 456"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm font-body placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00696f]/20 focus:border-[#00696f] transition-all"
                    />
                  </div>

                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-100"
                    >
                      <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                      <p className="text-red-600 text-xs font-body">Something went wrong. Please try again.</p>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#00696f] to-[#00a5a5] text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#00696f]/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Joining...
                      </>
                    ) : (
                      <>
                        Join the Waitlist
                        <UserPlus size={16} />
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-gray-400 font-body">
                    No spam, ever. We'll only email you when your spot is ready.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
