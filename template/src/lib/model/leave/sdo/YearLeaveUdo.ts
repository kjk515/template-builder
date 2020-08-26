
import { autobind, NameValueListModel } from '@nara.platform/accent';
import { YearLeaveModel } from '~/lib/model';


@autobind
class YearLeaveUdo {
  //
  yearLeaveId: string;
  nameValues: NameValueListModel;


  constructor(yearLeaveId: string, nameValues: NameValueListModel) {
    //
    this.yearLeaveId = yearLeaveId;
    this.nameValues = nameValues;
  }

  static fromModel(yearLeave: YearLeaveModel): YearLeaveUdo {
    //
    return new YearLeaveUdo(yearLeave.id, YearLeaveModel.asNameValues(yearLeave));
  }

  static fromModels(yearLeaves: YearLeaveModel[]): YearLeaveUdo[] {
    //
    return yearLeaves.map(yearLeave => YearLeaveUdo.fromModel(yearLeave));
  }
}

export default YearLeaveUdo;
