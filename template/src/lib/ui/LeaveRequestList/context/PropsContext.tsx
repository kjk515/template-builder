
import React from 'react';
import { LeavePlanModel } from '~/lib';
import ClickColumnParams from '../model/ClickColumnParams';


interface PropsContext {
  personal: boolean;
  memberId: string;
  isPlan: boolean;
  onClickColumn: (params: ClickColumnParams) => void;
  onClickAdjustment: (leavePlan: LeavePlanModel) => void;
  onCompleteAction: () => void;
  onChangePage: (page: number) => void;
}


const Context = React.createContext<PropsContext>({
  personal: false,
  memberId: '',
  isPlan: false,
  onClickColumn: () => {},
  onClickAdjustment: () => {},
  onCompleteAction: () => {},
  onChangePage: () => {},
});

export default Context;
