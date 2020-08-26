
import * as MemberMonthlyLogTypes from './type';
import MemberMonthlyLogContainer from './logic/MemberMonthlyLogContainer';
import MemberMonthlyLogHeader from './sub/MemberMonthlyLogHeader';
import MemberMonthlyLogContent from './sub/MemberMonthlyLogContent';


type MemberMonthlyLogComponent = typeof MemberMonthlyLogContainer & {
  Header: typeof MemberMonthlyLogHeader;
  Content: typeof MemberMonthlyLogContent;
};

const MemberMonthlyLog = MemberMonthlyLogContainer as MemberMonthlyLogComponent;

MemberMonthlyLog.Header = MemberMonthlyLogHeader;
MemberMonthlyLog.Content = MemberMonthlyLogContent;

export default MemberMonthlyLog;
export { MemberMonthlyLogTypes };
