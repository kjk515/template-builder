
import { CqrsBaseCommand, CqrsBaseCommandType, NameValueList } from '@nara.platform/accent';
import { ManDayCdo } from '~/lib/model';


class ManDayBaseCommand extends CqrsBaseCommand {
  //
  manDayCdo?: ManDayCdo;
  manDayId?: string;
  nameValues?: NameValueList;


  static newRegister(manDayCdo: ManDayCdo): ManDayBaseCommand {
    //
    const command = new ManDayBaseCommand(CqrsBaseCommandType.Register);

    command.manDayCdo = manDayCdo;
    return command;
  }

  static newModify(manDayId: string, nameValues: NameValueList): ManDayBaseCommand {
    //
    const command = new ManDayBaseCommand(CqrsBaseCommandType.Modify);

    command.manDayId = manDayId;
    command.nameValues = nameValues;
    return command;
  }

  static newRemove(manDayId: string): ManDayBaseCommand {
    //
    const command = new ManDayBaseCommand(CqrsBaseCommandType.Remove);

    command.manDayId = manDayId;
    return command;
  }
}

export default ManDayBaseCommand;
