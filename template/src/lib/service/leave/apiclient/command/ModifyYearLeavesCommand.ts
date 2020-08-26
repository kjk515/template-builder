
import { CqrsUserCommand } from '@nara.platform/accent';
import { YearLeaveUdo } from '~/lib/model';


class ModifyYearLeavesCommand extends CqrsUserCommand {
  //
  yearLeaveUdos: YearLeaveUdo[] = [];


  static new(yearLeaveUdos: YearLeaveUdo[]) {
    //
    const command = new ModifyYearLeavesCommand();

    command.yearLeaveUdos = yearLeaveUdos;
    return command;
  }
}

export default ModifyYearLeavesCommand;
