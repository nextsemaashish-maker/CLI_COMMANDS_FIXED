import React, { useState, useEffect } from 'react';
import {
  Terminal, Monitor, GitBranch, Box, Cloud, Package, Shield,
  CheckCircle2, Circle, ChevronDown, ChevronRight, Search, X,
  Trophy, Folder, FolderOpen, PanelLeftClose
} from 'lucide-react';
import { LESSONS_DATA } from '../data/lessonsData';
import { playKeyClickSound } from '../utils/audioSynth';

const iconMap = {
  Terminal,
  Monitor,
  GitBranch,
  Box,
  Cloud,
  Package,
  Shield
};

export default function Sidebar({
  selectedModuleId,
  setSelectedModuleId,
  selectedLessonId,
  setSelectedLessonId,
  completedLessons,
  onToggleSidebar,
  isMobileDrawer = false,
  onCloseMobileDrawer
}) {
  const [filterQuery, setFilterQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Track expanded modules
  const [expandedModuleIds, setExpandedModuleIds] = useState([selectedModuleId]);

  // Track expanded subtopics { "moduleId-subtopicName": true }
  const [expandedSubtopics, setExpandedSubtopics] = useState({});

  // Sync expanded module when selectedModuleId changes externally
  useEffect(() => {
    if (selectedModuleId && !expandedModuleIds.includes(selectedModuleId)) {
      setExpandedModuleIds((prev) => [...prev, selectedModuleId]);
    }
  }, [selectedModuleId]);

  // Auto-expand active lesson's subtopic
  useEffect(() => {
    if (selectedModuleId && selectedLessonId) {
      const currentModule = LESSONS_DATA.find((m) => m.id === selectedModuleId);
      if (currentModule) {
        const currentLesson = currentModule.lessons.find((l) => l.id === selectedLessonId);
        if (currentLesson) {
          const subKey = `${selectedModuleId}-${currentLesson.subtopic || 'General Operations'}`;
          setExpandedSubtopics((prev) => ({ ...prev, [subKey]: true }));
        }
      }
    }
  }, [selectedModuleId, selectedLessonId]);

  // Toggle Module Open / Closed
  const handleToggleModule = (moduleId) => {
    playKeyClickSound();
    if (expandedModuleIds.includes(moduleId)) {
      setExpandedModuleIds(expandedModuleIds.filter((id) => id !== moduleId));
    } else {
      setExpandedModuleIds([...expandedModuleIds, moduleId]);
      setSelectedModuleId(moduleId);
    }
  };

  // Toggle Subtopic Open / Closed
  const handleToggleSubtopic = (subKey) => {
    playKeyClickSound();
    setExpandedSubtopics((prev) => ({
      ...prev,
      [subKey]: !prev[subKey]
    }));
  };

  // Lesson selection handler
  const handleSelectLesson = (moduleId, lessonId) => {
    playKeyClickSound();
    setSelectedModuleId(moduleId);
    setSelectedLessonId(lessonId);
    if (isMobileDrawer && onCloseMobileDrawer) {
      onCloseMobileDrawer();
    }
  };

  // Overall progress metrics
  const totalAcademyLessons = LESSONS_DATA.reduce((acc, curr) => acc + curr.lessons.length, 0);
  const totalCompletedCount = completedLessons.length;
  const totalIncompleteCount = totalAcademyLessons - totalCompletedCount;
  const academyPercent = Math.round((totalCompletedCount / totalAcademyLessons) * 100);

  const filteredModules = LESSONS_DATA.map((module) => {
    const matchesLesson = (l) => {
      const queryMatch =
        !filterQuery ||
        l.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
        l.summary.toLowerCase().includes(filterQuery.toLowerCase()) ||
        (l.subtopic && l.subtopic.toLowerCase().includes(filterQuery.toLowerCase()));

      const isComp = completedLessons.includes(l.id);
      const statusMatch =
        statusFilter === 'all' ||
        (statusFilter === 'completed' && isComp) ||
        (statusFilter === 'incomplete' && !isComp);

      return queryMatch && statusMatch;
    };

    const matchedLessons = module.lessons.filter(matchesLesson);

    if (matchedLessons.length > 0) {
      return {
        ...module,
        lessons: matchedLessons
      };
    }
    return null;
  }).filter(Boolean);

  return (
    <aside
      className={`glass-panel ${isMobileDrawer ? 'sidebar-mobile-drawer' : ''}`}
      style={{
        width: isMobileDrawer ? '86vw' : '330px',
        minWidth: isMobileDrawer ? 'auto' : '330px',
        maxWidth: isMobileDrawer ? '360px' : '360px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        borderRight: '1px solid rgba(16, 185, 129, 0.25)',
        background: '#05080e',
        flexShrink: 0
      }}
    >
      {/* High-Contrast Cyber Green, Black & White Progression Card */}
      <div
        style={{
          padding: '12px 14px',
          borderBottom: '1px solid rgba(16, 185, 129, 0.25)',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(5, 8, 14, 0.95) 100%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          flexShrink: 0
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff' }}>
            <div
              className="pulse-glow"
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.2)',
                border: '1px solid #10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Trophy size={13} color="#00ff88" />
            </div>
            <span
              style={{
                fontSize: '0.84rem',
                fontWeight: 800,
                fontFamily: 'var(--font-display)',
                color: '#ffffff',
                letterSpacing: '-0.2px'
              }}
            >
              Curriculum Map
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                color: '#00ff88',
                fontWeight: 700,
                background: 'rgba(16, 185, 129, 0.15)',
                padding: '2px 7px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(16, 185, 129, 0.4)'
              }}
            >
              {totalCompletedCount}/{totalAcademyLessons} ({academyPercent}%)
            </span>

            {/* Mobile Drawer Close Button */}
            {isMobileDrawer ? (
              <button
                onClick={onCloseMobileDrawer}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '6px',
                  color: '#ffffff',
                  cursor: 'pointer',
                  padding: '4px 6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Close Drawer"
              >
                <X size={16} />
              </button>
            ) : (
              onToggleSidebar && (
                <button
                  onClick={onToggleSidebar}
                  title="Collapse Sidebar (Ctrl + B)"
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(16, 185, 129, 0.35)',
                    borderRadius: '6px',
                    color: '#00ff88',
                    cursor: 'pointer',
                    padding: '4px 6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <PanelLeftClose size={15} />
                </button>
              )
            )}
          </div>
        </div>

        {/* Multi-Color Gradient Progress Bar */}
        <div
          style={{
            height: '4px',
            width: '100%',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${academyPercent}%`,
              background: 'linear-gradient(90deg, #10b981 0%, #00ff88 50%, #34d399 100%)',
              boxShadow: '0 0 10px rgba(16, 185, 129, 0.6)',
              transition: 'width 0.4s ease'
            }}
          />
        </div>
      </div>

      {/* Search & Segmented Filter Header */}
      <div
        style={{
          padding: '10px 12px',
          borderBottom: '1px solid rgba(16, 185, 129, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          flexShrink: 0,
          background: '#05080e'
        }}
      >
        {/* Search Input Box */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '8px',
            padding: '5px 9px',
            boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.5)'
          }}
        >
          <Search size={14} color="#00ff88" />
          <input
            type="text"
            placeholder="Search 700+ lessons..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono)',
              outline: 'none'
            }}
          />
          {filterQuery && (
            <button
              onClick={() => setFilterQuery('')}
              style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: 0, display: 'flex' }}
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Segmented Filter Track */}
        <div
          style={{
            display: 'flex',
            background: 'rgba(0, 0, 0, 0.7)',
            padding: '2px',
            borderRadius: '8px',
            border: '1px solid rgba(16, 185, 129, 0.25)'
          }}
        >
          {[
            { id: 'all', label: 'All', count: totalAcademyLessons },
            { id: 'completed', label: 'Done', count: totalCompletedCount },
            { id: 'incomplete', label: 'Left', count: totalIncompleteCount }
          ].map((tab) => {
            const isActive = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playKeyClickSound();
                  setStatusFilter(tab.id);
                }}
                style={{
                  flex: 1,
                  padding: '4px 3px',
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-mono)',
                  borderRadius: '6px',
                  border: isActive ? '1px solid #10b981' : '1px solid transparent',
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(0, 255, 136, 0.15) 100%)'
                    : 'transparent',
                  color: isActive ? '#00ff88' : '#cbd5e1',
                  cursor: 'pointer',
                  fontWeight: isActive ? 700 : 500,
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <span>{tab.label}</span>
                <span
                  style={{
                    fontSize: '0.6rem',
                    opacity: isActive ? 1 : 0.7,
                    background: isActive ? 'rgba(16, 185, 129, 0.35)' : 'rgba(255, 255, 255, 0.06)',
                    padding: '0 4px',
                    borderRadius: '3px',
                    color: isActive ? '#ffffff' : '#94a3b8'
                  }}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modules Accordion Scroll Container */}
      <div
        className="sidebar-scroll-container"
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          padding: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}
      >
        {filteredModules.map((module) => {
          const IconComp = iconMap[module.icon] || Terminal;
          const isModuleExpanded = expandedModuleIds.includes(module.id);
          const isModuleSelected = selectedModuleId === module.id;
          const completedCount = module.lessons.filter((l) => completedLessons.includes(l.id)).length;
          const totalCount = module.lessons.length;
          const progressPercent = Math.round((completedCount / totalCount) * 100);
          const themeColor = module.color || '#10b981';

          // Group lessons by subtopic
          const subtopicsGrouped = module.lessons.reduce((acc, lesson) => {
            const sub = lesson.subtopic || 'General Operations';
            if (!acc[sub]) acc[sub] = [];
            acc[sub].push(lesson);
            return acc;
          }, {});

          return (
            <div
              key={module.id}
              style={{
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                flexShrink: 0
              }}
            >
              {/* Module Header Card */}
              <div
                onClick={() => handleToggleModule(module.id)}
                style={{
                  padding: '9px 11px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '9px',
                  userSelect: 'none',
                  borderRadius: '9px',
                  border: isModuleExpanded ? `1px solid ${themeColor}40` : '1px solid rgba(255, 255, 255, 0.05)',
                  background: isModuleExpanded
                    ? `linear-gradient(90deg, ${themeColor}12 0%, rgba(255, 255, 255, 0.02) 100%)`
                    : 'rgba(255, 255, 255, 0.02)',
                  boxShadow: isModuleExpanded ? `0 0 14px ${themeColor}15` : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '7px',
                    background: `${themeColor}22`,
                    border: `1px solid ${themeColor}44`,
                    color: themeColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <IconComp size={15} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: isModuleSelected ? 700 : 600,
                      color: isModuleSelected ? '#ffffff' : 'var(--text-secondary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      fontFamily: 'var(--font-display)'
                    }}
                  >
                    {module.title}
                  </div>
                  <div
                    style={{
                      fontSize: '0.66rem',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '2px',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    <span>{completedCount}/{totalCount} Done</span>
                    <span
                      style={{
                        color: themeColor,
                        fontWeight: 700,
                        background: `${themeColor}18`,
                        border: `1px solid ${themeColor}33`,
                        padding: '0 5px',
                        borderRadius: '3px'
                      }}
                    >
                      {progressPercent}%
                    </span>
                  </div>
                </div>

                <div style={{ color: isModuleExpanded ? themeColor : 'var(--text-muted)', display: 'flex', opacity: 0.9 }}>
                  {isModuleExpanded ? <ChevronDown size={14} color={themeColor} /> : <ChevronRight size={14} />}
                </div>
              </div>

              {/* Expanded Subtopics */}
              {isModuleExpanded && (
                <div
                  className="animate-slide-in"
                  style={{
                    padding: '4px 0 4px 10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    borderLeft: `1px solid ${themeColor}35`,
                    marginLeft: '14px',
                    marginTop: '3px'
                  }}
                >
                  {Object.entries(subtopicsGrouped).map(([subtopicName, lessonsInSubtopic]) => {
                    const subKey = `${module.id}-${subtopicName}`;
                    const isSubExpanded = !!expandedSubtopics[subKey];
                    const subCompletedCount = lessonsInSubtopic.filter((l) => completedLessons.includes(l.id)).length;

                    return (
                      <div key={subtopicName} style={{ display: 'flex', flexDirection: 'column' }}>
                        {/* Subtopic Folder Card */}
                        <div
                          onClick={() => handleToggleSubtopic(subKey)}
                          style={{
                            fontSize: '0.74rem',
                            fontWeight: isSubExpanded ? 700 : 500,
                            color: isSubExpanded ? '#ffffff' : 'var(--text-secondary)',
                            padding: '5px 7px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            userSelect: 'none',
                            borderRadius: '5px',
                            background: isSubExpanded ? `${themeColor}15` : 'rgba(255, 255, 255, 0.02)',
                            border: isSubExpanded ? `1px solid ${themeColor}30` : '1px solid transparent',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', minWidth: 0 }}>
                            {isSubExpanded ? <FolderOpen size={13} color={themeColor} /> : <Folder size={13} color="var(--text-muted)" />}
                            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {subtopicName}
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
                            <span style={{ fontSize: '0.64rem', color: themeColor, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                              {subCompletedCount}/{lessonsInSubtopic.length}
                            </span>
                            {isSubExpanded ? <ChevronDown size={12} color={themeColor} /> : <ChevronRight size={12} />}
                          </div>
                        </div>

                        {/* Lessons in Subtopic */}
                        {isSubExpanded && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingLeft: '6px', marginTop: '2px' }}>
                            {lessonsInSubtopic.map((lesson) => {
                              const isCompleted = completedLessons.includes(lesson.id);
                              const isLessonSelected = selectedLessonId === lesson.id;

                              return (
                                <button
                                  key={lesson.id}
                                  onClick={() => handleSelectLesson(module.id, lesson.id)}
                                  style={{
                                    width: '100%',
                                    textAlign: 'left',
                                    padding: '6px 8px',
                                    border: 'none',
                                    borderLeft: isLessonSelected ? `3px solid ${themeColor}` : '3px solid transparent',
                                    borderRadius: '0 5px 5px 0',
                                    background: isLessonSelected ? `linear-gradient(90deg, ${themeColor}25 0%, transparent 100%)` : 'transparent',
                                    color: isLessonSelected ? '#ffffff' : isCompleted ? 'var(--text-secondary)' : 'var(--text-primary)',
                                    fontSize: '0.78rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '7px',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s ease'
                                  }}
                                >
                                  <div style={{ flexShrink: 0, display: 'flex' }}>
                                    {isCompleted ? (
                                      <CheckCircle2 size={12} color={themeColor} />
                                    ) : (
                                      <Circle size={12} color="var(--text-muted)" />
                                    )}
                                  </div>
                                  <span
                                    style={{
                                      flex: 1,
                                      fontWeight: isLessonSelected ? 600 : 400,
                                      lineHeight: 1.3,
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis'
                                    }}
                                  >
                                    {lesson.title}
                                  </span>
                                  <span
                                    style={{
                                      fontSize: '0.62rem',
                                      fontFamily: 'var(--font-mono)',
                                      color: themeColor,
                                      opacity: isLessonSelected ? 1 : 0.7,
                                      flexShrink: 0,
                                      background: `${themeColor}18`,
                                      border: `1px solid ${themeColor}33`,
                                      padding: '1px 4px',
                                      borderRadius: '3px',
                                      fontWeight: 700
                                    }}
                                  >
                                    +{lesson.xp}XP
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
