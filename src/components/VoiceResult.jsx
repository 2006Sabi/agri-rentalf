import React from 'react';
import './VoiceResult.css';

const VoiceResult = ({ result, onUseTranslation, onUseOriginal, className = "" }) => {
  if (!result) return null;

  const {
    originalText,
    translatedText,
    detectedLanguage,
    confidence,
    languageName
  } = result;

  const isEnglish = detectedLanguage === 'en';
  const confidencePercentage = Math.round(confidence * 100);

  return (
    <div className={`voice-result ${className}`}>
      <div className="result-header">
        <div className="language-info">
          <span className="language-badge">
            {languageName} ({detectedLanguage.toUpperCase()})
          </span>
          {confidence > 0 && (
            <span className="confidence-badge">
              {confidencePercentage}% confidence
            </span>
          )}
        </div>
      </div>

      <div className="result-content">
        {!isEnglish && (
          <div className="original-text-section">
            <h4 className="section-title">Original Text ({languageName})</h4>
            <div className="text-content">
              <p className="original-text">{originalText}</p>
              <button
                className="use-text-btn"
                onClick={() => onUseOriginal && onUseOriginal(originalText)}
                title="Use original text"
              >
                Use Original
              </button>
            </div>
          </div>
        )}

        <div className="translated-text-section">
          <h4 className="section-title">
            {isEnglish ? 'Recognized Text' : 'Translated to English'}
          </h4>
          <div className="text-content">
            <p className="translated-text">{translatedText}</p>
            <button
              className="use-text-btn primary"
              onClick={() => onUseTranslation && onUseTranslation(translatedText)}
              title="Use translated text"
            >
              Use Translation
            </button>
          </div>
        </div>
      </div>

      {!isEnglish && (
        <div className="translation-note">
          <svg viewBox="0 0 24 24" fill="currentColor" className="info-icon">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span>
            Your voice was detected as {languageName} and automatically translated to English.
          </span>
        </div>
      )}
    </div>
  );
};

export default VoiceResult; 