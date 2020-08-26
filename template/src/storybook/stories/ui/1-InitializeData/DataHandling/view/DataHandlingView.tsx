
import React, { Component } from 'react';
import { autobind } from '@nara.platform/accent';

import { Button } from '@nara.platform/react-ui';
import moment, { Moment } from 'moment';
import DatePicker from 'react-datepicker';


interface Props {
  onClickClearTodayData: () => void;
  onClickInitData: () => void;
  onClickClearData: () => void;
  date: Moment;
  onChangeDate: (date: Moment) => void;
}


@autobind
class DataHandlingView extends Component<Props> {
  //
  render() {
    //
    const { onClickClearData, onClickClearTodayData, onClickInitData, date, onChangeDate } = this.props;

    return (
      <>
        <span> Data Setting </span>
        <br />
        <br />
        <DatePicker
          placeholderText="날짜를 선택해주세요."
          selected={date.toDate()}
          onChange={(date: Date) => onChangeDate(moment(date).endOf('day'))}
          dateFormat="yyyy.MM.dd"
        />
        <Button primary size="tiny" onClick={onClickClearTodayData}>출/퇴근 초기화</Button>

        <br />
        <br />
        <hr />

        <Button primary size="tiny" onClick={onClickInitData}>초기 데이터 세팅</Button>

        <Button primary size="tiny" onClick={onClickClearData}>데이터 삭제</Button>
      </>
    );
  }
}

export default DataHandlingView;

