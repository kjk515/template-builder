
import { docsUtils } from '@nara.platform/storybook';
import { ProjectDailyPunchTimeline } from '@nara.drama/timecard';


export default docsUtils.componentDocs({
  title: 'component/ProjectDailyPunchTimeline',
  component: ProjectDailyPunchTimeline,
  subcomponents: {
    'ProjectDailyPunchTimeline.Header': ProjectDailyPunchTimeline.Header,
    'ProjectDailyPunchTimeline.Content': ProjectDailyPunchTimeline.Content,
    'ProjectDailyPunchTimeline.Footer': ProjectDailyPunchTimeline.Footer,
  },
});
