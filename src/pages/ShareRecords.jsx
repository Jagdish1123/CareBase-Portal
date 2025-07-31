import  { useState } from "react";
import { motion } from "framer-motion";
import { IconClipboardText, IconShare, IconKey, IconClock, IconLink, IconTrash } from "@tabler/icons-react";

// Mock data for demonstration purposes
const mockRecords = [
  { id: "rec-001", name: "Annual Physical Exam - 2023", date: "2023-10-15" },
  { id: "rec-002", name: "Blood Test Results - August 2023", date: "2023-08-20" },
  { id: "rec-003", name: "X-Ray Scan - June 2023", date: "2023-06-05" },
  { id: "rec-004", name: "Dermatology Consultation - 2022", date: "2022-11-01" },
];

const ShareRecords = () => {
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [sharePassword, setSharePassword] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [shareLink, setShareLink] = useState("");
  const [copied, setCopied] = useState(false);

  // Toggle selection of a record
  const handleSelectRecord = (recordId) => {
    setSelectedRecords(prev =>
      prev.includes(recordId) ? prev.filter(id => id !== recordId) : [...prev, recordId]
    );
  };

  // Simulate generating a secure link
  const handleGenerateLink = () => {
    if (selectedRecords.length === 0 || !sharePassword || !expiryDate) {
      alert("Please select records, set a password, and an expiration date.");
      return;
    }
    
    // Create a demo-friendly token for the link.
    const uniqueId = Math.random().toString(36).substring(2, 8);
    const url = `https://casebase.com/share/${uniqueId}`;
    setShareLink(url);
  };

  // Revoke the generated link
  const handleRevokeLink = () => {
    setShareLink("");
    setSharePassword("");
    setExpiryDate("");
    setCopied(false);
  };
  
  // New function to handle copying the link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset the "Copied!" message after 2 seconds
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div 
      className="min-h-screen bg-[#13131a] p-8 text-white"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <h1 className="mb-8 text-center text-4xl font-extrabold">Secure & Controlled Sharing</h1>

      <div className="mx-auto max-w-3xl rounded-2xl bg-[#1c1c24] p-8 shadow-xl">
        {/* Step 1: Select Records */}
        <motion.div className="mb-8" variants={cardVariants} transition={{ delay: 0.2 }}>
          <h2 className="mb-4 text-2xl font-bold">1. Select Records to Share</h2>
          <div className="space-y-3">
            {mockRecords.map(record => (
              <div
                key={record.id}
                className={`flex cursor-pointer items-center justify-between rounded-xl border border-gray-700 p-4 transition-colors duration-200 ${
                  selectedRecords.includes(record.id) ? "bg-green-500 text-black" : "hover:bg-gray-700"
                }`}
                onClick={() => handleSelectRecord(record.id)}
              >
                <div className="flex items-center">
                  <IconClipboardText size={24} className="mr-3" />
                  <div>
                    <p className="font-semibold">{record.name}</p>
                    <p className="text-sm text-gray-400">{record.date}</p>
                  </div>
                </div>
                {selectedRecords.includes(record.id) && (
                  <span className="text-sm font-bold">Selected</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Step 2: Set Security Details */}
        <motion.div className="mb-8" variants={cardVariants} transition={{ delay: 0.4 }}>
          <h2 className="mb-4 text-2xl font-bold">2. Set Security Details</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <IconKey size={24} className="text-gray-400" />
              <input
                type="password"
                placeholder="Set a password for the shared link"
                value={sharePassword}
                onChange={(e) => setSharePassword(e.target.value)}
                className="w-full rounded-xl border-gray-700 bg-gray-800 p-3 text-white focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div className="flex items-center space-x-4">
              <IconClock size={24} className="text-gray-400" />
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full rounded-xl border-gray-700 bg-gray-800 p-3 text-white focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>
        </motion.div>

        {/* Step 3: Generate and Manage Link */}
        <motion.div variants={cardVariants} transition={{ delay: 0.6 }}>
          <h2 className="mb-4 text-2xl font-bold">3. Generate Link</h2>
          {!shareLink ? (
            <button
              onClick={handleGenerateLink}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-green-500 py-3 font-bold text-gray-900 shadow-lg transition-colors duration-200 hover:bg-green-600 disabled:opacity-50"
              disabled={selectedRecords.length === 0 || !sharePassword || !expiryDate}
            >
              <IconShare size={20} />
              Generate Secure Link
            </button>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center rounded-xl border border-green-500 bg-gray-800 p-4">
                <IconLink size={20} className="mr-3 flex-shrink-0 text-green-400" />
                <p className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-300">
                  {shareLink}
                </p>
                <button 
                  className="ml-4 flex-shrink-0 rounded-md bg-gray-700 p-2 text-sm text-white hover:bg-gray-600"
                  onClick={handleCopyLink}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <button
                onClick={handleRevokeLink}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-red-500 py-3 font-bold text-white shadow-lg transition-colors duration-200 hover:bg-red-600"
              >
                <IconTrash size={20} />
                Revoke Link
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ShareRecords;
