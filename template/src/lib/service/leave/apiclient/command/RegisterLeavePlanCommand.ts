
import { CqrsUserCommand, NameValueListModel } from '@nara.platform/accent';
import { LeavePlanCdo } from '~/lib/model';


class RegisterLeavePlanCommand extends CqrsUserCommand {
  //
  leavePlanCdo?: LeavePlanCdo;
  leavePlanId?: string;
  nameValues?: NameValueListModel;


  static new(leavePlanCdo: LeavePlanCdo) {
    //
    const command = new RegisterLeavePlanCommand();

    command.leavePlanCdo = leavePlanCdo;
    return command;
  }
}

export default RegisterLeavePlanCommand;
