import React from 'react';
import AppHeader from './components/appHeader/appHeader';
import MainBlock from './components/mainBlock/mainBlock';

import { data } from './utils/data';
function App() {
  return (
    <div className='App'>
      <div className='appWrapper'>
        <AppHeader />
        <MainBlock data={data} />
      </div>
    </div>
  );
}

export default App;
