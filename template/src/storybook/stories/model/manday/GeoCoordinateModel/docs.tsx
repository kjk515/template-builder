
import React from 'react';
import { DocsPage } from '@nara.platform/storybook';

import { GeoCoordinateModel } from '@nara.drama/timecard';


// const docsProps = docsUtils.getModelDoc(GeoCoordinateModel);

export default {
  title: 'model/GeoCoordinateModel',
  component: GeoCoordinateModel,
  parameters: {
    docs: {
      page: () => (
        <DocsPage
          description=""
          // props={docsProps}
        />
      ),
    },
  },
};
