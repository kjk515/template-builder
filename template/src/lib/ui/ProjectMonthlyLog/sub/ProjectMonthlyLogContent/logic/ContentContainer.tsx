import React from 'react';
import { autobind, IdName, ReactComponent, ServiceInjector } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ManMonthsService, PaginationService } from '~/lib/service';
import MemberParams from '../../../model/MemberParams';
import ProjectMonthlyLogService from '../../../service/ProjectMonthlyLogService';
import ContentTableView from '../view/ContentTableView';


interface Props {
  onClickMemberName?: (params: MemberParams) => void;
}

interface InjectedProps {
  manMonthsService: ManMonthsService;
  projectMonthlyLogService: ProjectMonthlyLogService;
  paginationService: PaginationService;
}

@autobind
@observer
class ContentContainer extends ReactComponent<Props, {}, InjectedProps> {
  //
  static defaultProps = {
    onClickMemberName: () => {},
  };

  onClickMemberName(member: IdName) {
    //
    const { onClickMemberName } = this.props;

    if (onClickMemberName) {
      onClickMemberName({ member });
    }
  }

  render() {
    //
    const { manMonthsService, projectMonthlyLogService, paginationService } = this.injected;
    const { manMonths } = manMonthsService;
    const { date, dates } = projectMonthlyLogService;
    const { startIndex } = paginationService;

    return (
      <ContentTableView
        date={date}
        dates={dates}
        startIndex={startIndex}
        manMonths={manMonths}
        onClickMemberName={this.onClickMemberName}
      />
    );
  }
}

export default ServiceInjector.useContext(
  ManMonthsService,
  ProjectMonthlyLogService,
  PaginationService,
)(ContentContainer);
