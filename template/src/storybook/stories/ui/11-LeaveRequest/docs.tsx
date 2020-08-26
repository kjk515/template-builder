
import { docsUtils } from '@nara.platform/storybook';
import { LeaveRequest } from '@nara.drama/timecard';


export default docsUtils.componentDocs({
  title: 'component/LeaveRequest',
  component: LeaveRequest,
  subcomponents: {
    'LeaveRequest.Content': LeaveRequest.Content,
    'LeaveRequest.ActionButtons': LeaveRequest.ActionButtons,
  },
});
