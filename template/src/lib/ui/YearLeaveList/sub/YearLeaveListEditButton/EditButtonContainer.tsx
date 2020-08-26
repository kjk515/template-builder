
import React from 'react';
import { observer } from 'mobx-react';
import { ReactComponent, autobind, ServiceInjector } from '@nara.platform/accent';

import { Button } from '@nara.platform/react-ui';
import { YearLeaveService } from '~/lib/service/leave';
// import { YearLeaveService } from '~/lib';


interface Props {
  editable: boolean;
  onChangeEditable: (editable: boolean) => void;
}

interface InjectedProps {
  yearLeaveService: YearLeaveService;
}

@autobind
@observer
class EditButtonContainer extends ReactComponent<Props, {}, InjectedProps> {
  //
  static defaultProps = {
    editable: false,
  };

  onClickButton() {
    this.props.onChangeEditable(!this.props.editable);
  }

  render() {
    //
    const { editable } = this.props;
    return ( <Button primary className="bordered" onClick={this.onClickButton}>{editable ? '수정 완료' : '연차 수정'}</Button> );
  }
}

export default ServiceInjector.useContext(
  YearLeaveService,
)(EditButtonContainer);
