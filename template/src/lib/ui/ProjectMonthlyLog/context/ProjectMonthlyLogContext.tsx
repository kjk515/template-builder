import React from 'react';


export interface ProjectMonthlyLogContextModel {
  //
  projectMonthlyLog: {
    onChangePage: (page: number) => void;
  };
}

const ProjectMonthlyLogContext = React.createContext<ProjectMonthlyLogContextModel>({
  projectMonthlyLog: {
    onChangePage: () => {},
  },
});

export default ProjectMonthlyLogContext;
