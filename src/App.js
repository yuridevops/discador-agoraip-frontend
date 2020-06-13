import React from 'react';
import Routes from './routes'
import AuthContextProvider from './contexts/AuthContext'
import ConnectionContextProvider from './contexts/ConnectionContext';

function App() {

  return (
    <div>
      <ConnectionContextProvider>
        <AuthContextProvider>
          <Routes />
        </AuthContextProvider>
      </ConnectionContextProvider>
    </div>
  );
}

export default App;
