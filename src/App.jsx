import React, { useState, useEffect } from 'react';
import AppHeader from './components/appHeader/appHeader';
import MainBlock from './components/mainBlock/mainBlock';

const DATA_URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(DATA_URL)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setData(data.data);
      })
      .catch((e) => setError(e));
  }, []);

  return (
    <div className='App'>
      {data && (
        <div className='appWrapper'>
          <AppHeader />
          <MainBlock data={data} />
        </div>
      )}
      {isLoading && <p>Данные загружаются</p>}
      {error && <h2>Ошибна на сервере {error}</h2>}
    </div>
  );
}

export default App;
