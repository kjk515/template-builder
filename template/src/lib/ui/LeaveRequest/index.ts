
import LeaveRequestContainer from './logic/LeaveRequestContainer';
import Content from './sub/LeaveRequestContent';
import ActionButtons from './sub/LeaveRequestActionButton';


type LeaveRequestComponent = typeof LeaveRequestContainer & {
  Content: typeof Content;
  ActionButtons: typeof ActionButtons;
};

const LeaveRequest = LeaveRequestContainer as LeaveRequestComponent;

LeaveRequest.Content = Content;
LeaveRequest.ActionButtons = ActionButtons;

export default LeaveRequest;
