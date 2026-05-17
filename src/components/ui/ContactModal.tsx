import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Linkedin, Github, Mail, Search, GraduationCap, Database, BookOpen, Fingerprint } from 'lucide-react';
import { COLORS } from '../../lib/constants';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const ContactModal: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [showSocials, setShowSocials] = React.useState(false);
  const [showDone, setShowDone] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const data: Record<string, any> = {
      name: formData.get('name') as string,
      organization: formData.get('organization') as string,
      email: formData.get('email') as string,
      purpose: formData.get('purpose') as string,
      collaboration_type: formData.get('collaboration_type') as string,
      timestamp: serverTimestamp(),
      status: 'unread'
    };

    const message = formData.get('message') as string;
    if (message && message.trim() !== '') {
      data.message = message.trim();
    }

    try {
        setError('');
        
        const response = await fetch('/api/collaboration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: data.name,
              organization: data.organization,
              email: data.email,
              purpose: data.purpose,
              collaboration_type: data.collaboration_type,
              message: data.message
            })
        });

        if (!response.ok) {
            throw new Error('Failed to submit request');
        }

        // Step 1: Form fades out (300ms)
        setIsSubmitted(true);
        
        // Step 2: Pulse trigger
        onSuccess?.();
        
        // Step 3: Success message appearing (900ms total)
        setTimeout(() => {
            setShowDone(true);
        }, 900);
        
        // Step 5: Social links fade in sequentially (3300ms total)
        setTimeout(() => {
            setShowSocials(true);
        }, 3300);
    } catch (error) {
        console.error('Submission error:', error);
        setError('There was an error sending your introduction. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-bgPrimary/95 backdrop-blur-md p-6"
      >
        <div className="w-full max-w-2xl bg-bgSurface border border-white/5 p-12 relative overflow-hidden">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-textSecondary hover:text-textPrimary transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {!isSubmitted ? (
            <motion.div
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <h2 className="font-display text-4xl md:text-5xl text-textPrimary">
                  Introduce yourself before entering the conversation.
                </h2>
                <p className="font-display text-lg text-textSecondary italic">
                  Every collaboration begins with context.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input name="name" required placeholder="Name" className="w-full bg-transparent border-b border-white/20 pb-2 focus:border-accentCyan outline-none font-mono text-sm placeholder:text-white/20" />
                    <input name="organization" required placeholder="Organization" className="w-full bg-transparent border-b border-white/20 pb-2 focus:border-accentCyan outline-none font-mono text-sm placeholder:text-white/20" />
                </div>
                <input name="email" required type="email" placeholder="Email" className="w-full bg-transparent border-b border-white/20 pb-2 focus:border-accentCyan outline-none font-mono text-sm placeholder:text-white/20" />
                <input name="purpose" required placeholder="Purpose (brief)" className="w-full bg-transparent border-b border-white/20 pb-2 focus:border-accentCyan outline-none font-mono text-sm placeholder:text-white/20" />
                
                <select name="collaboration_type" required className="w-full bg-transparent border-b border-white/20 pb-2 focus:border-accentCyan outline-none font-mono text-sm appearance-none text-textSecondary">
                  <option value="" disabled className="bg-[#0B0F14] text-textSecondary">Collaboration Type</option>
                  <option value="academic" className="bg-[#0B0F14] text-textPrimary">Academic Collaboration</option>
                  <option value="research" className="bg-[#0B0F14] text-textPrimary">Research Opportunity</option>
                  <option value="speaking" className="bg-[#0B0F14] text-textPrimary">Speaking Invitation</option>
                  <option value="ai" className="bg-[#0B0F14] text-textPrimary">AI Project</option>
                  <option value="debate" className="bg-[#0B0F14] text-textPrimary">Debate Event</option>
                  <option value="mentorship" className="bg-[#0B0F14] text-textPrimary">Mentorship</option>
                  <option value="other" className="bg-[#0B0F14] text-textPrimary">Other</option>
                </select>

                <textarea name="message" placeholder="Message (optional)" className="w-full bg-transparent border-b border-white/20 pb-2 focus:border-accentCyan outline-none font-mono text-sm h-24 placeholder:text-white/20" />

                <div className="flex justify-end items-center gap-4 pt-8">
                  {error && <p className="text-red-400 font-mono text-xs">{error}</p>}
                  <button type="submit" className="px-10 py-3 border border-white/20 hover:border-accentCyan transition-colors font-mono text-xs uppercase tracking-widest text-textPrimary">
                    Send Introduction
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <div className="min-h-[400px] flex flex-col items-center justify-center text-center space-y-12">
               <AnimatePresence>
                 {showDone && (
                   <motion.h2 
                     initial={{ opacity: 0 }} 
                     animate={{ opacity: 1 }}
                     className="font-display text-3xl md:text-4xl text-textPrimary"
                   >
                     Your introduction has been received.
                   </motion.h2>
                 )}
               </AnimatePresence>

                {showSocials && (
                  <div className="space-y-8 w-full max-w-sm">
                    {/* New Email Section */}
                    <div className="space-y-4 pt-6 border-t border-white/10">
                      <p className="font-mono text-xs text-textSecondary uppercase tracking-widest">
                        For a faster response, please kindly email us:
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        <a href="mailto:sdasshuvro@gmail.com" className="px-4 py-2 border border-accentCyan/50 text-accentCyan hover:bg-accentCyan hover:text-bgPrimary transition-colors font-mono text-xs uppercase tracking-widest">
                          Main Contact
                        </a>
                        <a href="mailto:research@example.com" className="px-4 py-2 border border-accentCyan/50 text-accentCyan hover:bg-accentCyan hover:text-bgPrimary transition-colors font-mono text-xs uppercase tracking-widest">
                          Research Inquiry
                        </a>
                        <a href="mailto:collaborate@example.com" className="px-4 py-2 border border-accentCyan/50 text-accentCyan hover:bg-accentCyan hover:text-bgPrimary transition-colors font-mono text-xs uppercase tracking-widest">
                          Collaboration
                        </a>
                      </div>
                    </div>

                    {/* Original Socials */}
                     <div className="space-y-2">
                       {[
                         { icon: <Linkedin className="w-4 h-4"/>, label: 'LinkedIn', href: 'https://www.linkedin.com/in/soumitro-kumar-das' },
                         { icon: <Github className="w-4 h-4"/>, label: 'GitHub', href: 'https://github.com/SoumitroDas' },
                         { icon: <BookOpen className="w-4 h-4"/>, label: 'ResearchGate', href: 'https://www.researchgate.net/profile/Soumitro-Kumar-Das' },
                         { icon: <Fingerprint className="w-4 h-4"/>, label: 'ORCID', href: 'https://orcid.org/0009-0009-1597-4653' },
                       ].map((item, i) => (
                         <motion.a
                           key={i}
                           href={item.href}
                           target="_blank"
                           rel="noopener noreferrer"
                           initial={{ opacity: 0, x: -10 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: i * 0.2 }}
                           className="flex items-center space-x-4 p-3 hover:bg-white/5 rounded-sm transition-colors text-textSecondary hover:text-accentCyan font-mono text-sm uppercase tracking-widest"
                         >
                           {item.icon}
                           <span>{item.label}</span>
                         </motion.a>
                       ))}
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
