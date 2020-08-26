
import { autobind, IdNameModel } from '@nara.platform/accent';
import ProjectDayModel from '../ProjectDayModel';


@autobind
class ManDayCdo {
  //
  projectDay: ProjectDayModel = new ProjectDayModel();
  member: IdNameModel | null = null;


  static fromModel(member: IdNameModel, projectDay: ProjectDayModel): ManDayCdo {
    //
    return {
      projectDay,
      member,
    };
  }
}

export default ManDayCdo;
