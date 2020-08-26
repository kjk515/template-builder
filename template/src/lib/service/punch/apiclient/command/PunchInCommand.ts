import { CqrsUserCommand } from '@nara.platform/accent';
import { PunchInCdo } from '~/lib/model';


class PunchInCommand extends CqrsUserCommand {
  //
  manDayId?: string;
  office?: string;
  punchInCdo?: PunchInCdo;


  static new(manDayId: string, office: string, punchInCdo: PunchInCdo) {
    //
    const command = new PunchInCommand();

    command.manDayId = manDayId;
    command.office = office;
    command.punchInCdo = punchInCdo;
    return command;
  }
}

export default PunchInCommand;
