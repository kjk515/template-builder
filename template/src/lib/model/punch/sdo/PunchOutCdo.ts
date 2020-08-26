
import { autobind, LocalDateTimeModel } from '@nara.platform/accent';
import PunchOutModel from '../vo/PunchOutModel';


@autobind
class PunchOutCdo {
  //
  office: string = '';
  time: number[] | null = null;
  comment: string = '';


  static fromModel(punchOutModel: PunchOutModel): PunchOutCdo {
    //
    return {
      office: punchOutModel.office,
      time: LocalDateTimeModel.toDomain(punchOutModel.time),
      comment: punchOutModel.comment,
    };
  }

  static fromModelWithOutTime(punchOutModel: PunchOutModel): PunchOutCdo {
    //
    return {
      office: punchOutModel.office,
      time: null,
      comment: punchOutModel.comment,
    };
  }
}

export default PunchOutCdo;
