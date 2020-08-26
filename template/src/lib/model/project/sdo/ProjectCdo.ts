
import { autobind, IdNameModel, DatePeriodModel } from '@nara.platform/accent';
import ProjectModel from '../ProjectModel';


@autobind
class ProjectCdo {
  //
  name: string = '';
  manager: IdNameModel | null = null;
  period: DatePeriodModel | null = null;
  description: string = '';


  static fromModel(project: ProjectModel): ProjectCdo {
    //
    return {
      name: project.name,
      manager: project.manager,
      period: project.period,
      description: project.description,
    };
  }
}

export default ProjectCdo;
