
import { extendObservable } from 'mobx';
import {
  fromDomain, autobind, CineroomEntityModel, IdNameModel, NameValueListModel, DatePeriodModel,
} from '@nara.platform/accent';
import PunchRuleModel from './vo/PunchRuleModel';


@fromDomain
@autobind
class ProjectModel extends CineroomEntityModel {
  //
  name: string = '';
  manager: IdNameModel = new IdNameModel();
  period: DatePeriodModel = new DatePeriodModel();
  zoneId: string = '';
  description: string = '';
  punchRule: PunchRuleModel = new PunchRuleModel();


  constructor(project?: ProjectModel) {
    //
    super(project);

    extendObservable(this, {
      name: project ? project.name : '',
      manager: project ? project.manager : new IdNameModel(),
      period: project ? project.period : new DatePeriodModel(),
      zoneId: project ? project.zoneId : '',
      description: project ? project.description : '',
      punchRule: project ? project.punchRule : new PunchRuleModel(),
    });
  }

  static fromDomain(domain: ProjectModel): ProjectModel {
    //
    const project = new ProjectModel(domain);

    project.period = domain.period && DatePeriodModel.fromDomain(domain.period);
    project.manager = domain.manager && new IdNameModel(domain.manager.id, domain.manager.name);
    project.punchRule = domain.punchRule && new PunchRuleModel(domain.punchRule);

    return project;
  }

  static fromDomains(domains: ProjectModel[]): ProjectModel[] {
    //
    return domains.map(domain => this.fromDomain(domain));
  }

  static asNameValues(project: ProjectModel): NameValueListModel {
    //
    return NameValueListModel.fromModel(ProjectModel, project, {
      name: String,
      manager: JSON,
      period: JSON,
      description: String,
      punchRule: JSON,
    });
  }
}

export default ProjectModel;
