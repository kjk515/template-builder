
import DailyLogContainer from './logic/DailyLogContainer';
import DailyLogHeader from './sub/DailyLogHeader';
import DayOffContent from './sub/DailyLogDayOffContent';


type DailyLogComponent = typeof DailyLogContainer & {
  Header: typeof DailyLogHeader;
  DayOffContent: typeof DayOffContent;
};

const DailyLog = DailyLogContainer as DailyLogComponent;

DailyLog.Header = DailyLogHeader;
DailyLog.DayOffContent = DayOffContent;

export default DailyLog;
