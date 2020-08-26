
import { autobind, IdNameModel, DatePeriodModel } from '@nara.platform/accent';
import { LeavePlanModel, LeaveTypeModel, TimePeriodModel, LeaveCategoryType } from '~/lib/model';


@autobind
class LeavePlanCdo {
  //
  member: IdNameModel;
  type: LeaveTypeModel = new LeaveTypeModel(LeaveCategoryType.Vacation);
  halfOffTimePeriod: TimePeriodModel | null = null;
  period: DatePeriodModel = new DatePeriodModel();
  dayCount: number = 0;
  comment: string = '';
  yearLeaveId: string;
  projectId: string;


  constructor(yearLeaveId: string, projectId: string, member: IdNameModel) {
    //
    this.yearLeaveId = yearLeaveId;
    this.projectId = projectId;
    this.member = member;
  }

  static fromModel(model: LeavePlanModel): LeavePlanCdo {
    //
    model.calculateDayCount();

    const cdo = new LeavePlanCdo(model.yearLeaveId, model.projectId, new IdNameModel(model.memberId, model.memberName));

    cdo.type = model.type;
    cdo.halfOffTimePeriod = model.halfOffTimePeriod;
    cdo.period = model.period;
    cdo.dayCount = model.dayCount;
    cdo.comment = model.comment;

    return cdo;
  }
}

export default LeavePlanCdo;
