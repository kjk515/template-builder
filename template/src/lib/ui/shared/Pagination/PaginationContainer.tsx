import React from 'react';
import { autobind, ReactComponent } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Icon, Pagination, PaginationProps } from '@nara.platform/react-ui';


interface Props {
  defaultActivePage?: number;
  totalPages: number;
  onChangePage?: (page: number) => void;
}

interface State {
  activePage: number;
}


@autobind
@observer
class PaginationContainer extends ReactComponent<Props, State> {
  //
  static defaultProps = {
    defaultActivePage: 1,
    onChange: () => {},
  };

  state: State = {
    activePage: 1,
  };

  componentDidMount() {
    //
    const { defaultActivePage } = this.props;

    if (defaultActivePage) {
      //
      this.setState({ activePage: defaultActivePage });
    }
  }

  onChangePage(event: React.MouseEvent<HTMLAnchorElement>, data: PaginationProps) {
    //
    const { onChangePage } = this.props;

    const activePage = Number.parseInt(`${data.activePage}`, 10);

    if (onChangePage) {
      onChangePage(activePage);
    }

    this.setState({ activePage });
  }

  onClickFirstItem() {
    //
    this.setState({ activePage: 1 });
  }

  onClickLastItem() {
    //
    const { totalPages } = this.props;

    this.setState({ activePage: totalPages });
  }

  onClickPrevItem() {
    //
    this.setState((prevState) => ({ activePage: prevState.activePage > 1 ? prevState.activePage - 1 : 1 }));
  }

  onClickNextItem() {
    //
    const { totalPages } = this.props;

    this.setState((prevState) => ({ activePage: prevState.activePage < totalPages ? prevState.activePage + 1 : totalPages }));
  }

  render() {
    //
    const { totalPages } = this.props;
    const { activePage } = this.state;

    return (
      <div className="paging-content">
        <Pagination
          size="mini"
          activePage={activePage}
          siblingRange={4} // TODO 홀수만 가능
          totalPages={totalPages}
          boundaryRange={0}
          onPageChange={this.onChangePage}
          ellipsisItem={null}
          firstItem={{ content: <Icon name="angle double left" />, icon: true, onClick: this.onClickFirstItem }}
          lastItem={{ content: <Icon name="angle double right" />, icon: true, onClick: this.onClickLastItem }}
          prevItem={{ content: <Icon name="angle left" />, icon: true, onClick: this.onClickPrevItem }}
          nextItem={{ content: <Icon name="angle right" />, icon: true, onClick: this.onClickNextItem }}
        />
      </div>
    );
  }
}
export default PaginationContainer;

