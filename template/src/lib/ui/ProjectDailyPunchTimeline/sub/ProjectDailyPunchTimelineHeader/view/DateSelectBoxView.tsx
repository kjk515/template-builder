
import React from 'react';
import { ReactComponent, autobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { NameTextModel, DropdownProps, Form, Grid, Select } from '@nara.platform/react-ui';


interface Props {
  dateList: NameTextModel[];
  date: string;
  onChangeDate: (date: any) => void;
}

@autobind
@observer
class DateSelectBoxView extends ReactComponent<Props> {
  //
  render() {
    //
    const { dateList, date, onChangeDate } = this.props;

    return (
      <Grid.Column width={8} textAlign="right" verticalAlign="middle">
        <Form>
          <span>날짜 : </span>
          <Form.Field
            control={Select}
            className="small-dropdown"
            options={dateList}
            value={date}
            onChange={(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => onChangeDate && onChangeDate(data.value)}
          />
        </Form>
      </Grid.Column>
    );
  }
}
export default DateSelectBoxView;

