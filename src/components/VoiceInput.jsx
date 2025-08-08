import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './VoiceInput.css';

const VoiceInput = ({ onVoiceResult, placeholder = "Click to speak...", className = "" }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [supportedLanguages, setSupportedLanguages] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState('auto');
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const { token } = useAuth();

  useEffect(() => {
    fetchSupportedLanguages();
  }, []);

  const fetchSupportedLanguages = async () => {
    try {
      const response = await fetch('/api/voice/languages');
      const data = await response.json();
      if (data.success) {
        setSupportedLanguages(data.data);
      }
    } catch (error) {
      console.error('Error fetching languages:', error);
    }
  };

  const startRecording = async () => {
    try {
      setError(null);
      audioChunksRef.current = [];
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true
        } 
      });
      
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        await processAudio();
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      setError('Microphone access denied. Please allow microphone permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsProcessing(true);
    }
  };

  const processAudio = async () => {
    try {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      const formData = new FormData();
      formData.append('audio', audioBlob, 'voice-input.webm');

      const response = await fetch('/api/voice/process', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      
      if (data.success) {
        onVoiceResult(data.data);
      } else {
        setError(data.error || 'Voice processing failed');
      }
    } catch (error) {
      console.error('Error processing audio:', error);
      setError('Failed to process voice input. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTranslateText = async (text, sourceLanguage) => {
    try {
      const response = await fetch('/api/voice/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          text,
          sourceLanguage: sourceLanguage || 'auto'
        })
      });

      const data = await response.json();
      
      if (data.success) {
        onVoiceResult(data.data);
      } else {
        setError(data.error || 'Translation failed');
      }
    } catch (error) {
      console.error('Error translating text:', error);
      setError('Failed to translate text. Please try again.');
    }
  };

  const getLanguageName = (code) => {
    return supportedLanguages[code] || code;
  };

  return (
    <div className={`voice-input-container ${className}`}>
      <div className="voice-controls">
        <button
          type="button"
          className={`voice-button ${isRecording ? 'recording' : ''} ${isProcessing ? 'processing' : ''}`}
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isProcessing}
          title={isRecording ? 'Click to stop recording' : 'Click to start recording'}
        >
          <div className="voice-icon">
            {isProcessing ? (
              <div className="spinner"></div>
            ) : isRecording ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="6" width="12" height="12" rx="2" ry="2"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
              </svg>
            )}
          </div>
        </button>
        
        <div className="voice-status">
          {isRecording && (
            <div className="recording-indicator">
              <span className="pulse"></span>
              Recording...
            </div>
          )}
          {isProcessing && (
            <div className="processing-indicator">
              Processing voice input...
            </div>
          )}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </div>
      </div>

      <div className="language-selector">
        <label htmlFor="language-select">Preferred Language:</label>
        <select
          id="language-select"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="language-select"
        >
          <option value="auto">Auto-detect</option>
          {Object.entries(supportedLanguages).map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="voice-info">
        <p className="supported-languages">
          <strong>Supported Languages:</strong> English, Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi
        </p>
        <p className="voice-tips">
          <strong>Tips:</strong> Speak clearly and in a quiet environment for best results.
        </p>
      </div>
    </div>
  );
};

export default VoiceInput; 