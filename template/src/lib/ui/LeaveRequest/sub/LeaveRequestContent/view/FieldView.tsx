
import React from 'react';
import { ReactComponent } from '@nara.platform/accent';
import { SemanticWIDTHSNUMBER, Grid, Form } from '@nara.platform/react-ui';


interface Props {
  label: string;
  children: React.ReactNode;
  labelWidth?: SemanticWIDTHSNUMBER;
}

class FieldView extends ReactComponent<Props> {
  //
  static defaultProps = {
    labelWidth: 4,
  };

  render() {
    //
    const { label, labelWidth, children } = this.props;
    const contentWidth = (16 - (labelWidth as number)) as SemanticWIDTHSNUMBER;

    return (
      <Grid.Row>
        <Grid.Column width={labelWidth} className="title" verticalAlign="middle" textAlign="right">
          {label}
        </Grid.Column>
        <Grid.Column width={contentWidth}>
          <Form>
            <Form.Group inline>
              {children}
            </Form.Group>
          </Form>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default FieldView;
