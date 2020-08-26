
import React from 'react';
import { ReactComponent, autobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Form, Grid } from '@nara.platform/react-ui';
import { LeaveCategoryDisplayType, LeavePlanModel, LeavePlanStateDisplay } from '~/lib/model';
import FieldView from './FieldView';


interface Props {
  leavePlan: LeavePlanModel;
}

@autobind
@observer
class ContentReadView extends ReactComponent<Props> {
  //
  render() {
    //
    const { leavePlan } = this.props;

    return (
      <div className="wrapper">
        <Grid columns={16}>
          <FieldView label="휴가등록/휴가자">
            <Form.Field width={16}>
              <span>{leavePlan.memberName}</span>
            </Form.Field>
          </FieldView>

          <FieldView label="휴가타입">
            <Form.Field width={16}>
              <span>{LeaveCategoryDisplayType[leavePlan.type.category]}</span>
            </Form.Field>
          </FieldView>

          <FieldView label="기간">
            <Form.Field width={16}>
              <span>{leavePlan.period.startDate}</span>
              <span className="wave">~</span>
              <span>{leavePlan.period.endDate} ({leavePlan.period.periodDays}일)</span>
            </Form.Field>
          </FieldView>

          <FieldView label="상태">
            <Form.Field width={16}>
              <span>{LeavePlanStateDisplay[leavePlan.state] || ''}</span>
            </Form.Field>
          </FieldView>

          <FieldView label="연차사용">
            <Form.Field width={16}>
              <span>{leavePlan.dayCount}일</span>
            </Form.Field>
          </FieldView>

          <FieldView label="휴가사유">
            <Form.Field width={16}>
              <span>{leavePlan.comment || '-'}</span>
            </Form.Field>
          </FieldView>
        </Grid>
      </div>
    );
  }
}

export default ContentReadView;
