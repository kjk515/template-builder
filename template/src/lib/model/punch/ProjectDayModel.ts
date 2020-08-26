
import { extendObservable } from 'mobx';
import { fromDomain, autobind, CineroomEntityModel, NameValueListModel, LocalDateModel } from '@nara.platform/accent';
import { Moment } from 'moment';


@autobind
@fromDomain
class ProjectDayModel extends CineroomEntityModel {
  //
  zoneId: string = '';
  date: Moment | null = null;

  holiday: boolean = false;
  comment: string = '';

  projectId: string = '';


  constructor(projectDay?: ProjectDayModel) {
    //
    super(projectDay);

    extendObservable(this, {
      zoneId: projectDay ? projectDay.zoneId : '',
      dateDate: projectDay ? projectDay.date : null,
      holiday: projectDay ? projectDay.holiday : false,
      comment: projectDay ? projectDay.comment : '',

      projectId: projectDay ? projectDay.projectId : '',
    });
  }

  static fromDomain(domain: ProjectDayModel): ProjectDayModel {
    //
    domain.date = domain.date ? LocalDateModel.fromDomain(domain.date).toMoment() : null;
    return new ProjectDayModel(domain);
  }

  static asNameValues(projectDay: ProjectDayModel): NameValueListModel {
    //
    return NameValueListModel.fromModel(ProjectDayModel, projectDay, {
      holiday: JSON,
      comment: String,
      projectId: String,
    });
  }
}

export default ProjectDayModel;
