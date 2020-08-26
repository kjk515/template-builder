
import LeaveCheckerContainer from './logic/LeaveCheckerContainer';
import Content from './sub/LeaveCheckerContent';
import ActionButtons from './sub/LeaveCheckerActionButtons';


type LeaveCheckerComponent = typeof LeaveCheckerContainer & {
  Content: typeof Content;
  ActionButtons: typeof ActionButtons;
};

const LeaveChecker = LeaveCheckerContainer as LeaveCheckerComponent;

LeaveChecker.Content = Content;
LeaveChecker.ActionButtons = ActionButtons;

export default LeaveChecker;
