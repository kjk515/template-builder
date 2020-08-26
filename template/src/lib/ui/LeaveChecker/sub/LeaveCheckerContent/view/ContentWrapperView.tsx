
import React from 'react';
import { ReactComponent } from '@nara.platform/accent';


interface Props {
  children: React.ReactNode;
}

class ContentWrapperView extends ReactComponent<Props> {
  //
  render() {
    //
    return (
      <div className="simple">
        {this.props.children}
      </div>
    );
  }
}

export default ContentWrapperView;
