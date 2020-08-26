
import { docsUtils } from '@nara.platform/storybook';
import { DailyLog } from '@nara.drama/timecard';


export default docsUtils.componentDocs({
  title: 'component/DailyLog',
  component: DailyLog,
  subcomponents: {
    'DailyLog.Header': DailyLog.Header,
    'DailyLog.DayOffContent': DailyLog.DayOffContent,
  },
});
