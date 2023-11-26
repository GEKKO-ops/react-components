import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../pages/_app';
import { Router } from 'next/router';

const TestComponent = () => <div>Test Component</div>;

test('snapshot testing', async () => {
  const mockRouter: Partial<Router> = {
    basePath: '',
    pathname: '/',
    route: '/',
    asPath: '/',
    query: {},
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
  };

  render(
    <App
      Component={TestComponent}
      pageProps={{}}
      router={mockRouter as Router}
    />
  );

  expect(screen.getByText('Test Component')).toBeInTheDocument();
});
