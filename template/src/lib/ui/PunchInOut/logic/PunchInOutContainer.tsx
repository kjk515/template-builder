
import React from 'react';
import { autobind, ReactComponent, ServiceInjector, InvalidPropsException } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import moment, { Moment } from 'moment';
import { dialog } from '@nara.platform/react-ui';
import { DailyPunchesService, ManDayService, MemberService, ProjectService } from '~/lib/service';
import { DailyPunchModel, DutyType } from '~/lib/model';
import PunchInOutService from '../service/PunchInOutService';


interface Props {
  children: React.ReactNode;
  manDayId?: string;
  projectId?: string;
  date?: Date | Moment;
  onInvalid?: () => void;
}

interface InjectedProps {
  manDayService: ManDayService;
  memberService: MemberService;
  dailyPunchesService: DailyPunchesService;
  punchInOutService: PunchInOutService;
  projectService: ProjectService;
}

/**
 *  * 출퇴근 체크 모달 컴포넌트입니다.
 */
@autobind
@observer
class PunchInOutContainer extends ReactComponent<Props, {}, InjectedProps> {
  //
  static defaultProps = {
    onInvalid: () => {},
  };

  private today = moment();


  componentDidMount() {
    //
    const { manDayId } = this.props;

    if (manDayId) {
      this.findManDayById(manDayId);
    }
    else {
      this.init();
    }
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    //
    const { projectId: prevProjectId, manDayId: prevManDayId } = prevProps;
    const { projectId, manDayId } = this.props;

    if ((prevProjectId !== projectId) || (prevManDayId !== manDayId)) {
      if (manDayId) {
        this.findManDayById(manDayId);
      }
      else {
        this.init();
      }
    }
  }

  componentWillUnmount() {
    //
    const { manDayService, dailyPunchesService, punchInOutService } = this.injected;

    manDayService.clearManDay();
    dailyPunchesService.clearDailyPunches();
    dailyPunchesService.clearTargetDailyPunch();
    punchInOutService.clearAllOptions();
  }

  async init() {
    //
    const { projectId } = this.props;
    const { memberService } = this.injected;

    const targetProjectId = projectId || await this.getProjectId();

    await memberService.findMemberByProjectIdAndAudienceId(targetProjectId);

    this.initManDay();
  }

  async getProjectId() {
    //
    const { projectService } = this.injected;
    const project = await projectService.findDefaultProject();
    return project.id;
  }

  initManDay() {
    //
    const { date } = this.props;
    const { manDayService, memberService } = this.injected;
    const { member } = memberService;
    const localDate = date ? moment(date) : this.today;

    if (!member) {
      return;
    }
    manDayService.findManDayByMemberIdAndLocalDate(member.id, localDate)
      .then(async (manDay) => {
        //
        if (!manDay) {
          await dialog.alert(`프로젝트 기간이 아닙니다.[Not exist ManDay at ${localDate.format('YYYY-MM-DD')}`);
          this.invalid();
        }
        else if (manDay && manDay.dutyType === DutyType.Leave) {
          await dialog.alert({ title: '휴가', message: '금일은 휴가 처리 되어 있습니다.' });
          this.invalid();
        }
        else if (manDay.dailyPunches.length) {
          this.loadDailyPunches(manDay.dailyPunches);
        }
        else {
          this.initTargetDailyPunch();
        }
      });
  }

  findManDayById(manDayId: string) {
    //
    const { manDayService } = this.injected;

    manDayService.findManDayById(manDayId)
      .then(async (manDay) => {
        //
        if (manDay && manDay.dutyType === DutyType.Leave) {
          await dialog.alert({ title: '휴가', message: '금일은 휴가 처리 되어 있습니다.' });
          this.invalid();
        }
        else if (manDay && manDay.dailyPunches.length) {
          // set existing dailyPunches of manDay found
          this.loadDailyPunches(manDay.dailyPunches);
        }
        else if (manDay) {
          this.initTargetDailyPunch();
        }
      });
  }

  loadDailyPunches(punches: DailyPunchModel[]) {
    //
    const { dailyPunchesService } = this.injected;

    dailyPunchesService.setDailyPunches(punches);

    this.initTargetDailyPunch();
  }

  initTargetDailyPunch() {
    const { dailyPunchesService } = this.injected;
    const { dailyPunches } = dailyPunchesService;

    if (dailyPunches.length && !dailyPunches[dailyPunches.length - 1].complete) {
      const latestDailyPunchIndex = dailyPunches.length - 1;

      dailyPunchesService.initTargetDailyPunch(dailyPunches[latestDailyPunchIndex]);
    }
    else {
      dailyPunchesService.initTargetDailyPunch();
    }
  }

  invalid() {
    //
    const { onInvalid } = this.props;

    if (typeof onInvalid !== 'function') {
      throw new InvalidPropsException('PunchInOut', 'onInvalid');
    }
    onInvalid();
  }

  render() {
    //
    return this.props.children;
  }
}

export default ServiceInjector.withContext(
  ManDayService,
  MemberService,
  DailyPunchesService,
  PunchInOutService,
  ProjectService
)(PunchInOutContainer);
