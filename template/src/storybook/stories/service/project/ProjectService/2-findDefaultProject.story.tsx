
import React from 'react';
import { ReactComponent, autobind, injectFromName } from '@nara.platform/accent';
import { observer, Provider } from 'mobx-react';
import { withStory, JsonViewer } from '@nara.platform/storybook';

import { ProjectService } from '~/lib/service';
import docs from './docs';


interface InjectedProps {
  projectService: ProjectService;
}

export const findDefaultProject = withStory(() => {
  //
  @injectFromName(ProjectService.serviceName)
  @autobind
  @observer
  class Story extends ReactComponent<{}, {}, InjectedProps> {
    //
    componentDidMount() {
      //
      const { projectService } = this.injected;

      projectService.findDefaultProject();
    }

    render() {
      //
      const { project } = this.injected.projectService;

      return (
        <JsonViewer
          title="findDefaultProject"
          json={project}
        />
      );
    }
  }

  return () => (
    <Provider
      timecard={{
        project: {
          projectService: ProjectService.instance,
        },
      }}
    >
      <Story />
    </Provider>
  );
});

findDefaultProject.story = {
  name: 'findDefaultProject',
};

export default {
  title: 'service/ProjectService',
  component: docs.component,
  parameters: { ...docs.parameters },
};
