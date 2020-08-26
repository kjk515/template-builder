
import { LocalDateModel } from '@nara.platform/accent';
import ProjectDayModel from '../ProjectDayModel';


class ProjectDayCdo {
  //
  zoneId: string = '';
  date: LocalDateModel = LocalDateModel.now();
  holiday: boolean = false;
  comment: string = '';
  projectId: string = '';


  static fromModel(projectDay: ProjectDayModel) {
    //
    return {
      zoneId: projectDay.zoneId,
      date: projectDay.date,
      holiday: projectDay.holiday,
      comment: projectDay.comment,
      projectId: projectDay.projectId,
    };
  }
}

export default ProjectDayCdo;
