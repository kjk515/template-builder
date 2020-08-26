import React from 'react';
import { autobind, ReactComponent } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Grid } from '@nara.platform/react-ui';
import { Moment } from 'moment';
import { DailyPunchModel, PunchInModel, PunchOutModel } from '~/lib/model';
import PunchInOutRowView from './PunchInOutRowView';


interface Props {
  dailyPunch: DailyPunchModel;
  date: Date | Moment;
  getRowViewContent: (punch: PunchInModel | PunchOutModel, isActualTime?: boolean) => string;
}

@autobind
@observer
class PunchInOutContentView extends ReactComponent<Props> {
  //
  render() {
    const {
      dailyPunch, getRowViewContent,
    } = this.props;

    return (
      <>
        <div className="wrapper">
          <Grid columns={16}>
            <PunchInOutRowView
              gridTitle={'출근시간'}
              gridContent={getRowViewContent(dailyPunch.punchIn)}
            />
            {
              dailyPunch.isPunchInDiffActual ?
                <>
                  <PunchInOutRowView
                    gridTitle={'실제 출근 시간'}
                    gridContent={getRowViewContent(dailyPunch.punchIn, true)}
                  />
                  <PunchInOutRowView
                    gridTitle="사유"
                    gridContent={dailyPunch.punchIn.comment || '-' }
                  />
                </> : null
            }
          </Grid>
        </div>
        {
          dailyPunch.complete
          && dailyPunch.isPunchOut && dailyPunch.punchOut ?
            (
              <div className="wrapper">
                <Grid columns={16}>
                  <PunchInOutRowView
                    gridTitle={'퇴근시간'}
                    gridContent={getRowViewContent(dailyPunch.punchOut)}
                  />
                  {
                    dailyPunch.isPunchOutDiffActual ?
                      <>
                        <PunchInOutRowView
                          gridTitle={'실제 퇴근 시간'}
                          gridContent={getRowViewContent(dailyPunch.punchOut, true)}
                        />
                        <PunchInOutRowView
                          gridTitle="사유"
                          gridContent={dailyPunch.punchOut.comment || '-'}
                        />
                      </> : null
                  }
                </Grid>
              </div>
            )
            :
            null
        }
      </>
    );
  }
}

export default PunchInOutContentView;
