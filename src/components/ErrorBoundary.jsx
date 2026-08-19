import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught error in NextSem CLI App:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          height: '100vh',
          width: '100vw',
          background: '#090d14',
          color: '#00ff66',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: 'monospace'
        }}>
          <div style={{
            background: 'rgba(255, 0, 0, 0.08)',
            border: '1px solid #ef4444',
            borderRadius: '12px',
            padding: '32px',
            maxWidth: '560px',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(0,0,0,0.8)'
          }}>
            <AlertTriangle size={48} color="#ef4444" style={{ marginBottom: '16px' }} />
            <h2 style={{ color: '#ffffff', margin: '0 0 12px 0' }}>SYSTEM EXCEPTION DETECTED</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '20px', lineHeight: 1.5 }}>
              An unexpected error occurred while rendering the interactive terminal shell environment.
            </p>
            <pre style={{
              background: '#020b12',
              color: '#f87171',
              padding: '12px',
              borderRadius: '6px',
              fontSize: '0.75rem',
              textAlign: 'left',
              overflowX: 'auto',
              marginBottom: '24px',
              border: '1px solid rgba(239, 68, 68, 0.3)'
            }}>
              {this.state.error?.toString() || 'Unknown Error'}
            </pre>
            <button
              onClick={this.handleReset}
              style={{
                background: '#10b981',
                color: '#000',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <RefreshCw size={16} /> Reboot Application System
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
