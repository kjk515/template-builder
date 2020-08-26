
import React from 'react';
import { ReactComponent, autobind, NoSuchDataException, ServiceInjector, OffsetModel, SortDirectionType } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import moment, { Moment } from 'moment';
import { LeavePlanModel } from '~/lib/model';
import { LeaveCountsRdoService, LeaveService, MemberService, PaginationService } from '~/lib/service';
import PropsContext from '../context/PropsContext';
import ClickColumnParams from '../model/ClickColumnParams';


interface Props {
  date: Moment | Date;
  projectId: string;
  personal?: boolean;
  memberId?: string;
  isPlan?: boolean;
  onClickColumn?: (params: ClickColumnParams) => void;
  onClickAdjustment?: (leave: LeavePlanModel) => void;
  listCountPerPage?: number;
}

interface InjectedProps {
  memberService: MemberService;
  leaveService: LeaveService;
  leaveCountsRdoService: LeaveCountsRdoService;
  paginationService: PaginationService;
}

/**
 * TimeCard 근태관리 컴포넌트입니다.
 */
@autobind
@observer
class LeaveRequestListContainer extends ReactComponent<Props, {}, InjectedProps> {
  //
  static defaultProps = {
    personal: false,
    isPlan: false,
    listCountPerPage: 20,
  };

  componentDidMount() {
    //
    this.init();
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    //
    const { date: prevDate } = prevProps;
    const { date } = this.props;

    if (prevDate !== date) {
      this.init();
    }
  }

  init() {
    //
    const { personal, memberId, projectId, listCountPerPage } = this.props;
    const { paginationService } = this.injected;

    paginationService.initOffsetAndLimit(0, listCountPerPage || 20);

    if (personal) {
      this.findMyLeaves(projectId);
    }
    else if (memberId) {
      this.findLeavesByMember(memberId);
    }
    else {
      this.findLeavesByProject(projectId);
    }
  }

  findLeavesByProject(projectId: string) {
    //
    const { leaveService, paginationService } = this.injected;
    const { date, isPlan } = this.props;
    const yearMonth = moment(date).format('YYYY-MM');
    const offset = paginationService.getOffsetModel(SortDirectionType.Descending);

    leaveService.findLeavesByProject(projectId, yearMonth, offset, isPlan)
      .then(() => paginationService.updateStartIndex());
  }

  findLeavesByMember(memberId: string) {
    //
    const { leaveService, paginationService } = this.injected;
    const { date, isPlan } = this.props;
    const year = moment(date).format('YYYY');
    const offset = paginationService.getOffsetModel(SortDirectionType.Descending);

    leaveService.findLeavesByMember(memberId, year, offset, isPlan);
  }

  async findMyLeaves(projectId: string) {
    //
    const { leaveService, memberService, leaveCountsRdoService } = this.injected;
    const { date, isPlan } = this.props;
    const year = moment(date).format('YYYY');

    const member = await memberService.findMemberByProjectIdAndAudienceId(projectId);

    if (!member) {
      throw new NoSuchDataException('LeaveRequestList', `member is required -> projectId: ${projectId}`);
    }

    leaveService.findLeavesByMember(member.id, year, OffsetModel.newDescending(0, 20), isPlan);
    leaveCountsRdoService.findLeaveSummary(member.id, year);
  }

  onCompleteAction() {
    //
    this.findMyLeaves(this.props.projectId);
  }

  onChangePage(page: number) {
    //
    const { projectId } = this.props;
    const { paginationService } = this.injected;

    paginationService.updateOffsetByPage(page);
    paginationService.setCurrentPage(page);

    this.findLeavesByProject(projectId);
  }

  getContext() {
    const { personal = false, memberId = '', isPlan = false, onClickColumn = () => {}, onClickAdjustment = () => {} } = this.props;

    return {
      personal,
      memberId,
      isPlan,
      onClickColumn,
      onClickAdjustment,
      onCompleteAction: this.onCompleteAction,
      onChangePage: this.onChangePage,
    };
  }

  render() {
    //
    return (
      <PropsContext.Provider value={this.getContext()}>
        {this.props.children}
      </PropsContext.Provider>
    );
  }
}

export default ServiceInjector.withContext(
  MemberService,
  LeaveService,
  PaginationService,
  LeaveCountsRdoService,
)(LeaveRequestListContainer);
