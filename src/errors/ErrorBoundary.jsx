import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application Error:', error);
    console.error('Component Stack:', errorInfo);

    // Future:
    // Sentry.captureException(error);
    // LogRocket.captureException(error);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-app px-6">
          <div className="w-full max-w-lg rounded-xl border border-app bg-soft p-8 shadow-lg">
            <h1 className="text-2xl font-bold text-app">
              Something went wrong
            </h1>

            <p className="mt-3 text-soft">
              An unexpected error occurred while rendering this page.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <pre className="mt-6 overflow-auto rounded-lg bg-muted p-4 text-sm">
                {this.state.error.message}
              </pre>
            )}

            <button
              onClick={this.handleReload}
              className="mt-6 rounded-lg bg-[var(--brand)] px-5 py-2 text-white"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;