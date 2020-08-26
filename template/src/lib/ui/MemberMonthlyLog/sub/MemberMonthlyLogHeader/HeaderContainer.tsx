import React, { ContextType } from 'react';
import { autobind, ReactComponent, ServiceInjector } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import moment from 'moment';
import { Form, SelectDatePicker } from '@nara.platform/react-ui';

import { PanelSubFields } from '../../../shared';
import MemberMonthlyLogContext from '../../context/MemberMonthlyLogContext';
import MemberMonthlyLogService from '../../service/MemberMonthlyLogService';



interface InjectedProps {
  memberMonthlyLogService: MemberMonthlyLogService;
}

@autobind
@observer
class HeaderContainer extends ReactComponent<{}, {}, InjectedProps> {
  //
  static contextType = MemberMonthlyLogContext;

  context!: ContextType<typeof MemberMonthlyLogContext>;


  render() {
    //
    const { memberMonthlyLogService } = this.injected;
    const { date, workingDayCount, workingMinutes } = memberMonthlyLogService;
    const { memberMonthlyLog } = this.context;

    return (
      <PanelSubFields>
        <PanelSubFields.LabelGroup className="state-info" width={10}>
          <SelectDatePicker
            defaultDate={moment(date)}
            onChange={memberMonthlyLog.onChangeDate}
          >
            <Form>
              <Form.Group inline>
                <SelectDatePicker.Unit type={SelectDatePicker.DateUnitType.Year} min={2020} />
                <SelectDatePicker.Unit type={SelectDatePicker.DateUnitType.Month} max={moment().month()} />
              </Form.Group>
            </Form>
          </SelectDatePicker>

          <PanelSubFields.CountLabel
            label="근무일"
            divider="|"
            count={workingDayCount}
            countingUnit="일"
          />
          <PanelSubFields.CountLabel
            label="근무시간"
            count={workingMinutes}
            countingUnit="분"
          />
        </PanelSubFields.LabelGroup>

        <PanelSubFields.ManDayLabels width={6} />
      </PanelSubFields>
    );
  }
}

export default ServiceInjector.useContext(
  MemberMonthlyLogService
)(HeaderContainer);
