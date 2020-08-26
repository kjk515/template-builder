
import { CqrsBaseCommand, CqrsBaseCommandType, NameValueListModel } from '@nara.platform/accent';
import { LeavePlanCdo } from '~/lib/model';


class LeavePlanBaseCommand extends CqrsBaseCommand {
  //
  leavePlanCdo?: LeavePlanCdo;
  leavePlanId?: string;
  nameValues?: NameValueListModel;


  static newModify(leavePlanId: string, nameValues: NameValueListModel) {
    //
    const command = new LeavePlanBaseCommand(CqrsBaseCommandType.Modify);

    command.leavePlanId = leavePlanId;
    command.nameValues = nameValues;
    return command;
  }
}

export default LeavePlanBaseCommand;
