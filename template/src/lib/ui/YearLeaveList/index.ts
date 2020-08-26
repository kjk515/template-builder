
import YearLeaveListContainer from './logic/YearLeaveListContainer';
import Header from './sub/YearLeaveListHeader';
import Content from './sub/YearLeaveListContent';
import Footer from './sub/YearLeaveListFooter';
import EditButton from './sub/YearLeaveListEditButton';
import * as YearLeaveRequestListTypes from './type';


type YearLeaveListContainerComponent = typeof YearLeaveListContainer & {
  Header: typeof Header;
  Content: typeof Content;
  Footer: typeof Footer;
  EditButton: typeof EditButton;
};

const YearLeaveList = YearLeaveListContainer as YearLeaveListContainerComponent;

YearLeaveList.Header = Header;
YearLeaveList.Content = Content;
YearLeaveList.Footer = Footer;
YearLeaveList.EditButton = EditButton;

export default YearLeaveList;
export { YearLeaveRequestListTypes };
