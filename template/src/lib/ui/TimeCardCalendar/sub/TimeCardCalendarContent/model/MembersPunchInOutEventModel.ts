
import moment from 'moment';
import { CalendarTypes } from '@nara.platform/react-ui';



// FIXME 페이지 보류.
class MembersPunchInOutEventModel extends CalendarTypes.EventModel {
  //
  projectDayId: string;
  punchInCount: number;
  punchOutCount: number;


  constructor(
    date: Date,
    projectDayId: string,
    punchInCount: number,
    punchOutCount: number,
  ) {
    //
    super(date, date);

    this.style = MembersPunchInOutEventModel.getDefaultStyle(date);

    this.projectDayId = projectDayId;
    this.punchInCount = punchInCount;
    this.punchOutCount = punchOutCount;
  }

  static getDefaultStyle(date: Date): CalendarTypes.EventStyleModel {
    //
    const eventStyle = new CalendarTypes.EventStyleModel();
    const today = moment();

    eventStyle.color = '#555555';
    eventStyle.backgroundColor = today.isSame(moment(date), 'day') ? '#EAF6FF' : '#ffffff';

    return eventStyle;
  }
}

export default MembersPunchInOutEventModel;
