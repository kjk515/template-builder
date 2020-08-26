
import { docsUtils } from '@nara.platform/storybook';
import { ProjectMonthlyLog } from '@nara.drama/timecard';


export default docsUtils.componentDocs({
  title: 'component/ProjectMonthlyLog',
  component: ProjectMonthlyLog,
  subcomponents: {
    'ProjectMonthlyLog.Header': ProjectMonthlyLog.Header,
    'ProjectMonthlyLog.Content': ProjectMonthlyLog.Content,
    'ProjectMonthlyLog.Footer': ProjectMonthlyLog.Footer,
  },
});
