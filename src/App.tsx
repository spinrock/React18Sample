import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import DemoSuspense from './components/DemoSuspense';

function App() {
  return (
    <div className="App">
      <Suspense fallback={<h1>Loading profile...</h1>}>
        <DemoSuspense />
      </Suspense>
    </div>
  );
}

export default App;
