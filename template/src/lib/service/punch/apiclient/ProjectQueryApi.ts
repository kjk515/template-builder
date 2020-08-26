
import { ApiClient } from '@nara.platform/accent';
import { ProjectModel } from '~/lib/model';
import FindDefaultProjectByCineroomKeyStringQuery from './query/FindDefaultProjectByCineroomKeyStringQuery';


class ProjectQueryApi {
  //
  static instance: ProjectQueryApi;

  private readonly client = new ApiClient('/api/timecard/punch-', {
    resDataName: 'queryResult',
  });


  async findDefaultProject(): Promise<ProjectModel> {
    //
    const query = new FindDefaultProjectByCineroomKeyStringQuery();
    return this.client.postNotNull<ProjectModel>(ProjectModel, 'custom-query/project/find-default-project', query);
  }
}

ProjectQueryApi.instance = new ProjectQueryApi();
export default ProjectQueryApi;
