import React from 'react';

interface MoodSelectorProps {
  mood: string;
  onMoodChange: (mood: string) => void;
}

const moods = [
  { emoji: '😊', label: 'Happy', value: 'happy' },
  { emoji: '😄', label: 'Excited', value: 'excited' },
  { emoji: '😌', label: 'Calm', value: 'calm' },
  { emoji: '😴', label: 'Tired', value: 'tired' },
  { emoji: '😔', label: 'Sad', value: 'sad' },
  { emoji: '😠', label: 'Angry', value: 'angry' },
  { emoji: '😰', label: 'Anxious', value: 'anxious' },
  { emoji: '😎', label: 'Confident', value: 'confident' },
];

const MoodSelector: React.FC<MoodSelectorProps> = ({ mood, onMoodChange }) => {
  const currentMood = moods.find(m => m.value === mood);

  return (
    <div className="flex items-center gap-4">
      <div className="text-sm text-gray-600 font-medium">How are you feeling?</div>
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
        {moods.map((moodOption) => (
          <button
            key={moodOption.value}
            onClick={() => onMoodChange(moodOption.value)}
            className={`
              p-2 rounded-lg transition-all duration-200 text-xl
              ${mood === moodOption.value
                ? 'bg-white shadow-sm transform scale-110'
                : 'hover:bg-white/50 hover:scale-105'
              }
            `}
            title={moodOption.label}
          >
            {moodOption.emoji}
          </button>
        ))}
      </div>
      {currentMood && (
        <div className="text-sm text-gray-700 font-medium">
          {currentMood.label}
        </div>
      )}
    </div>
  );
};

export default MoodSelector;