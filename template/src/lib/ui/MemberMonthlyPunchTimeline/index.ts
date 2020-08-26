
import * as MemberMonthlyPunchTimelineTypes from './type';
import MemberMonthlyPunchTimelineContainer from './logic/MemberMonthlyPunchTimelineContainer';
import MemberMonthlyPunchTimelineContent from './sub/MemberMonthlyPunchTimelineContent';


type MemberMonthlyPunchTimelineComponent = typeof MemberMonthlyPunchTimelineContainer & {
  Content: typeof MemberMonthlyPunchTimelineContent;
};

const MemberMonthlyPunchTimeline = MemberMonthlyPunchTimelineContainer as MemberMonthlyPunchTimelineComponent;

MemberMonthlyPunchTimeline.Content = MemberMonthlyPunchTimelineContent;

export default MemberMonthlyPunchTimeline;
export { MemberMonthlyPunchTimelineTypes };
