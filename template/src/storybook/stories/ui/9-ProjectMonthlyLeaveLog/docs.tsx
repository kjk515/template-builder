
import { docsUtils } from '@nara.platform/storybook';
import { ProjectMonthlyLeaveLog } from '@nara.drama/timecard';


export default docsUtils.componentDocs({
  title: 'component/ProjectMonthlyLeaveLog',
  component: ProjectMonthlyLeaveLog,
  subcomponents: {
    'ProjectMonthlyLeaveLog.Header': ProjectMonthlyLeaveLog.Header,
    'ProjectMonthlyLeaveLog.Content': ProjectMonthlyLeaveLog.Content,
  },
});
