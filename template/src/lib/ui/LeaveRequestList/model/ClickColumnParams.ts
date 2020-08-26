
import { LeavePlanModel, LeaveModel } from '~/lib/model';


interface ClickColumnParams {
  //
  columnIndex: number;
  leave: LeavePlanModel | LeaveModel;
}

export default ClickColumnParams;
