
import { observable, action, runInAction } from 'mobx';
import { autobind, mobxService, NotInstantiatedException } from '@nara.platform/accent';
import _ from 'lodash';

import { MemberModel } from '~/lib/model';
import MemberQueryApi from '../apiclient/MemberQueryApi';


@autobind
@mobxService
class MemberService {
  //
  static readonly instanceName = 'memberService';
  static readonly serviceName = 'timecard.project.memberService';
  static instance: MemberService;

  private readonly memberQueryApi: MemberQueryApi;

  @observable
  member: MemberModel | null = null;


  constructor(memberQueryApi: MemberQueryApi = MemberQueryApi.instance) {
    this.memberQueryApi = memberQueryApi;
  }

  @action
  clearMember() {
    //
    this.member = null;
  }

  @action
  setMemberProp(name: string, value: any) {
    //
    if (!this.member) {
      throw new NotInstantiatedException('MemberService', `member -> name: ${name}, value: ${value}`);
    }
    this.member = _.set(this.member, name, value);
  }

  @action
  async findMemberById(memberId: string): Promise<MemberModel> {
    //
    const member = await this.memberQueryApi.findMember(memberId);

    runInAction(() => this.member = member);
    return member;
  }

  @action
  async findMemberByProjectIdAndAudienceId(projectId: string): Promise<MemberModel | null> {
    //
    const member = await this.memberQueryApi.findMemberByProjectIdAndAudienceId(projectId);

    runInAction(() => this.member = member);
    return member;
  }
}

MemberService.instance = new MemberService();
export default MemberService;
