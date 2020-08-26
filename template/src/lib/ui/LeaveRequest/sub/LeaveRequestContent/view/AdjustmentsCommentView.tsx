
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
class AdjustmentsCommentView extends ReactComponent<Props> {
  //
  render() {
    //
    const { changeRequests, onChangeChangeRequestsProp } = this.props;

    return changeRequests.map((changeRequest, index) => (
      <div key={`changeRequest-${index}`} className="wrapper">
        <Grid>
          <FieldView label="조정요청 사유">
            <Form.Field width={16}>
              <span>{changeRequest.comment || ''}</span>
            </Form.Field>
          </FieldView>
          {
            changeRequests.length - 1 === index ?
              <FieldView label="코멘트">
                <Form.Field
                  control={TextArea}
                  placeholder="코멘트를 입력하세요"
                  value={changeRequest.responseComment || ''}
                  onChange={
                    (e: React.FormEvent<HTMLTextAreaElement>, data: TextAreaProps) =>
                      onChangeChangeRequestsProp!(index, 'responseComment', `${data.value}`)
                  }
                />
              </FieldView>
              :
              changeRequest.responseComment
              && (
                <FieldView label="코멘트">
                  <Form.Field width={16}>
                    <span>{changeRequest.responseComment || ''}</span>
                  </Form.Field>
                </FieldView>
              )
          }
        </Grid>
      </div>
    ));
  }
}

export default AdjustmentsCommentView;
