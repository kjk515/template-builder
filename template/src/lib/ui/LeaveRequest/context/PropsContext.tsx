import React from 'react';


interface PropsContext {
  leavePlanId: string;
  personal: boolean;
  initChangeRequest: () => void;
}


const Context = React.createContext<PropsContext>({
  leavePlanId: '',
  personal: false,
  initChangeRequest: () => {},
});

export default Context;
