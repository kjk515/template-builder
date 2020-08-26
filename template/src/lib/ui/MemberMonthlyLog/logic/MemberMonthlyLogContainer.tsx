import React from 'react';
import { autobind, InvalidPropsException, ReactComponent, ServiceInjector } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import moment, { Moment } from 'moment';

import { SelectDatePickerTypes } from '@nara.platform/react-ui';
import { ProjectService, MemberService, ManMonthService } from '~/lib/service';
import ChangeDateParams from '../model/ChangeDateParams';
import MemberMonthlyLogService from '../service/MemberMonthlyLogService';
import MemberMonthlyLogContext from '../context/MemberMonthlyLogContext';


interface Props {
  projectId: string;
  children: React.ReactNode;
  defaultDate?: Date | Moment;
  personal?: boolean;
  memberId?: string;
  onChange?: (params: ChangeDateParams) => void;
}

interface InjectedProps {
  projectService: ProjectService;
  memberService: MemberService;
  manMonthService: ManMonthService;
  memberMonthlyLogService: MemberMonthlyLogService;
}

/**
 * 한달 출퇴근 로그 컴포넌트입니다.
 */
@autobind
@observer
class MemberMonthlyLogContainer extends ReactComponent<Props, {}, InjectedProps> {
  //
  static defaultProps = {
    defaultDate: new Date(),
    onChange: () => {},
    personal: false,
    memberId: '',
  };

  componentDidMount() {
    //
    this.init();
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    //
    const { projectId: prevProjectId } = prevProps;
    const { projectId } = this.props;

    if (prevProjectId !== projectId) {
      this.init();
    }
  }

  getContext() {
    //
    return {
      memberMonthlyLog: {
        onChangeDate: this.onChangeDate,
      },
    };
  }

  init() {
    //
    this.verifyProps();

    const { defaultDate } = this.props;
    const yearMonth = moment(defaultDate).format('YYYY-MM');

    this.refreshManMonthByYearMonth(moment(yearMonth));
  }

  verifyProps() {
    //
    const { personal, memberId } = this.props;

    if (personal && memberId) {
      //
      throw new InvalidPropsException('MemberMonthlyLog', 'When memberId is Exist, personal props must be false');
    }
    else if (!personal && !memberId) {
      //
      throw new InvalidPropsException('MemberMonthlyLog', 'When personal is false, you must put memberId props');
    }
  }

  async findManMonth(yearMonth: Moment) {
    //
    const { manMonthService, memberMonthlyLogService } = this.injected;

    const memberId = await this.getMemberId();

    manMonthService.findManMonthByMemberIdAndYearMonth(memberId, yearMonth)
      .then(manMonth => {
        if (manMonth) {
          memberMonthlyLogService.setWorkingDayCount(manMonth.dailyDutyTypes);
          memberMonthlyLogService.setWorkingMinutes(manMonth.dailyWorkingMinutes);
        }
      });
  }

  async getMemberId(): Promise<string> {
    //
    const { projectId, personal, memberId } = this.props;

    let targetMemberId = '';

    if (!personal && memberId) {
      targetMemberId = memberId;
    }
    else {
      const member = await this.injected.memberService.findMemberByProjectIdAndAudienceId(projectId);

      if (member) {
        targetMemberId = member.id;
      }
    }

    return targetMemberId;
  }

  onChangeDate(e: React.SyntheticEvent, params: SelectDatePickerTypes.DateParams) {
    //
    const yearMonth = moment([params.date.year, params.date.month]);

    this.refreshManMonthByYearMonth(yearMonth);
  }

  refreshManMonthByYearMonth(yearMonth: Moment) {
    // TODO change name (do not use handle)
    const { onChange } = this.props;
    const { memberMonthlyLogService } = this.injected;

    if (onChange) {
      onChange({ date: new Date(moment(yearMonth).format('YYYY-MM')) });
    }

    memberMonthlyLogService.setYearMonth(yearMonth);
    memberMonthlyLogService.setYearMonthDatesByYearMonth(yearMonth);

    this.findManMonth(yearMonth);
  }

  render() {
    //
    return (
      <MemberMonthlyLogContext.Provider value={this.getContext()}>
        {this.props.children}
      </MemberMonthlyLogContext.Provider>
    );
  }
}

export default ServiceInjector.withContext(
  ProjectService,
  MemberService,
  MemberMonthlyLogService,
  ManMonthService,
)(MemberMonthlyLogContainer);

