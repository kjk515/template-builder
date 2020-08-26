import React from 'react';
import { autobind, ReactComponent } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { Checkbox, Form, Grid } from '@nara.platform/react-ui';


interface Props {
  gridTitle: string;
  gridContent: string;
  onCheck?: (isActual: boolean) => void;
  checkboxText?: string;
  checkable?: boolean;
}

@autobind
@observer
class PunchInOutRowView extends ReactComponent<Props> {
  //
  render() {
    const { gridTitle, gridContent, onCheck, checkboxText, checkable } = this.props;

    return (
      <Grid.Row>
        <Grid.Column width={4} verticalAlign="middle" textAlign="right" className="title">
          {gridTitle}
        </Grid.Column>
        <Grid.Column width={12}>
          <Form>
            <Form.Group inline>
              <Form.Field width={16}>
                <span>{gridContent}</span>
                {
                  onCheck && checkable ?
                    <Checkbox size={'tiny'} label={checkboxText} onChange={(e, data) => onCheck(data.checked || false)} />
                    :
                    null
                }
              </Form.Field>
            </Form.Group>
          </Form>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default PunchInOutRowView;
