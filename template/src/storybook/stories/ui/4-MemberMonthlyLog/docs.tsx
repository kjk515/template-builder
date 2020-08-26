
import { docsUtils } from '@nara.platform/storybook';
import { MemberMonthlyLog } from '@nara.drama/timecard';


export default docsUtils.componentDocs({
  title: 'component/MemberMonthlyLog',
  component: MemberMonthlyLog,
  subcomponents: {
    'MemberMonthlyLog.Header': MemberMonthlyLog.Header,
    'MemberMonthlyLog.Content': MemberMonthlyLog.Content,
  },
});
