
import React from 'react';


export interface MemberMonthlyPunchTimelineContext {
  //
  punchTimeLine: {
    personal: boolean;
  };
}


const MemberMonthlyPunchTimelineContext = React.createContext<MemberMonthlyPunchTimelineContext>({
  punchTimeLine: {
    personal: false,
  },
});

export default MemberMonthlyPunchTimelineContext;
