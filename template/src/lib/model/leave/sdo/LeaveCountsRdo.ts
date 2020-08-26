
import { fromDomain, autobind } from '@nara.platform/accent';
import moment from 'moment';


@autobind
@fromDomain
class LeaveCountsRdo {
  //
  permitYearLeaves: number = 0;
  permitMonthLeaves: number = 0;
  permitAddedLeaves: number = 0;

  totalUsedYearLeaves: number = 0;
  totalUsedMonthLeaves: number = 0;
  totalUsedAddedLeaves: number = 0;
  usedVacationLeaves: number = 0;
  usedHalfLeaves: number = 0;
  usedMaternityLeaves: number = 0;
  usedCondolenceLeaves: number = 0;
  usedSickLeaves: number = 0;
  usedBonusLeaves: number = 0;
  creationTime: number = 0;


  get permitStartDate() {
    return moment(this.creationTime).format('YYYY.MM.DD');
  }

  get permitLeaves() {
    return this.permitYearLeaves + this.permitMonthLeaves;
  }

  get usedLeaves() {
    return this.totalUsedYearLeaves + this.totalUsedMonthLeaves;
  }

  get overLeaves() {
    return this.permitLeaves > this.usedLeaves ? 0 : this.usedLeaves - this.permitLeaves;
  }

  static fromDomain(domain: LeaveCountsRdo): LeaveCountsRdo {
    //
    const leaveCountsRdo = new LeaveCountsRdo();

    leaveCountsRdo.permitYearLeaves = domain.permitYearLeaves;
    leaveCountsRdo.permitMonthLeaves = domain.permitMonthLeaves;
    leaveCountsRdo.permitAddedLeaves = domain.permitAddedLeaves;
    leaveCountsRdo.totalUsedYearLeaves = domain.totalUsedYearLeaves;
    leaveCountsRdo.totalUsedMonthLeaves = domain.totalUsedMonthLeaves;
    leaveCountsRdo.totalUsedAddedLeaves = domain.totalUsedAddedLeaves;
    leaveCountsRdo.usedVacationLeaves = domain.usedVacationLeaves;
    leaveCountsRdo.usedHalfLeaves = domain.usedHalfLeaves;
    leaveCountsRdo.usedMaternityLeaves = domain.usedMaternityLeaves;
    leaveCountsRdo.usedCondolenceLeaves = domain.usedCondolenceLeaves;
    leaveCountsRdo.usedSickLeaves = domain.usedSickLeaves;
    leaveCountsRdo.usedBonusLeaves = domain.usedBonusLeaves;
    leaveCountsRdo.creationTime = domain.creationTime;


    return leaveCountsRdo;
  }
}

export default LeaveCountsRdo;
