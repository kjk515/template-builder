
import { CqrsUserCommand } from '@nara.platform/accent';


class FinishLeaveCommand extends CqrsUserCommand {
  //
  leaveId?: string;


  static new(leaveId: string) {
    //
    const command = new FinishLeaveCommand();

    command.leaveId = leaveId;
    return command;
  }
}

export default FinishLeaveCommand;
