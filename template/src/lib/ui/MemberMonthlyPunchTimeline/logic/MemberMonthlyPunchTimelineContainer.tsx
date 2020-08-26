import React from 'react';
import { ReactComponent, autobind, ServiceInjector, InvalidPropsException } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import moment, { Moment } from 'moment';

import { ManDaysService, MemberService } from '~/lib/service';
import MemberMonthlyPunchTimelineService from '../service/MemberMonthlyPunchTimelineService';
import MemberMonthlyPunchTimelineContext from '../context/MemberMonthlyPunchTimelineContext';


interface Props {
  projectId?: string;
  yearMonth?: Moment;
  personal?: boolean;
  memberId?: string;
}

interface InjectedProps {
  memberService: MemberService;
  manDaysService: ManDaysService;
  memberMonthlyPunchTimelineService: MemberMonthlyPunchTimelineService;
}

/**
 * 개인 월 출퇴근 로그 컴포넌트입니다.
 */
@autobind
@observer
class MemberMonthlyPunchTimelineContainer extends ReactComponent<Props, {}, InjectedProps> {
  //
  static defaultProps = {
    yearMonth: moment(),
    personal: false,
    memberId: '',
  };

  componentDidMount() {
    //
    const { memberMonthlyPunchTimelineService } = this.injected;
    const { yearMonth } = this.props;

    this.verifyProps();

    this.findManDaysByMemberIdAndYearMonth(yearMonth || moment());
    memberMonthlyPunchTimelineService.setDate(yearMonth || moment());
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    //
    const { yearMonth, projectId } = this.props;
    const { memberMonthlyPunchTimelineService } = this.injected;

    if (prevProps.yearMonth !== yearMonth || prevProps.projectId !== projectId) {
      this.findManDaysByMemberIdAndYearMonth(yearMonth || moment());
      memberMonthlyPunchTimelineService.setDate(yearMonth || moment());
    }
  }

  verifyProps() {
    //
    const { personal, memberId, projectId } = this.props;

    if (personal && !projectId) {
      //
      throw new InvalidPropsException('MemberMonthlyPunchTimeline', 'When personal props is true, you must put projectId');
    }
    else if (!personal && !memberId) {
      //
      throw new InvalidPropsException('MemberMonthlyPunchTimeline', 'When personal is false, you must put memberId props');
    }
  }

  async findManDaysByMemberIdAndYearMonth(yearMonth: Moment) {
    //
    const { manDaysService } = this.injected;

    const member = await this.findMember();

    if (member) {
      //
      manDaysService.findManDaysByMemberIdAndYearMonth(member.id, yearMonth)
        .then(manDays => manDaysService.sortManDaysByDateDescending(manDays));
    }
  }

  async findMember() {
    //
    const { projectId, memberId, personal } = this.props;
    const { memberService } = this.injected;

    if (personal) {
      return memberService.findMemberByProjectIdAndAudienceId(projectId!);
    }
    else {
      return memberService.findMemberById(memberId!);
    }
  }

  getContext() {
    //
    return {
      punchTimeLine: {
        personal: this.props.personal || false,
      },
    };
  }

  render() {
    //
    return (
      <MemberMonthlyPunchTimelineContext.Provider value={this.getContext()}>
        {this.props.children}
      </MemberMonthlyPunchTimelineContext.Provider>
    );
  }
}

export default ServiceInjector.withContext(
  MemberService,
  ManDaysService,
  MemberMonthlyPunchTimelineService,
)(MemberMonthlyPunchTimelineContainer);

