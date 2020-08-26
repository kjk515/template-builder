
import { CqrsUserCommand } from '@nara.platform/accent';


class DoLeavePlanCommand extends CqrsUserCommand {
  //
  leavePlanId?: string;


  static new(leavePlanId: string) {
    //
    const command = new DoLeavePlanCommand();

    command.leavePlanId = leavePlanId;
    return command;
  }
}

export default DoLeavePlanCommand;
