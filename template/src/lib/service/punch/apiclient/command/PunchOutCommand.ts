import { CqrsUserCommand } from '@nara.platform/accent';
import { PunchOutCdo } from '~/lib/model';


class PunchOutCommand extends CqrsUserCommand {
  //
  manDayId?: string;
  punchOutCdo?: PunchOutCdo;


  static new(manDayId: string, punchOutCdo: PunchOutCdo) {
    //
    const command = new PunchOutCommand();

    command.manDayId = manDayId;
    command.punchOutCdo = punchOutCdo;
    return command;
  }
}

export default PunchOutCommand;
