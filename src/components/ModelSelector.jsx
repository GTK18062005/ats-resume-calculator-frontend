import React from 'react';

const models = [
  { id: 'grok', label: 'Grok (xAI)', icon: '🤖' },
  { id: 'gemini', label: 'Gemini Pro', icon: '🌟' },
  { id: 'openrouter', label: 'OpenRouter', icon: '🔮' },
];

const ModelSelector = ({ selectedModel, onModelSelect, compareMode, onCompareToggle }) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ marginBottom: 10, color: '#333' }}>Select AI Model</h3>
        <button
          onClick={onCompareToggle}
          className={`model-btn ${compareMode ? 'active' : ''}`}
          style={{ padding: '8px 20px', fontSize: '0.9rem' }}
        >
          {compareMode ? '📊 Compare Mode ON' : '🔀 Compare All Models'}
        </button>
      </div>

      <div className="model-selector">
        {models.map((model) => (
          <button
            key={model.id}
            className={`model-btn ${selectedModel === model.id && !compareMode ? 'active' : ''}`}
            onClick={() => onModelSelect(model.id)}
            disabled={compareMode}
          >
            {model.icon} {model.label}
          </button>
        ))}
      </div>

      {compareMode && (
        <div style={{ 
          background: '#e3f2fd', 
          padding: 10, 
          borderRadius: 8, 
          marginTop: 10,
          color: '#1565c0'
        }}>
          🔍 Comparing results from all AI models
        </div>
      )}
    </div>
  );
};

export default ModelSelector;