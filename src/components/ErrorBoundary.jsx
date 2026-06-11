import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, info) {
    console.error('Section crashed:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-3)', fontSize: '14px' }}>
          <p>⚠ Section failed to load — {this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false })} style={{ marginTop: 12, padding: '8px 16px', background: 'none', border: '1px solid var(--border)', borderRadius: 8, cursor: 'pointer', color: 'var(--text-2)', fontFamily: 'inherit' }}>
            Retry
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
