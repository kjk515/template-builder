
import LeaveRequestListContainer from './logic/LeaveRequestListContainer';
import Header from './sub/LeaveRequestListHeader';
import Content from './sub/LeaveRequestListContent';
import Footer from './sub/LeaveRequestListFooter';
import * as LeaveRequestListTypes from './type';


type LeaveRequestListContainerComponent = typeof LeaveRequestListContainer & {
  Header: typeof Header;
  Content: typeof Content;
  Footer: typeof Footer;
};

const LeaveRequestList = LeaveRequestListContainer as LeaveRequestListContainerComponent;

LeaveRequestList.Header = Header;
LeaveRequestList.Content = Content;
LeaveRequestList.Footer = Footer;

export default LeaveRequestList;
export { LeaveRequestListTypes };
