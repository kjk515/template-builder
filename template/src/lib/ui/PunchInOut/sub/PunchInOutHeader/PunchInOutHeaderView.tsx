import React from 'react';
import { autobind, ReactComponent, ServiceInjector } from '@nara.platform/accent';
import { Button, Grid, Header, Icon } from '@nara.platform/react-ui';
import PunchInOutService from '~/lib/ui/PunchInOut/service/PunchInOutService';


interface Props {
  text: string;
  onClickViewTimeLine?: () => void;
}

interface InjectedProps {
  punchInOutService: PunchInOutService;
}

@autobind
class PunchInOutHeaderView extends ReactComponent<Props, {}, InjectedProps> {
  //
  render() {
    //
    const { text, onClickViewTimeLine } = this.props;
    return (
      <Header textAlign="left">
        <Grid>
          <Grid.Column width={10}>
            <Grid.Row>
              <h3><Icon name={'user circle outline'} />{text}</h3>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={5} textAlign={'right'}>
            {onClickViewTimeLine ? <Button size="mini" secondary onClick={onClickViewTimeLine}>나의 출퇴근 기록보기</Button> : null}
          </Grid.Column>
        </Grid>
      </Header>
    );
  }
}

export default ServiceInjector.useContext(
  PunchInOutService
)(PunchInOutHeaderView);

