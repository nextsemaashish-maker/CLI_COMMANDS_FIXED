import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, XCircle, Award, HelpCircle, ArrowRight, RotateCcw, Trophy, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playKeyClickSound, playSuccessBeep } from '../utils/audioSynth';

export default function QuizModal({ quiz, xpReward, onClose, onQuizSuccess }) {
  const questionsList = quiz?.questions || (quiz?.question ? [quiz] : []);
  const totalQuestions = questionsList.length;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const autoAdvanceTimerRef = useRef(null);

  const currentQ = questionsList[currentQuestionIndex] || {
    question: 'Default Question',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctIndex: 0,
    explanation: 'Explanation unavailable'
  };

  // Clean up auto-advance timer on unmount or question change
  useEffect(() => {
    return () => {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
    };
  }, [currentQuestionIndex]);

  const handleSelectOption = (index) => {
    if (isSubmitted) return;
    playKeyClickSound();
    setSelectedOption(index);
    setIsSubmitted(true);

    const isCorrect = index === currentQ.correctIndex;
    if (isCorrect) {
      playSuccessBeep();
      setScore((prev) => prev + 1);
    }

    // Clear any previous timer
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
    }

    // Automatically transition to next question after a short delay (1.6s)
    autoAdvanceTimerRef.current = setTimeout(() => {
      advanceToNext(index, isCorrect);
    }, 1600);
  };

  const advanceToNext = (chosenIndex = selectedOption, wasCorrect) => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }

    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setIsFinished(true);
      const isRight = wasCorrect ?? (chosenIndex === currentQ.correctIndex);
      const finalScore = score + (isRight ? 1 : 0);
      const isPassing = finalScore >= Math.ceil(totalQuestions * 0.6);

      if (isPassing) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
        onQuizSuccess(xpReward);
      }
    }
  };

  const handleManualNext = () => {
    playKeyClickSound();
    advanceToNext(selectedOption);
  };

  const handleRestartQuiz = () => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
    playKeyClickSound();
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(2, 4, 3, 0.88)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 3000,
        padding: '16px'
      }}
    >
      <div
        className="hud-card animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '620px',
          maxHeight: '90vh',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          background: '#05080e',
          border: '1px solid var(--accent-green)',
          borderRadius: 'var(--radius-md)',
          padding: '24px',
          boxShadow: '0 0 40px rgba(16, 185, 129, 0.35)',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn-ghost"
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            padding: '4px',
            color: 'var(--text-muted)'
          }}
          title="Close Quiz"
        >
          <X size={18} />
        </button>

        {!isFinished ? (
          <>
            {/* Header & Stepper Progress */}
            <div style={{ marginBottom: '16px', paddingRight: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--accent-green)',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    fontSize: '0.82rem'
                  }}
                >
                  <HelpCircle size={16} />
                  <span>QUESTION {currentQuestionIndex + 1} OF {totalQuestions}</span>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    color: '#00ff88'
                  }}
                >
                  +{xpReward} XP
                </span>
              </div>

              {/* Progress Bar */}
              <div
                style={{
                  height: '5px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: 'var(--radius-full)',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${progressPercent}%`,
                    background: 'linear-gradient(90deg, #10b981 0%, #00ff88 100%)',
                    boxShadow: '0 0 8px #00ff88',
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>
            </div>

            {/* Question Prompt */}
            <h3
              style={{
                fontSize: 'clamp(1rem, 2.8vw, 1.15rem)',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '16px',
                lineHeight: 1.45,
                fontFamily: 'var(--font-display)'
              }}
            >
              {currentQ.question}
            </h3>

            {/* Multiple Choice Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let optionStyle = {
                  background: 'rgba(0, 0, 0, 0.6)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)'
                };

                if (isSubmitted) {
                  if (isCorrect) {
                    optionStyle = {
                      background: 'rgba(16, 185, 129, 0.25)',
                      border: '1px solid var(--accent-green)',
                      color: '#ffffff',
                      boxShadow: '0 0 14px rgba(16, 185, 129, 0.4)'
                    };
                  } else if (isSelected && !isCorrect) {
                    optionStyle = {
                      background: 'rgba(239, 68, 68, 0.2)',
                      border: '1px solid #ef4444',
                      color: '#ffaaaa'
                    };
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isSubmitted}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-sm)',
                      cursor: isSubmitted ? 'default' : 'pointer',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.84rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      transition: 'all 0.15s ease',
                      ...optionStyle
                    }}
                  >
                    <div
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        border: isSelected ? '2px solid var(--accent-green)' : '1px solid var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        flexShrink: 0
                      }}
                    >
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span style={{ flex: 1, lineHeight: 1.35 }}>{opt}</span>
                    {isSubmitted && isCorrect && <CheckCircle2 size={16} color="var(--accent-green)" />}
                    {isSubmitted && isSelected && !isCorrect && <XCircle size={16} color="#ef4444" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation Callout Box & Auto-advance Indicator */}
            {isSubmitted && (
              <div
                className="animate-fade-in"
                style={{
                  padding: '12px 14px',
                  background: 'rgba(16, 185, 129, 0.08)',
                  borderLeft: '3px solid var(--accent-green)',
                  borderRadius: 'var(--radius-xs)',
                  marginBottom: '16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3px' }}>
                  <div
                    style={{
                      fontSize: '0.76rem',
                      fontWeight: 800,
                      color: 'var(--accent-green)',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    EXPLANATION:
                  </div>
                  <div
                    style={{
                      fontSize: '0.7rem',
                      color: '#00ff88',
                      fontFamily: 'var(--font-mono)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Clock size={12} /> Auto-advancing...
                  </div>
                </div>
                <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                  {currentQ.explanation}
                </div>
              </div>
            )}

            {/* Submit / Next Controls */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              {isSubmitted && (
                <button
                  onClick={handleManualNext}
                  className="btn-primary"
                  style={{ padding: '8px 18px', fontSize: '0.82rem' }}
                >
                  {currentQuestionIndex + 1 < totalQuestions ? (
                    <>Next Question <ArrowRight size={15} /></>
                  ) : (
                    <>Finish Quiz & Claim XP <Trophy size={15} /></>
                  )}
                </button>
              )}
            </div>
          </>
        ) : (
          /* Final Quiz Results Screen */
          <div style={{ textAlign: 'center', padding: '10px 0' }} className="animate-fade-in">
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.2)',
                border: '2px solid var(--accent-green)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)'
              }}
            >
              <Trophy size={34} color="var(--accent-green)" />
            </div>

            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                marginBottom: '6px',
                fontFamily: 'var(--font-display)',
                color: '#ffffff'
              }}
            >
              Quiz Challenge Completed!
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
              You answered <span style={{ color: '#00ff88', fontWeight: 800 }}>{score} out of {totalQuestions}</span> questions correctly ({Math.round((score / totalQuestions) * 100)}%).
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 20px',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid var(--accent-green)',
                borderRadius: 'var(--radius-full)',
                color: 'var(--accent-green)',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                fontSize: '0.9rem',
                marginBottom: '22px'
              }}
            >
              <Award size={18} /> +{xpReward} XP AWARDED
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button onClick={handleRestartQuiz} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
                <RotateCcw size={14} /> Retake Quiz
              </button>
              <button onClick={onClose} className="btn-primary" style={{ padding: '8px 18px', fontSize: '0.82rem' }}>
                Continue Learning <CheckCircle2 size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
