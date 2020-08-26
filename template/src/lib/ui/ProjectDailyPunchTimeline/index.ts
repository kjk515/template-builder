
import * as ProjectDailyPunchTimelineTypes from './type';
import ProjectDailyPunchTimelineContainer from './logic/ProjectDailyPunchTimelineContainer';
import ProjectDailyPunchTimelineHeader from './sub/ProjectDailyPunchTimelineHeader';
import ProjectDailyPunchTimelineContent from './sub/ProjectDailyPunchTimelineContent';
import ProjectDailyPunchTimelineFooter from './sub/ProjectDailyPunchTimelineFooter';


type ProjectDailyPunchTimelineComponent = typeof ProjectDailyPunchTimelineContainer & {
  Header: typeof ProjectDailyPunchTimelineHeader;
  Content: typeof ProjectDailyPunchTimelineContent;
  Footer: typeof ProjectDailyPunchTimelineFooter;
};

const ProjectDailyPunchTimeline = ProjectDailyPunchTimelineContainer as ProjectDailyPunchTimelineComponent;

ProjectDailyPunchTimeline.Header = ProjectDailyPunchTimelineHeader;
ProjectDailyPunchTimeline.Content = ProjectDailyPunchTimelineContent;
ProjectDailyPunchTimeline.Footer = ProjectDailyPunchTimelineFooter;

export default ProjectDailyPunchTimeline;
export { ProjectDailyPunchTimelineTypes };
