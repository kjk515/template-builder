
import React from 'react';
import { ReactComponent, autobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Header } from '@nara.platform/react-ui';


interface Props {
  text: string;
  className?: string;
}

@autobind
@observer
class HeaderView extends ReactComponent<Props> {
  //
  static defaultProps = {
    className: '',
  };


  render() {
    //
    const { className, text } = this.props;

    return (
      <Header size="small" className={className}>
        {text}
      </Header>
    );
  }
}

export default HeaderView;

