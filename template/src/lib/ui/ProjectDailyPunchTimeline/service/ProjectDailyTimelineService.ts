
import { observable, action, runInAction } from 'mobx';
import { autobind, mobxService, observableArray, OffsetModel } from '@nara.platform/accent';
import { Moment } from 'moment';

import {
  ManDayTimelineModel,
  ManDayModel,
} from '~/lib/model';
import MemberQueryApi from '~/lib/service/punch/apiclient/MemberQueryApi';
import ManDayQueryApi from '~/lib/service/punch/apiclient/ManDayQueryApi';


@autobind
@mobxService
class ProjectDailyTimelineService {
  //
  static readonly instanceName = 'projectDailyTimelineService';
  static instance: ProjectDailyTimelineService;

  private memberQueryApi: MemberQueryApi;
  private manDayQueryApi: ManDayQueryApi;

  @observableArray
  manDayTimelineModels: ManDayTimelineModel[] = [];

  @observable
  totalCount: number = 0;

  constructor(
    memberQueryApi: MemberQueryApi = MemberQueryApi.instance,
    manDayQueryApi: ManDayQueryApi = ManDayQueryApi.instance) {
    this.memberQueryApi = memberQueryApi;
    this.manDayQueryApi = manDayQueryApi;
  }

  @action
  async findManDaysAndMakeTimelines(projectId: string, date: Moment, offset: OffsetModel): Promise<void> {
    //
    const timelines = await this.manDayQueryApi.findManDaysByProjectIdAndDateAndOffset(projectId, date, offset)
      .then((manDayOffsetElements) => {
        runInAction(() => this.totalCount = manDayOffsetElements.totalCount);

        return manDayOffsetElements.results.map((manDay) => this.makeTimelineModel(manDay));
      });

    runInAction(() => this.manDayTimelineModels = timelines);
  }

  @action
  setTotalCount(count: number) {
    //
    this.totalCount = count;
  }

  @action
  makeTimelineModel(manDayDomain: ManDayModel): ManDayTimelineModel {
    //
    const manDay = ManDayModel.fromDomain(manDayDomain);

    const hours: number[] = [];

    for (let hour = 0; hour < 24; hour++) {
      hours.push(hour);
    }

    return new ManDayTimelineModel(manDay.member, manDay, hours);
  }
}

ProjectDailyTimelineService.instance = new ProjectDailyTimelineService();
export default ProjectDailyTimelineService;
