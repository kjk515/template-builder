
import React from 'react';
import { ReactComponent, autobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Table } from '@nara.platform/react-ui';


interface Props {
  colSpan: number;
  text?: string;
}

@autobind
@observer
class EmptyTableRowView extends ReactComponent<Props> {
  //
  static defaultProps = {
    text: '조회 가능한 목록이 없습니다',
  };


  render() {
    //
    const { colSpan, text } = this.props;

    return (
      <Table.Row>
        <Table.Cell colSpan={colSpan}>
          <div className="no-list">
            {text}
          </div>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default EmptyTableRowView;
