import React from 'react';
import { autobind, ReactComponent } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { Icon } from '@nara.platform/react-ui';
import { PanelSubFields } from '../../../shared';
import { LeaveCategoryIconType, LeaveCategoryType } from '~/lib';


@autobind
@observer
class HeaderContainer extends ReactComponent {
  //
  render() {
    //
    return (
      <PanelSubFields>
        <PanelSubFields.LabelGroup className="icon-info" textAlign="right" verticalAlign="middle">
          <div>
            <Icon className={LeaveCategoryIconType[LeaveCategoryType.Vacation]} />
            연차/월차
          </div>
          <div>
            <Icon className={LeaveCategoryIconType[LeaveCategoryType.HalfOff]} />
            반차
          </div>
          <div>
            <Icon className={LeaveCategoryIconType[LeaveCategoryType.MaternityLeave]} />
            출산휴가
          </div>
          <div>
            <Icon className={LeaveCategoryIconType[LeaveCategoryType.CondolenceLeave]} />
            경조사
          </div>
          <div>
            <Icon className={LeaveCategoryIconType[LeaveCategoryType.SickLeave]} />
            병가
          </div>
          <div>
            <Icon className={LeaveCategoryIconType[LeaveCategoryType.BonusLeave]} />
            보너스
          </div>
        </PanelSubFields.LabelGroup>
      </PanelSubFields>
    );
  }
}

export default HeaderContainer;
