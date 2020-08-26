
import { autobind, LocalDateTimeModel } from '@nara.platform/accent';
import PunchInModel from '../vo/PunchInModel';


@autobind
class PunchInCdo {
  //
  office: string = '';
  time: number[] | null = null;
  comment: string = '';


  static fromModel(punchInModel: PunchInModel): PunchInCdo {
    //
    return {
      office: punchInModel.office,
      time: LocalDateTimeModel.toDomain(punchInModel.time),
      comment: punchInModel.comment,
    };
  }

  static fromModelWithOutTime(punchInModel: PunchInModel): PunchInCdo {
    //
    return {
      office: punchInModel.office,
      time: null,
      comment: punchInModel.comment,
    };
  }

}

export default PunchInCdo;

