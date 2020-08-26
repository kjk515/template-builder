
import { docsUtils } from '@nara.platform/storybook';
import { PunchInOut } from '@nara.drama/timecard';


export default docsUtils.componentDocs({
  title: 'component/PunchInOut',
  component: PunchInOut,
  subcomponents: {
    'PunchInOut.Header': PunchInOut.Header,
    'PunchInOut.Content': PunchInOut.Content,
    'PunchInOut.ConfirmButton': PunchInOut.ConfirmButton,
  },
});
