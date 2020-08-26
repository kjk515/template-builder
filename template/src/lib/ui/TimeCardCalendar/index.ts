
import * as TimeCardCalendarTypes from './type';

import TimeCardCalendarContainer from './logic/TimeCardCalendarContainer';
import PropsEventType from './model/PropsEventType';
import TimeCardCalendarHeader from './sub/TimeCardCalendarHeader';
import TimeCardCalendarContent from './sub/TimeCardCalendarContent';


type TimeCardCalendarComponent = typeof TimeCardCalendarContainer & {
  EventType: typeof PropsEventType;
  Header: typeof TimeCardCalendarHeader;
  Content: typeof TimeCardCalendarContent;
};

const TimeCardCalendar = TimeCardCalendarContainer as TimeCardCalendarComponent;

TimeCardCalendar.EventType = PropsEventType;
TimeCardCalendar.Header = TimeCardCalendarHeader;
TimeCardCalendar.Content = TimeCardCalendarContent;

export default TimeCardCalendar;
export { TimeCardCalendarTypes };
