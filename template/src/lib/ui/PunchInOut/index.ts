
import PunchInOutContainer from './logic/PunchInOutContainer';
import PunchInOutContentHeader from './sub/PunchInOutHeader';
import PunchInOutContent from './sub/PunchInOutContent';
import PunchInOutConfirmButton from './sub/PunchInOutConfirmButton';


type PunchInOutContainerComponent = typeof PunchInOutContainer & {
  Header: typeof PunchInOutContentHeader;
  Content: typeof PunchInOutContent;
  ConfirmButton: typeof PunchInOutConfirmButton;
};

const PunchInOut = PunchInOutContainer as PunchInOutContainerComponent;

PunchInOut.Header = PunchInOutContentHeader;
PunchInOut.Content = PunchInOutContent;
PunchInOut.ConfirmButton = PunchInOutConfirmButton;

export default PunchInOut;
