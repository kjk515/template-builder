
import { fromDomain, CqrsBaseQuery, Offset } from '@nara.platform/accent';
import { ManDayModel, ProjectDayModel } from '~/lib/model';


@fromDomain
class ProjectDayBaseQuery extends CqrsBaseQuery<ManDayModel> {
  //
  projectId?: string;
  offset?: Offset;


  constructor() {
    //
    super(ProjectDayModel);
  }

  static fromDomain(projectDayBaseQuery: ProjectDayBaseQuery): ProjectDayBaseQuery {
    //
    const query = new ProjectDayBaseQuery();

    query.setResponse(projectDayBaseQuery);
    return query;
  }

  static by(id: string): ProjectDayBaseQuery {
    //
    const query = new ProjectDayBaseQuery();

    query.id = id;
    return query;
  }

  static byProject(projectId: string, offset?: Offset) {
    //
    const query = new ProjectDayBaseQuery();

    query.projectId = projectId;
    query.offset = offset;
    return query;
  }

}

export default ProjectDayBaseQuery;
