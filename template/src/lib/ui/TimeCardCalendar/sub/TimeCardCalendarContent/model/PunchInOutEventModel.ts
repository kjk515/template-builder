import moment, { Moment } from 'moment';

import { CalendarTypes } from '@nara.platform/react-ui';
import { DramaException } from '@nara.platform/accent';
import { ManDayModel, DutyType } from '~/lib/model';



class PunchInOutEventModel extends CalendarTypes.EventModel {
  //
  memberId: string = '';
  manDayId: string = '';
  punchInTime: string | null = null;
  punchOutTime: string | null = null;
  punchCount: number = 0;

  dutyType: DutyType | null = null;

  constructor(date: Date, dutyType: DutyType | null = null) {
    //
    super(date, date);

    this.style = PunchInOutEventModel.getDefaultStyle(date);
    this.dutyType = dutyType;
  }

  static fromManDays(manDays: ManDayModel[]): PunchInOutEventModel[] {
    //
    const events = manDays
      .map((manDay) => {
        if (manDay.dutyType === DutyType.Work && manDay.punchInTime) {
          return this.fromManDayPunchInOut(manDay);
        }
        else if (manDay.dutyType === DutyType.Leave) {
          return this.fromManDayLeave(manDay);
        }
        return null;
      })
      .filter(manDay => manDay !== null) as PunchInOutEventModel[];


    const today = moment();
    const todayManDay = manDays.find(({ date }) => today.isSame(date, 'day'));

    const isWorkDay = todayManDay && todayManDay.punchCount === 0
      && (todayManDay.dutyType === null || todayManDay.dutyType !== DutyType.Holiday && todayManDay.dutyType !== DutyType.Leave);

    if (isWorkDay) {
      events.push(this.newToday());
    }

    return events;
  }

  static fromManDayPunchInOut(manDay: ManDayModel): PunchInOutEventModel {
    //
    if (!manDay.punchInTime) {
      throw new DramaException('TimeCardCalendar', 'manDay.actualPunchInTime is null. But it is impossible');
    }

    const event = new PunchInOutEventModel(
      moment(manDay.date).toDate(),
      manDay.dutyType,
    );

    event.manDayId = manDay.id;

    event.setPunchTime(
      manDay.punchInTime,
      manDay.punchOutTime
    );

    event.punchCount = manDay.punchCount;

    return event;
  }

  static fromManDayLeave(manDay: ManDayModel): PunchInOutEventModel {
    //
    const event = new PunchInOutEventModel(
      moment(manDay.date).toDate(),
      manDay.dutyType,
    );

    event.memberId = manDay.member.id;
    event.manDayId = manDay.id;

    return event;
  }

  static newToday() {
    //
    return new PunchInOutEventModel(
      new Date(),

    );
  }

  static getDefaultStyle(date: Date): CalendarTypes.EventStyleModel {
    //
    const today = moment();
    const eventStyle = new CalendarTypes.EventStyleModel();

    eventStyle.color = '#555555';
    eventStyle.backgroundColor = today.isSame(moment(date), 'day') ? '#EAF6FF' : '#ffffff';

    return eventStyle;
  }

  setPunchTime(punchInTime: Moment | null, punchOutTime: Moment | null) {
    //
    this.punchInTime = punchInTime ? moment(punchInTime).format('HH:mm') : null;
    this.punchOutTime = punchOutTime ? moment(punchOutTime).format('HH:mm') : null;
  }
}

export default PunchInOutEventModel;
