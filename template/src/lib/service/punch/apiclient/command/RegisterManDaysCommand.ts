
import { CqrsUserCommand } from '@nara.platform/accent';
import { MemberModel } from '~/lib/model';


class RegisterManDaysCommand extends CqrsUserCommand {
  //
  projectId?: string;
  members: MemberModel[] = [];


  static new(projectId: string, members: MemberModel[]) {
    //
    const command = new RegisterManDaysCommand();

    command.projectId = projectId;
    command.members = members;
    return command;
  }
}

export default RegisterManDaysCommand;
