"use client";
import React, { useState } from "react";

const Test: React.FC = () => {
  const languages: string[] = ["C++", "JavaScript", "Python", "Java","Frontend","Backend","someother language goes here"];
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const toggleSelection = (language: string): void => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((lang) => lang !== language)
        : [...prev, language]
    );
  };

  return (
    <div className="p-6 max-w-lg ">
      <h1 className="text-2xl font-bold mb-4">Select Your Expertise</h1>
      <div className="flex flex-wrap gap-3 w-full">
        {languages.map((language) => (
          <button
            key={language}
            onClick={() => toggleSelection(language)}
            className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer border
              ${
                selectedLanguages.includes(language)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300"
              }`}
          >
            {language}
          </button>
        ))}
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Selected Languages:</h2>
        <ul className="list-disc pl-6">
          {selectedLanguages.length > 0 ? (
            selectedLanguages.map((language) => (
              <li key={language} className="text-gray-700">
                {language}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No languages selected yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Test;
