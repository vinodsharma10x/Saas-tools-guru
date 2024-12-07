import { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorMessage } from './ui/ErrorMessage';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorMessage 
          message="Something went wrong. Please refresh the page and try again." 
        />
      );
    }

    return this.props.children;
  }
}