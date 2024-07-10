import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'uno.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Error from './pages/Error.tsx';
import { Provider } from 'react-redux';
import { store } from './state/store.ts';
import { useEffect } from 'react';
import { connectWebSocket } from './websocket.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />
  },
  {
    path: '/game',
    element: <App />
  }
]);

const Main = () => {
  useEffect(() => {
    connectWebSocket();
  }, []);

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Main />
  </Provider>
);
