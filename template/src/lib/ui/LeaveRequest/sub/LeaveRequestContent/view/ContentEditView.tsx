
import React from 'react';
import { autobind, ReactComponent } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import moment from 'moment';
import DatePicker from 'react-datepicker';
import { Form, Grid, Icon, Radio, Select, TextArea, TextAreaProps } from '@nara.platform/react-ui';
import { LeavePlanModel, HalfOffType, LeaveCategoryType, TimePeriodModel, YearLeaveModel, MemberModel } from '~/lib/model';
import FieldView from './FieldView';


interface Props {
  leavePlan: LeavePlanModel;
  member: MemberModel;
  yearLeave?: YearLeaveModel;
  onlyPeriod?: boolean;
  onChangeProp: (name: keyof LeavePlanModel, value: any) => void;
  onChangeTimeProp: (name: keyof TimePeriodModel, value: any) => void;
}

const option = [
  { key: 1, text: '연/월차', value: LeaveCategoryType.Vacation },
  { key: 3, text: '반차', value: LeaveCategoryType.HalfOff },
  { key: 4, text: '출산휴가', value: LeaveCategoryType.MaternityLeave },
  { key: 2, text: '경조사', value: LeaveCategoryType.CondolenceLeave },
  { key: 5, text: '병가', value: LeaveCategoryType.SickLeave },
  { key: 6, text: '보너스', value: LeaveCategoryType.BonusLeave },
];

const optionExceptBonusLeave = [
  { key: 1, text: '연/월차', value: LeaveCategoryType.Vacation },
  { key: 3, text: '반차', value: LeaveCategoryType.HalfOff },
  { key: 4, text: '출산휴가', value: LeaveCategoryType.MaternityLeave },
  { key: 2, text: '경조사', value: LeaveCategoryType.CondolenceLeave },
  { key: 5, text: '병가', value: LeaveCategoryType.SickLeave },
];

const hours = [
  { key: '09', text: '09', value: '09' },
  { key: '10', text: '10', value: '10' },
  { key: '11', text: '11', value: '11' },
  { key: '12', text: '12', value: '12' },
  { key: '13', text: '13', value: '13' },
  { key: '14', text: '14', value: '14' },
  { key: '15', text: '15', value: '15' },
  { key: '16', text: '16', value: '16' },
  { key: '17', text: '17', value: '17' },
  { key: '18', text: '18', value: '18' },
];

const minutes = [
  { key: '00', text: '00', value: '00' },
  { key: '30', text: '30', value: '30' },
];

@autobind
@observer
class ContentEditView extends ReactComponent<Props> {
  //
  render() {
    //
    const { member, yearLeave, leavePlan, onlyPeriod, onChangeProp, onChangeTimeProp } = this.props;

    if (!leavePlan || !yearLeave) {
      return null;
    }

    return (
      <div className="wrapper">
        <Grid columns={16}>
          <FieldView label="휴가타입" labelWidth={3}>
            <Form.Field
              disabled={onlyPeriod}
              width={16}
              control={Select}
              fluid
              options={yearLeave.permitCounts.added ? option : optionExceptBonusLeave}
              defaultValue={option[0].value}
              onChange={(e: Event, data: any) => onChangeProp('typeCategory', data.value)}
            />
          </FieldView>

          <FieldView label={leavePlan.type.category === LeaveCategoryType.HalfOff ? '날짜/시간' : '기간'} labelWidth={3}>
            <Form.Field width={16}>
              <div className="ui calendar" id="rangestart">
                <div className="ui input right icon">
                  <DatePicker
                    placeholderText="시작날짜를 선택해주세요."
                    selected={leavePlan.period.startDateObj || new Date()}
                    onChange={(date: Date) => onChangeProp('periodStartDate', date)}
                    minDate={new Date()}
                    dateFormat="yyyy.MM.dd"
                  />
                  <Icon className="calendar alternate outline"><span className="blind">date</span></Icon>
                </div>
              </div>
            </Form.Field>
            {
              leavePlan.type.category !== LeaveCategoryType.HalfOff ?
                <>
                  <span className="wave">~</span>
                  <div className="ui calendar" id="rangeend">
                    <div className="ui input right icon">
                      <DatePicker
                        placeholderText="종료날짜를 선택해주세요."
                        selected={leavePlan.period.endDateObj || moment().toDate()}
                        onChange={(date: Date) => onChangeProp('periodEndDate', date)}
                        minDate={leavePlan.period.startDateObj}
                        maxDate={member.period.endDateObj}
                        dateFormat="yyyy.MM.dd"
                      />
                      <Icon className="calendar alternate outline"><span className="blind">date</span></Icon>
                    </div>
                  </div>
                </>
                :
                <Form.Field width={8}>
                  <Radio
                    className="base"
                    label="오전"
                    checked={leavePlan.halfOffType === HalfOffType.Morning}
                    onChange={() => onChangeProp('halfOffType', HalfOffType.Morning)}
                  />
                  <Radio
                    className="base"
                    label="오후"
                    checked={leavePlan.halfOffType === HalfOffType.Afternoon}
                    onChange={() => onChangeProp('halfOffType', HalfOffType.Afternoon)}
                  />
                  <Radio
                    className="base"
                    label="시간선택"
                    checked={leavePlan.halfOffType === HalfOffType.Custom}
                    onChange={() => onChangeProp('halfOffType', HalfOffType.Custom)}
                  />
                </Form.Field>
            }
          </FieldView>
          {
            leavePlan.halfOffType === HalfOffType.Custom
            && (
              <FieldView label="" labelWidth={3}>
                <Form.Field width={16}>
                  <Select
                    fluid
                    options={hours}
                    value={leavePlan.halfOffTimePeriod && leavePlan.halfOffTimePeriod.startHour || ''}
                    onChange={(e, data) => onChangeTimeProp('startHour', data.value)}
                  />
                  <span style={{ marginRight: '10px' }}>시</span>
                  <Select
                    fluid
                    options={minutes}
                    value={leavePlan.halfOffTimePeriod && leavePlan.halfOffTimePeriod.startMinute || ''}
                    onChange={(e, data) => onChangeTimeProp('startMinute', data.value)}
                  />
                  <span style={{ marginRight: '10px' }}>분</span>
                  <span className="wave" style={{ margin: '10px' }}>~</span>
                  <Select
                    fluid
                    options={hours}
                    value={leavePlan.halfOffTimePeriod && leavePlan.halfOffTimePeriod.endHour || ''}
                    onChange={(e, data) => onChangeTimeProp('endHour', data.value)}
                  />
                  <span style={{ marginRight: '10px' }}>시</span>
                  <Select
                    fluid
                    options={minutes}
                    value={leavePlan.halfOffTimePeriod && leavePlan.halfOffTimePeriod.endMinute || ''}
                    onChange={(e, data) => onChangeTimeProp('endMinute', data.value)}
                  />
                  <span style={{ marginRight: '10px' }}>분</span>
                </Form.Field>
              </FieldView>
            )
          }
          <FieldView label="사유" labelWidth={3}>
            <Form.Field
              disabled={onlyPeriod}
              control={TextArea}
              placeholder="사유를 입력하세요"
              value={leavePlan.comment || ''}
              onChange={
                (e: React.FormEvent<HTMLTextAreaElement>, data: TextAreaProps) =>
                  onChangeProp('comment', `${data.value}`)
              }
            />
          </FieldView>
        </Grid>
      </div>
    );
  }
}

export default ContentEditView;
