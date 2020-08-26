
import React from 'react';
import { Moment } from 'moment';


export interface ProjectDailyPunchTimelineContextModel {
  //
  punchTimeLine: {
    findPunchTimelines: (date: Moment) => void;
    onChangePage: (page: number) => void;
  };
}


const ProjectDailyPunchTimelineContext = React.createContext<ProjectDailyPunchTimelineContextModel>({
  punchTimeLine: {
    findPunchTimelines: () => {},
    onChangePage: () => {},
  },
});

export default ProjectDailyPunchTimelineContext;
