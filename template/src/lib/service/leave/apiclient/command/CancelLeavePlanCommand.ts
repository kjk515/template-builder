
import { CqrsUserCommand } from '@nara.platform/accent';


class CancelLeavePlanCommand extends CqrsUserCommand {
  //
  leavePlanId?: string;


  static new(leavePlanId: string) {
    //
    const command = new CancelLeavePlanCommand();

    command.leavePlanId = leavePlanId;
    return command;
  }
}

export default CancelLeavePlanCommand;
