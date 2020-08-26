
import PanelSubFieldsContainer from './logic/PanelSubFieldsContainer';
import PanelSubFieldsLabelGroup from './PanelSubFieldsLabelGroup';
import PanelSubFieldsLabel from './PanelSubFieldsLabel';
import PanelSubFieldsCountLabel from './PanelSubFieldsCountLabel';
import PanelSubFieldsManDayLabels from './PanelSubFieldsManDayLabels';


type PanelSubFieldsComponent = typeof PanelSubFieldsContainer & {
  LabelGroup: typeof PanelSubFieldsLabelGroup;
  Label: typeof PanelSubFieldsLabel;
  CountLabel: typeof PanelSubFieldsCountLabel;
  ManDayLabels: typeof PanelSubFieldsManDayLabels;
};

const PanelSubFields = PanelSubFieldsContainer as PanelSubFieldsComponent;

PanelSubFields.LabelGroup = PanelSubFieldsLabelGroup;
PanelSubFields.Label = PanelSubFieldsLabel;
PanelSubFields.CountLabel = PanelSubFieldsCountLabel;
PanelSubFields.ManDayLabels = PanelSubFieldsManDayLabels;

export default PanelSubFields;
