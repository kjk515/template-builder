
import { docsUtils } from '@nara.platform/storybook';
import { YearLeaveList } from '@nara.drama/timecard';


export default docsUtils.componentDocs({
  title: 'component/YearLeaveList',
  component: YearLeaveList,
  subcomponents: {
    'YearLeaveList.Header': YearLeaveList.Header,
    'YearLeaveList.Content': YearLeaveList.Content,
  },
});
