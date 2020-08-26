
import { CqrsUserCommand, NameValueList } from '@nara.platform/accent';


class ModifyLeavePlanPeriodCommand extends CqrsUserCommand {
  //
  leavePlanId?: string;
  nameValues?: NameValueList;

  static new(leavePlanId: string, nameValues: NameValueList) {
    //
    const command = new ModifyLeavePlanPeriodCommand();

    command.leavePlanId = leavePlanId;
    command.nameValues = nameValues;

    return command;
  }
}

export default ModifyLeavePlanPeriodCommand;
