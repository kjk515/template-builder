
import { ReactComponent, autobind, ServiceInjector } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import moment, { Moment } from 'moment';
import React from 'react';
import { YearLeaveService, YearLeavesService, PaginationService } from '~/lib/service';
import PropsContext from '../context/PropsContext';
import ClickColumnParams from '../model/ClickColumnParams';


interface Props {
  projectId: string;
  editable?: boolean;
  onClickColumn?: (params: ClickColumnParams) => void;
  date?: Moment;
  listCountPerPage?: number;
}

interface InjectedProps {
  yearLeaveService: YearLeaveService;
  yearLeavesService: YearLeavesService;
  paginationService: PaginationService;
}

/**
 * 연차관리 리스트 컴포넌트입니다.
 */
@autobind
@observer
class YearLeaveListContainer extends ReactComponent<Props, {}, InjectedProps> {
  //
  static defaultProps = {
    editable: false,
    date: moment(),
    listCountPerPage: 20,
  };

  componentDidMount() {
    //
    this.init();
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    //
    const { date: prevDate, editable: prevEditable } = prevProps;
    const { date, editable } = this.props;

    if (prevDate !== date) {
      this.init();
    }
    if (prevEditable !== editable && !editable) {
      this.modifyYearLeaves();
    }
  }

  getContext() {
    //
    const { editable = false, onClickColumn = () => {} } = this.props;
    return { editable, onClickColumn, onChangePage: this.onChangePage };
  }

  init() {
    //
    const { projectId, listCountPerPage } = this.props;
    const { paginationService } = this.injected;

    paginationService.initOffsetAndLimit(0, listCountPerPage || 20);

    this.findYearLeaves(projectId);
  }

  findYearLeaves(projectId: string) {
    //
    const { yearLeavesService, paginationService } = this.injected;
    const { date } = this.props;
    const year = date!.format('YYYY');

    const offset = paginationService.getOffsetModel();

    yearLeavesService.findYearLeavesByYear(projectId, year, offset)
      .then(() => paginationService.updateStartIndex());
  }

  modifyYearLeaves() {
    //
    const { yearLeavesService } = this.injected;
    const { projectId } = this.props;

    yearLeavesService.modifyYearLeaves().then(() => this.findYearLeaves(projectId));
  }

  onChangePage(page: number) {
    //
    const { projectId } = this.props;
    const { paginationService } = this.injected;

    paginationService.updateOffsetByPage(page);
    paginationService.setCurrentPage(page);

    this.findYearLeaves(projectId);
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
  YearLeaveService,
  YearLeavesService,
  PaginationService,
)(YearLeaveListContainer);
