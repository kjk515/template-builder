
import React from 'react';
import { observer } from 'mobx-react';
import { ReactComponent, autobind } from '@nara.platform/accent';
import { Form, Grid, TextArea, TextAreaProps } from '@nara.platform/react-ui';
import { ChangeRequestModel } from '~/lib/model';
import FieldView from '../../LeaveRequestContent/view/FieldView';


interface Props {
  changeRequests: ChangeRequestModel[];
  onChangeChangeRequestsProp?: (index: number, name: keyof ChangeRequestModel, value: any) => void;
}

@autobind
@observer
class AdjustmentsView extends ReactComponent<Props> {
  //
  render() {
    //
    const { changeRequests, onChangeChangeRequestsProp } = this.props;

    return changeRequests.map((changeRequest, index) => (
      changeRequest.editable ?
        <div key={`changeRequest-${index}`} className="wrapper">
          <Grid>
            <FieldView label="조정 사유">
              <Form.Field
                control={TextArea}
                placeholder="사유를 입력하세요"
                value={changeRequest.comment || ''}
                onChange={
                  (e: React.FormEvent<HTMLTextAreaElement>, data: TextAreaProps) =>
                    onChangeChangeRequestsProp!(index, 'comment', `${data.value}`)
                }
              />
            </FieldView>
          </Grid>
        </div>
        :
        <div key={`changeRequest-${index}`} className="wrapper">
          <Grid>
            <FieldView label="조정요청 사유">
              <Form.Field width={16}>
                <span>{changeRequest.comment || ''}</span>
              </Form.Field>
            </FieldView>
            {
              changeRequest.response && changeRequest.response.comment
              && (
                <FieldView label="코멘트">
                  <Form.Field width={16}>
                    <span>{changeRequest.response.comment || ''}</span>
                  </Form.Field>
                </FieldView>
              )
            }
          </Grid>
        </div>
    ));
  }
}

export default AdjustmentsView;
