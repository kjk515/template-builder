import React from 'react';
import { autobind, ReactComponent, ServiceInjector } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import moment, { Moment } from 'moment';
import { LeaveManDaysService, ProjectService } from '~/lib/service';
import { ProjectModel } from '~/lib/model';
import DailyLogContext from '../context/DailyLogContext';


interface Props {
  projectId?: string;
  date: Date | Moment;
  children: React.ReactNode;
}

interface InjectedProps {
  leaveManDaysService: LeaveManDaysService;
  projectService: ProjectService;
}

/**
 * 해당 날짜 출퇴근, 휴가 요약 컴포넌트입니다.
 */
@autobind
@observer
class DailyLogContainer extends ReactComponent<Props, {}, InjectedProps> {
  //
  componentDidMount() {
    //
    const { projectId } = this.props;

    if (projectId) {
      this.initLeavesInfo(projectId);
    }
    else {
      this.findProject()
        .then(project => {
          this.initLeavesInfo(project.id);
        });
    }
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    //
    const { date: prevDate, projectId: preveProjectId } = prevProps;
    const { date, projectId } = this.props;

    if ((preveProjectId !== projectId) && projectId) {
      this.initLeavesInfo(projectId);
    }
    else if (prevDate !== date) {
      this.findProject()
        .then(project => {
          this.initLeavesInfo(project.id);
        });
    }
  }

  initLeavesInfo(projectId: string) {
    //
    const { date } = this.props;

    this.findLeaveManDays(projectId, moment(date));
  }

  async findProject(): Promise<ProjectModel> {
    //
    const { projectService } = this.injected;

    return projectService.findDefaultProject();
  }

  findLeaveManDays(projectId: string, momentDate: Moment): void {
    //
    const { leaveManDaysService } = this.injected;

    leaveManDaysService.findLeaveManDaysByProjectIdAndDate(projectId, momentDate);
  }

  getContext() {
    const { date } = this.props;
    return {
      date,
    };
  }

  render() {
    //
    return (
      <DailyLogContext.Provider value={this.getContext()}>
        {this.props.children}
      </DailyLogContext.Provider>
    );
  }
}

export default ServiceInjector.withContext(
  LeaveManDaysService,
  ProjectService,
)(DailyLogContainer);

