
import { store as punchStore } from './punch';
import { store as leaveStore } from './leave';
import { store as sharedStore } from './shared';


export default {
  timecard: {
    ...punchStore,
    ...leaveStore,
    ...sharedStore,
  },
};
