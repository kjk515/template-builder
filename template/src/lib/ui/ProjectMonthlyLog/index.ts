
import * as ProjectMonthlyLogTypes from './type';
import ProjectMonthlyLogContainer from './logic/ProjectMonthlyLogContainer';
import ProjectMonthlyLogHeader from './sub/ProjectMonthlyLogHeader';
import ProjectMonthlyLogContent from './sub/ProjectMonthlyLogContent';
import ProjectMonthlyLogFooter from './sub/ProjectMonthlyLogFooter';


type MonthlyLogComponent = typeof ProjectMonthlyLogContainer & {
  Header: typeof ProjectMonthlyLogHeader;
  Content: typeof ProjectMonthlyLogContent;
  Footer: typeof ProjectMonthlyLogFooter;
};

const ProjectMonthlyLog = ProjectMonthlyLogContainer as MonthlyLogComponent;

ProjectMonthlyLog.Header = ProjectMonthlyLogHeader;
ProjectMonthlyLog.Content = ProjectMonthlyLogContent;
ProjectMonthlyLog.Footer = ProjectMonthlyLogFooter;

export default ProjectMonthlyLog;
export { ProjectMonthlyLogTypes };

