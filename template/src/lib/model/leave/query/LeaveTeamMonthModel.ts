
import { fromDomain, mobxUtils, CineroomEntityModel } from '@nara.platform/accent';
import DayLeaveModel from '../vo/DayLeaveModel';


@fromDomain
class LeaveTeamMonthModel extends CineroomEntityModel {
  //
  yearMonth: string = '';
  projectId: string = '';
  dayLeaves: DayLeaveModel[] = [];


  constructor(projectId: string, yearLeave: string) {
    //
    super();

    this.projectId = projectId;
    this.yearMonth = yearLeave;
  }

  static fromDomain(domain: LeaveTeamMonthModel): LeaveTeamMonthModel {
    //
    const leaveTeamMonth = new LeaveTeamMonthModel(domain.projectId, domain.yearMonth);

    leaveTeamMonth.dayLeaves = domain.dayLeaves.map(dayLeave => DayLeaveModel.fromDomain(dayLeave));

    return leaveTeamMonth;
  }
}

mobxUtils.decorateObservable(LeaveTeamMonthModel);
export default LeaveTeamMonthModel;
