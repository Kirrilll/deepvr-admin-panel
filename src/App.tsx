import { ConfigProvider } from 'antd';
import moment from 'moment';
import React from 'react';
import TimelinePage from './pages/TimelinePage';
import 'moment/locale/ru';

function App() {
  moment.locale('ru');
  
  return (
      <TimelinePage></TimelinePage> 
  );
}

export default App;
