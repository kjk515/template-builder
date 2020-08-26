
import { CqrsUserCommand } from '@nara.platform/accent';


class CancelLeaveCommand extends CqrsUserCommand {
  //
  leaveId?: string;


  static new(leaveId: string) {
    //
    const command = new CancelLeaveCommand();

    command.leaveId = leaveId;
    return command;
  }
}

export default CancelLeaveCommand;
