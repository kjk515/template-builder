
import { ApiClient } from '@nara.platform/accent';
import { MemberModel } from '~/lib/model';
import { MemberBaseQuery, MembersBaseQuery, FindMemberQuery, CountTotalMemberQuery } from './query';


class MemberQueryApi {
  //
  static instance: MemberQueryApi;
  private readonly client = new ApiClient('/api/timecard/punch-', {
    resDataName: 'queryResult',
  });

  async findMember(memberId: string): Promise<MemberModel> {
    //
    return this.baseQueryModel(MemberBaseQuery.by(memberId));
  }

  async findMembersByAudienceId(audienceId: string) {
    //
    return this.baseQueryModels(MembersBaseQuery.byAudienceId(audienceId));
  }

  async findMembersByProjectId(projectId: string) {
    //
    return this.baseQueryModels(MembersBaseQuery.byProjectId(projectId));
  }

  async baseQueryModel(memberBaseQuery: MemberBaseQuery): Promise<MemberModel> {
    //
    return this.client.postNotNull<MemberModel>(Object, 'base-query/member/query', memberBaseQuery);
  }

  async baseQueryModels(membersBaseQuery: MembersBaseQuery): Promise<MemberModel[]> {
    //
    return this.client.postNotNull<MemberModel[]>(Array, 'base-query/member/list-query', membersBaseQuery);
  }

  /* UserQuery ------------------------------------------------------------------------------------------------------ */

  async findMemberByProjectIdAndAudienceId(projectId: string): Promise<MemberModel | null> {
    //
    const query = FindMemberQuery.byProjectId(projectId);
    return this.client.postNullable<MemberModel>(MemberModel, 'custom-query/member/find-member-by-project-id-and-audience-id', query);
  }

  async countMemberByProjectId(projectId: string) {
    //
    const query = CountTotalMemberQuery.byProjectId(projectId);

    return this.client.postNotNull<number>(Number, 'custom-query/member/count-members-by-project-id', query);
  }
}

MemberQueryApi.instance = new MemberQueryApi();
export default MemberQueryApi;
