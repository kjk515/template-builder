
import { docsUtils } from '@nara.platform/storybook';
import { TimeCardCalendar } from '@nara.drama/timecard';


export default docsUtils.componentDocs({
  title: 'component/TimeCardCalendar',
  component: TimeCardCalendar,
  subcomponents: {
    'TimeCardCalendar.Header': TimeCardCalendar.Header,
    'TimeCardCalendar.Content': TimeCardCalendar.Content,
  },
});
