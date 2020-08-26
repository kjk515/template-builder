import React from 'react';


interface PropsContext {
  leaveId: string;
  personal: boolean;
}


const Context = React.createContext<PropsContext>({
  leaveId: '',
  personal: false,
});

export default Context;
