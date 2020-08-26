
import React from 'react';
import moment, { Moment } from 'moment';


export interface ProjectMonthlyLeaveLogContextModel {
  //
  projectMonthlyLeaveLogContext: {
    onChangePage: (page: number) => void;
    date: Moment;
  };
}

const ProjectMonthlyLeaveLogContext = React.createContext<ProjectMonthlyLeaveLogContextModel>({
  projectMonthlyLeaveLogContext: {
    onChangePage: () => {},
    date: moment(),
  },
});


export default ProjectMonthlyLeaveLogContext;
