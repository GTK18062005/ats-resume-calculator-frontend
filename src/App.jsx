import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import JobDescriptionInput from './components/JobDescriptionInput';
import ModelSelector from './components/ModelSelector';
import ScoreCard from './components/ScoreCard';
import DetailedAnalysis from './components/DetailedAnalysis';
import LoadingSpinner from './components/LoadingSpinner';
import { analyzeResume, analyzeWithAllModels } from './services/api';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [selectedModel, setSelectedModel] = useState('grok');
  const [compareMode, setCompareMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError('Please upload a resume file');
      return;
    }
    if (!jobDescription.trim()) {
      setError('Please enter a job description');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('resumeFile', selectedFile);
    formData.append('jobDescription', jobDescription);
    if (!compareMode) {
      formData.append('modelProvider', selectedModel);
    }

    try {
      let response;
      if (compareMode) {
        response = await analyzeWithAllModels(formData);
      } else {
        response = await analyzeResume(formData);
      }
      setResult(response);
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Error analyzing resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderResults = () => {
    if (!result) return null;

    const { data } = result;

    if (compareMode && data.allScores) {
      return (
        <div className="results-container">
          <h3 style={{ marginBottom: 20 }}>📊 Comparison Results</h3>
          {Object.entries(data.allScores).map(([model, score]) => (
            score && (
              <div key={model} style={{ marginBottom: 30 }}>
                <h4 style={{ color: '#667eea' }}>
                  {model.charAt(0).toUpperCase() + model.slice(1)} Model
                </h4>
                <ScoreCard scores={score} />
                <DetailedAnalysis analysis={{
                  detailedAnalysis: score.detailedAnalysis,
                  feedback: score.feedback,
                  modelUsed: score.modelUsed,
                  processingTime: score.processingTime
                }} />
              </div>
            )
          ))}
          {data.bestModel && (
            <div style={{
              background: '#e8f5e9',
              padding: 15,
              borderRadius: 10,
              marginTop: 20,
              textAlign: 'center'
            }}>
              <h4 style={{ color: '#2e7d32' }}>
                🏆 Best Performing Model: {data.bestModel.charAt(0).toUpperCase() + data.bestModel.slice(1)}
              </h4>
            </div>
          )}
        </div>
      );
    }

    const { score } = data;
    return (
      <div className="results-container">
        <ScoreCard scores={score} />
        <DetailedAnalysis analysis={{
          detailedAnalysis: score.detailedAnalysis,
          feedback: score.feedback,
          modelUsed: score.modelUsed,
          processingTime: score.processingTime
        }} />
        <div style={{ marginTop: 20, padding: 15, background: '#f5f5f5', borderRadius: 10 }}>
          <h4 style={{ marginBottom: 10 }}>📄 Resume Information</h4>
          <p><strong>File:</strong> {data.fileName}</p>
          <p><strong>Model Used:</strong> {score.modelUsed}</p>
          <p><strong>Processing Time:</strong> {score.processingTime}ms</p>
        </div>
      </div>
    );
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>📄 ATS Resume Calculator</h1>
        <p>Optimize your resume for Applicant Tracking Systems</p>
      </div>

      <div className="main-card">
        <FileUpload 
          onFileSelect={setSelectedFile} 
          selectedFile={selectedFile} 
        />

        <JobDescriptionInput 
          value={jobDescription}
          onChange={setJobDescription}
        />

        <ModelSelector 
          selectedModel={selectedModel}
          onModelSelect={setSelectedModel}
          compareMode={compareMode}
          onCompareToggle={() => setCompareMode(!compareMode)}
        />

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        <button 
          className="analyze-btn"
          onClick={handleAnalyze}
          disabled={loading || !selectedFile || !jobDescription.trim()}
        >
          {loading ? 'Analyzing...' : `🚀 ${compareMode ? 'Compare All Models' : 'Analyze Resume'}`}
        </button>

        {loading && <LoadingSpinner />}

        {result && renderResults()}
      </div>
    </div>
  );
}

export default App;