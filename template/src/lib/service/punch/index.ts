
import ManDayService from './logic/ManDayService';
import ManDaysService from './logic/ManDaysService';
import ManDayTestService from './logic/ManDayTestService';
import DailyPunchesService from './logic/DailyPunchesService';
import ProjectService from './logic/ProjectService';
import MemberService from './logic/MemberService';
import ManMonthService from './logic/ManMonthService';
import ManMonthsService from './logic/ManMonthsService';


export const store = {
  project: {
    projectService: ProjectService.instance,
    memberService: MemberService.instance,
  },
  manDay: {
    manDayService: ManDayService.instance,
    manDaysService: ManDaysService.instance,
    manDayTestService: ManDayTestService.instance,
  },
  manMonth: {
    manMonthService: ManMonthService.instance,
    manMonthsService: ManMonthsService.instance,
  },
  dailyPunch: {
    dailyPunchService: DailyPunchesService.instance,
  },
};

export {
  ManDayService,
  ManDaysService,
  ManDayTestService,

  ProjectService,
  MemberService,

  ManMonthService,
  ManMonthsService,

  DailyPunchesService,
};
