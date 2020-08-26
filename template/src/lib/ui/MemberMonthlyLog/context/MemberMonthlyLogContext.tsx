
import React from 'react';
import { SelectDatePickerTypes } from '@nara.platform/react-ui';


export interface MemberMonthlyLogContextModel {
  //
  memberMonthlyLog: {
    onChangeDate: (e: React.SyntheticEvent, params: SelectDatePickerTypes.DateParams) => void;
  };
}

const MemberMonthlyLogContext = React.createContext<MemberMonthlyLogContextModel>({
  memberMonthlyLog: {
    onChangeDate: () => {},
  },
});

export default MemberMonthlyLogContext;
