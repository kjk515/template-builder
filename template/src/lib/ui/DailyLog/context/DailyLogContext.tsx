import React from 'react';

import moment, { Moment } from 'moment';


export interface DailyLogContextModel {
  //
  date: Date | Moment;
}

const DailyLogContext = React.createContext<DailyLogContextModel>({
  date: moment(),
});

export default DailyLogContext;
