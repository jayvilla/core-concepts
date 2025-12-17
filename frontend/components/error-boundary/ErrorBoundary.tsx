"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

/**
 * ERROR BOUNDARY CLASS COMPONENT
 *
 * Error Boundaries must be class components (as of React 18, no hooks equivalent yet)
 * They catch errors in child component trees and display fallback UI
 */

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  // This lifecycle method is called when an error is thrown
  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  // This lifecycle method is called after an error has been thrown
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    
    // Call optional onError callback
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Update state with error info
    this.setState({
      error,
      errorInfo,
    });
  }

  // Reset error boundary
  resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Render custom fallback UI or default
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="p-4 bg-red-50 border-2 border-red-300 rounded-lg">
          <h3 className="font-bold text-red-900 mb-2">⚠️ Something went wrong</h3>
          <p className="text-sm text-gray-900 mb-3">
            An error occurred in this component tree. The error has been caught by the Error Boundary.
          </p>
          {this.state.error && (
            <details className="mb-3">
              <summary className="text-sm font-semibold text-gray-900 cursor-pointer">
                Error Details
              </summary>
              <pre className="text-xs bg-white p-2 rounded border border-red-200 mt-2 overflow-x-auto">
                <code className="text-red-800">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </code>
              </pre>
            </details>
          )}
          <button
            onClick={this.resetErrorBoundary}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

