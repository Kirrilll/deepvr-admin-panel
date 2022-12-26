import { ConfigProvider } from 'antd';
import React, {useEffect} from 'react';
import moment from 'moment';
import TimelinePage from '../pages/TimelinePage';
import 'moment/locale/ru';

function App() {
  moment.locale('ru');

  return (
      <TimelinePage></TimelinePage> 
  );
}

export default App;
