import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IconMoodHappy, IconMoodSad, IconPlus, IconMoodNeutral } from "@tabler/icons-react";

// Mood selector component with a more refined design
const MoodSelector = ({ selectedMood, onSelect }) => {
  const moods = [
    { name: "Happy", icon: IconMoodHappy, color: "text-green-400" },
    { name: "Neutral", icon: IconMoodNeutral, color: "text-yellow-400" },
    { name: "Sad", icon: IconMoodSad, color: "text-red-400" },
  ];

  return (
    <div className="flex gap-4">
      {moods.map((mood) => (
        <motion.button
          key={mood.name}
          onClick={() => onSelect(mood.name)}
          className={`flex flex-col items-center p-3 rounded-lg border-2 transition-colors duration-200 ${
            selectedMood === mood.name ? "border-green-500 bg-gray-700" : "border-gray-700 hover:bg-gray-700"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <mood.icon size={24} className={`${mood.color}`} />
          <span className="mt-1 text-sm text-gray-300">{mood.name}</span>
        </motion.button>
      ))}
    </div>
  );
};

const HealthJournal = () => {
  const [journalEntries, setJournalEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    symptoms: "",
    mood: "",
    notes: "",
  });

  const [loading, setLoading] = useState(true);

  // Simulate fetching past entries
  useEffect(() => {
    setTimeout(() => {
      const mockEntries = [
        { id: 1, date: "2023-10-25", symptoms: "Mild headache", mood: "Neutral", notes: "Felt a little tired after a long day at work." },
        { id: 2, date: "2023-10-24", symptoms: "No symptoms", mood: "Happy", notes: "Had a great day, went for a run in the morning." },
      ];
      setJournalEntries(mockEntries);
      setLoading(false);
    }, 1000);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleMoodSelect = (mood) => {
    setNewEntry((prev) => ({ ...prev, mood }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newEntry.symptoms && !newEntry.mood && !newEntry.notes) return;

    const entryWithId = {
      ...newEntry,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
    };

    setJournalEntries((prev) => [entryWithId, ...prev]);
    setNewEntry({ date: new Date().toISOString().split('T')[0], symptoms: "", mood: "", notes: "" });
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#13131a] text-white">
        <span className="text-lg text-gray-400">Loading journal...</span>
      </div>
    );
  }

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-[#13131a] p-8 text-white">
      <h1 className="mb-8 text-center text-4xl font-extrabold">My Health Journal</h1>

      {/* Entry Form Section */}
      <motion.div
        className="mx-auto mb-8 w-full max-w-2xl rounded-2xl bg-[#1c1c24] p-6 shadow-xl"
        variants={fadeInVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="mb-4 text-2xl font-bold">New Entry for Today ({newEntry.date})</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="symptoms" className="block text-sm font-medium text-gray-400">Symptoms</label>
            <input
              type="text"
              name="symptoms"
              id="symptoms"
              value={newEntry.symptoms}
              onChange={handleInputChange}
              placeholder="e.g., Headache, fatigue, stomach pain"
              className="mt-1 block w-full rounded-xl border-gray-700 bg-gray-800 p-3 text-white focus:border-green-500 focus:ring-green-500"
            />
          </div>
          <div>
            <label htmlFor="mood" className="block text-sm font-medium text-gray-400">How do you feel today?</label>
            <MoodSelector selectedMood={newEntry.mood} onSelect={handleMoodSelect} />
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-400">Notes</label>
            <textarea
              name="notes"
              id="notes"
              rows="3"
              value={newEntry.notes}
              onChange={handleInputChange}
              placeholder="Any other details about your day or health..."
              className="mt-1 block w-full resize-none rounded-xl border-gray-700 bg-gray-800 p-3 text-white focus:border-green-500 focus:ring-green-500"
            ></textarea>
          </div>
          <motion.button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-green-500 py-3 font-bold text-gray-900 shadow-lg transition-colors duration-200 hover:bg-green-600"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <IconPlus size={20} />
            Save Entry
          </motion.button>
        </form>
      </motion.div>

      {/* Past Entries Section */}
      <div className="mx-auto w-full max-w-2xl">
        <h2 className="mb-4 text-2xl font-bold">Past Entries</h2>
        <motion.div
          className="space-y-4"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate="visible"
        >
          {journalEntries.length > 0 ? (
            journalEntries.map((entry) => (
              <motion.div
                key={entry.id}
                className="rounded-2xl border border-gray-700 bg-[#1c1c24] p-6 shadow-md"
                variants={fadeInVariants}
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-green-400">{entry.date}</h3>
                  <span className="text-sm text-gray-400">Mood: {entry.mood}</span>
                </div>
                <p className="text-gray-300">
                  <span className="font-bold">Symptoms:</span> {entry.symptoms || "None"}
                </p>
                <p className="mt-2 text-gray-300">
                  <span className="font-bold">Notes:</span> {entry.notes || "None"}
                </p>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-400">No entries yet. Start by logging your first entry above!</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default HealthJournal;
