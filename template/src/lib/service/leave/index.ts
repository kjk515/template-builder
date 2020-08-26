
import LeaveService from './logic/LeaveService';
import YearLeaveService from './logic/YearLeaveService';
import YearLeavesService from './logic/YearLeavesService';
import LeaveTeamMonthService from './logic/LeaveTeamMonthService';
import LeaveManMonthsService from './logic/LeaveManMonthsService';
import LeaveManDaysService from './logic/LeaveManDaysService';
import LeaveCountsRdoService from './logic/LeaveCountsRdoService';


export const store = {
  leave: {
    leaveService: LeaveService.instance,
    yearLeaveService: YearLeaveService.instance,
    yearLeavesService: YearLeavesService.instance,
    leaveTeamMonthService: LeaveTeamMonthService.instance,
    leaveManMonthsService: LeaveManMonthsService.instance,
    leaveManDaysService: LeaveManDaysService.instance,
    leaveCountsRdoService: LeaveCountsRdoService.instance,
  },
};

export {
  LeaveService,
  YearLeaveService,
  YearLeavesService,
  LeaveTeamMonthService,
  LeaveManMonthsService,
  LeaveManDaysService,
  LeaveCountsRdoService,
};
