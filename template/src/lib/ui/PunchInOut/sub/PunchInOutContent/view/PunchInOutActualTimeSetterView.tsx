import React from 'react';
import { autobind, ReactComponent } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import moment from 'moment';
import { DropdownProps, Form, Grid, Input, NameTextModel, Select } from '@nara.platform/react-ui';
import { DailyPunchModel } from '~/lib/model';


interface Props {
  gridTitle: string;
  dailyPunch: DailyPunchModel;
  hourOption: NameTextModel[];
  minuteOption: NameTextModel[];
  dateOption: NameTextModel[];
  onChangeTargetDailyPunchProp: (name: string, value: any) => void;
  initActualTimeProps: () => void;
  onChangeTimeProps: (name: string, value: string, inOut: boolean) => void;
  clearActualTimeProps: () => void;
}


@autobind
@observer
class PunchInOutActualTimeSetterView extends ReactComponent<Props> {
  //
  private now = moment();

  componentDidMount() {
    //
    const { initActualTimeProps } = this.props;

    initActualTimeProps();
  }

  componentWillUnmount() {
    const { clearActualTimeProps } = this.props;

    clearActualTimeProps();
  }

  render() {
    const {
      gridTitle, dailyPunch, hourOption, minuteOption, dateOption, onChangeTimeProps, onChangeTargetDailyPunchProp,
    } = this.props;

    const inOut = !dailyPunch.isPunchOut;

    return (
      <div className="wrapper">
        <Grid columns={16}>
          <Grid.Row>
            <Grid.Column width={4} verticalAlign="middle" textAlign="right" className="title">
              {gridTitle}
            </Grid.Column>
            <Grid.Column width={12}>
              <Form>
                <Form.Field width={16}>
                  <Select
                    className="small-dropdown"
                    options={dateOption}
                    defaultValue={dateOption[0].value}
                    onChange={(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) =>
                      onChangeTimeProps(`date`, data.value + '', inOut)
                    }
                  />
                </Form.Field>
                <Form.Group inline>
                  <Form.Field width={4}>
                    <Select
                      options={hourOption}
                      defaultValue={hourOption[this.now.hour()].value}
                      className="small-dropdown"
                      onChange={(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) =>
                        onChangeTimeProps(`hour`, data.value + '', inOut)}
                    />
                    <span>시</span>
                  </Form.Field>
                  <Form.Field width={4}>
                    <Select
                      options={minuteOption}
                      defaultValue={minuteOption[this.now.minute()].value}
                      className="small-dropdown"
                      onChange={(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) =>
                        onChangeTimeProps( `minute`, data.value + '', inOut)}
                    />
                    <span>분</span>
                  </Form.Field>
                </Form.Group>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4} verticalAlign="middle" textAlign="right" className="title">
              사유
            </Grid.Column>
            <Grid.Column width={12}>
              <Form>
                <Form.Group inline>
                  <Form.Field width={16}>
                    <Input
                      placeholder="사유를 5자이상 입력하세요."
                      onChange={(e: any) => onChangeTargetDailyPunchProp(
                        !dailyPunch.isPunchOut ?
                          'punchIn.comment'
                          : 'punchOut.comment',
                        e.target.value
                      )}
                    />
                  </Form.Field>
                </Form.Group>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default PunchInOutActualTimeSetterView;
