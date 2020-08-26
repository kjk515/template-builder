
import { observable, runInAction } from 'mobx';
import { autobind, mobxService } from '@nara.platform/accent';

import { ProjectModel } from '~/lib/model';
import ProjectQueryApi from '../apiclient/ProjectQueryApi';


@autobind
@mobxService
class ProjectService {
  //
  static readonly instanceName = 'projectService';
  static readonly serviceName = 'timecard.project.projectService';
  static instance: ProjectService;

  private readonly projectQueryApi: ProjectQueryApi;

  @observable
  project: ProjectModel | null = null;


  constructor(projectQueryApi: ProjectQueryApi = ProjectQueryApi.instance) {
    this.projectQueryApi = projectQueryApi;
  }

  async findDefaultProject(): Promise<ProjectModel> {
    //
    const defaultProject = await this.projectQueryApi.findDefaultProject();

    runInAction(() => this.project = defaultProject);
    return defaultProject;
  }
}

ProjectService.instance = new ProjectService();
export default ProjectService;
