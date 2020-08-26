
import React from 'react';
import ClickColumnParams from '../model/ClickColumnParams';


interface PropsContext {
  editable: boolean;
  onClickColumn: (params: ClickColumnParams) => void;
  onChangePage: (page: number) => void;
}


const Context = React.createContext<PropsContext>({
  editable: false,
  onClickColumn: () => {},
  onChangePage: () => {},
});

export default Context;
