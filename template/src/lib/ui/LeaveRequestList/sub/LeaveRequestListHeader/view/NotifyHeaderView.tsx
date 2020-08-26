
import React from 'react';
import { ReactComponent, autobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { Grid } from '@nara.platform/react-ui';


interface Props {
  newLeaveCount: number;
}

@autobind
@observer
class NotifyHeaderView extends ReactComponent<Props> {
  //
  render() {

    const { newLeaveCount } = this.props;

    return (
      <Grid className="info-section">
        <Grid.Row>
          <Grid.Column width={16} verticalAlign="middle">
            <div className="content-sub-info">
              <span className="count">&apos;{newLeaveCount}&apos;</span>건의 새로운 휴가가 등록되었습니다
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default NotifyHeaderView;
