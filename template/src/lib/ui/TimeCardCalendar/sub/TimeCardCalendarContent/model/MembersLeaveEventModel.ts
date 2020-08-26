
import moment from 'moment';
import { CalendarTypes } from '@nara.platform/react-ui';
import LeaveTeamMonthModel from '~/lib/model/leave/query/LeaveTeamMonthModel';
import ManLeaveModel from '~/lib/model/leave/vo/ManLeaveModel';


class MembersLeaveEventModel extends CalendarTypes.EventModel {
  //
  projectId: string;
  representative: string;
  leaveCount: number;
  manLeaves: ManLeaveModel[];
  isContainedMyLeave: boolean;

  constructor(
    date: Date,
    projectId: string,
    representative: string,
    leaveCount: number = 0,
    manLeaves: ManLeaveModel[],
  ) {
    //
    super(date, date);

    this.style = MembersLeaveEventModel.getDefaultStyle(date);

    this.projectId = projectId;
    this.representative = representative;
    this.leaveCount = leaveCount;
    this.manLeaves = manLeaves;
    this.isContainedMyLeave = false;
  }

  static fromLeaveTeamMonth(leaveTeamMonth: LeaveTeamMonthModel): MembersLeaveEventModel[] {
    //
    const dayLeaves = leaveTeamMonth.dayLeaves;
    const yearMonth = leaveTeamMonth.yearMonth;
    const events = this.getMembersLeaveEvent(leaveTeamMonth);

    const today = moment().format('YYYY-MM-DD');
    const todayLeaves = dayLeaves.find((dayLeave) => dayLeave.getStringDate(yearMonth) === today);

    if (!todayLeaves) {
      events.push(this.newToday(leaveTeamMonth.projectId));
    }
    return events;
  }

  static getMembersLeaveEvent(leaveTeamMonth: LeaveTeamMonthModel): MembersLeaveEventModel[] {
    //
    const dayLeaves = leaveTeamMonth.dayLeaves;
    const yearMonth = leaveTeamMonth.yearMonth;
    const projectId = leaveTeamMonth.projectId;

    return dayLeaves.map(dayLeave => {
      const representative = dayLeave.manLeaves[0].memberName;

      const event = new MembersLeaveEventModel(
        new Date(dayLeave.getStringDate(yearMonth)),
        projectId,

        representative,
        dayLeave.manLeaves.length,
        dayLeave.manLeaves
      );

      return event;
    });
  }

  static newToday(projectId: string): MembersLeaveEventModel {
    //
    return new MembersLeaveEventModel(
      new Date(),
      projectId,
      '오늘의 휴가자 없음',
      0,
      []
    );
  }

  static getDefaultStyle(date: Date): CalendarTypes.EventStyleModel {
    //
    const eventStyle = new CalendarTypes.EventStyleModel();
    const today = moment();

    eventStyle.color = '#555555';
    eventStyle.backgroundColor = today.isSame(moment(date), 'day') ? '#EAF6FF' : '#ffffff';

    return eventStyle;
  }


  activeMyLeave(memberId: string): void {
    //
    const myLeave = this.manLeaves.find(manLeave => manLeave.memberId === memberId);

    if (myLeave) {
      this.isContainedMyLeave = true;
    }
  }

}

export default MembersLeaveEventModel;
