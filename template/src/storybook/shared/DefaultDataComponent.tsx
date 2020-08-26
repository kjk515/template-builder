
import { storyLogger } from '@nara.platform/storybook';
import { ReactComponent, autobind, OffsetModel } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ProjectService, LeaveService } from '@nara.drama/timecard';


interface State {
  projectId: string;
  leavePlanIds: string[];
  leaveIds: string[];
  [key: string]: any;
}

@autobind
@observer
class DefaultDataComponent extends ReactComponent<{}, State> {
  //
  state: State = {
    projectId: '',
    leavePlanIds: [],
    leaveIds: [],
  };


  componentDidMount() {
    //
    this.findDefaultData();
  }

  getLeaveService(): LeaveService {
    //
    return LeaveService.instance;
  }

  getProjectId(): string {
    //
    return this.state.projectId;
  }

  getFirstLeavePlanId(): string {
    //
    return this.state.leavePlanIds[0] || '';
  }

  getFirstLeaveId(): string {
    //
    return this.state.leaveIds[0] || '';
  }


  async findDefaultData() {
    //
    let defaultProject;

    try {
      defaultProject = await ProjectService.instance.findDefaultProject();
    }
    catch (e) {
      storyLogger('DefaultProjectComponent', `Failed to findDefaultProject. Maybe the back-end has something wrong. - ${e}`);
    }

    if (defaultProject) {
      const leavePlans = await LeaveService.instance.findLeavesByProject(defaultProject.id, '2020-08', OffsetModel.newDescending(0, 10), true);
      const leaves = await LeaveService.instance.findLeavesByProject(defaultProject.id, '2020-07', OffsetModel.newDescending(0, 10), false);

      this.setState({
        projectId: defaultProject.id,
        leavePlanIds: leavePlans && leavePlans.length > 0 ? leavePlans.map(leavePlan => leavePlan.id) : [],
        leaveIds: leaves && leaves.length > 0 ? leaves.map(leave => leave.id) : [],
      });
    }
    else {
      this.setState({
        projectId: 'test',
        leavePlanIds: ['test'],
        leaveIds: ['test'],
      });
    }
  }
}

export default DefaultDataComponent;
