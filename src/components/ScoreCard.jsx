import React from 'react';

const ScoreCard = ({ scores }) => {
  if (!scores) return null;

  const scoreItems = [
    { key: 'overallScore', label: 'Overall Score', color: '#4CAF50' },
    { key: 'keywordMatchScore', label: 'Keyword Match', color: '#2196F3' },
    { key: 'formattingScore', label: 'Formatting', color: '#FF9800' },
    { key: 'readabilityScore', label: 'Readability', color: '#9C27B0' },
    { key: 'sectionCompletenessScore', label: 'Completeness', color: '#00BCD4' },
    { key: 'experienceMatchScore', label: 'Experience Match', color: '#FF5722' },
    { key: 'educationMatchScore', label: 'Education Match', color: '#795548' },
    { key: 'skillsMatchScore', label: 'Skills Match', color: '#607D8B' },
  ];

  return (
    <div className="score-grid">
      {scoreItems.map((item) => (
        <div key={item.key} className="score-card">
          <div className="score-value">{Math.round(scores[item.key] || 0)}%</div>
          <div className="score-label">{item.label}</div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ 
                width: `${scores[item.key] || 0}%`,
                background: item.color 
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScoreCard;