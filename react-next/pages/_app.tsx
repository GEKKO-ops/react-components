import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { setupStore } from '../stores/store';
import '../styles/global.css';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundry';

const store = setupStore();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        {[
          <div key="component-container">
            <Component {...pageProps} />
          </div>,
        ]}
      </ErrorBoundary>
    </Provider>
  );
}
