import { Component, ErrorInfo } from 'react';
import '../components.css';

interface IError {
  hasError: boolean;
}

type Props = Record<string, JSX.Element[]>;

class ErrorBoundary extends Component<Props, IError> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <div className="error-boundary">Something went wrong!</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
