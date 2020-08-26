
import ProjectMonthlyLeaveLogContainer from './logic/ProjectMonthlyLeaveLogContainer';
import ProjectMonthlyLeaveLogHeader from './sub/ProjectMonthlyLeaveLogHeader';
import ProjectMonthlyLeaveLogContent from './sub/ProjectMonthlyLeaveLogContent';
import ProjectMonthlyLeaveLogFooter from './sub/ProjectMonthlyLeaveLogFooter';


type ProjectMonthlyLeaveLogComponent = typeof ProjectMonthlyLeaveLogContainer & {
  Header: typeof ProjectMonthlyLeaveLogHeader;
  Content: typeof ProjectMonthlyLeaveLogContent;
  Footer: typeof ProjectMonthlyLeaveLogFooter;
}

const ProjectMonthlyLeaveLog = ProjectMonthlyLeaveLogContainer as ProjectMonthlyLeaveLogComponent;

ProjectMonthlyLeaveLog.Header = ProjectMonthlyLeaveLogHeader;
ProjectMonthlyLeaveLog.Content = ProjectMonthlyLeaveLogContent;
ProjectMonthlyLeaveLog.Footer = ProjectMonthlyLeaveLogFooter;

export default ProjectMonthlyLeaveLog;
