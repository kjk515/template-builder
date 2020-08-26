
import DataHandlingContainer from './logic/DataHandlingContainer';


type DataHandlingComponent = typeof DataHandlingContainer;

const DataHandling = DataHandlingContainer as DataHandlingComponent;

export default DataHandling;
