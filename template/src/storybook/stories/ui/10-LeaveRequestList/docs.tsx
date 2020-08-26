
import { docsUtils } from '@nara.platform/storybook';
import { LeaveRequestList } from '@nara.drama/timecard';


export default docsUtils.componentDocs({
  title: 'component/LeaveRequestList',
  component: LeaveRequestList,
  subcomponents: {
    'LeaveRequestList.Header': LeaveRequestList.Header,
    'LeaveRequestList.Content': LeaveRequestList.Content,
  },
});
