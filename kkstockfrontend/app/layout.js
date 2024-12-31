'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Add redux-persist integration
import store, { persistor } from '../store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure styles for ToastContainer are included

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          {/* PersistGate ensures the state is rehydrated */}
          <PersistGate loading={null} persistor={persistor}>
            <ToastContainer />
            {children}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
