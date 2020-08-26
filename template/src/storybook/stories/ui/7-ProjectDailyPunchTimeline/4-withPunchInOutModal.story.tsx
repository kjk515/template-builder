import React from 'react';
import { autobind, injectFromName, NaraService, ReactComponent } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { storyLogger, withStory } from '@nara.platform/storybook';

import { ProjectDailyPunchTimeline, ProjectDailyPunchTimelineTypes, PunchInOut } from '@nara.drama/timecard';
import { Modal } from '@nara.platform/react-ui';
import moment, { Moment } from 'moment';
import docs from './docs';


interface InjectedProps {
  naraService: NaraService;
}

interface State {
  open: boolean;
  date: Moment;
  manDayId: string;
}

export const withPunchInOutModal = withStory(() => {
  //
  @injectFromName(NaraService.serviceName)
  @autobind
  @observer
  class Story extends ReactComponent<{}, State, InjectedProps> {
    //
    state: State = {
      open: true,
      date: moment(),
      manDayId: '',
    };


    onClickPunchInOutTime(params: ProjectDailyPunchTimelineTypes.PunchParams) {
      //
      this.setState({
        open: true,
        manDayId: params.manDayId,
        date: params.date,
      });
      storyLogger(ProjectDailyPunchTimeline, 'onClickPunchInOutTime', {
        params,
      });
    }

    onClose(): void {
      //
      this.setState({ open: false });
    }

    render() {
      //
      const { patronName } = this.injected.naraService;
      const { open, manDayId, date } = this.state;

      const localDate = moment(date).format('YYYY-MM-DD');
      const projectId = 'd685d730-414b-4629-9919-ad3d16a0b154';

      return (
        <>
          <ProjectDailyPunchTimeline
            projectId={projectId}
          >
            <ProjectDailyPunchTimeline.Header />
            <ProjectDailyPunchTimeline.Content onClickPunchInOutTime={this.onClickPunchInOutTime} />
            <ProjectDailyPunchTimeline.Footer />
          </ProjectDailyPunchTimeline>

          <Modal
            size="small"
            className="base"
            open={open}
            onClose={this.onClose}
          >
            <Modal.Header>
              Punch In/Out
              <p>{localDate}</p>
            </Modal.Header>
            <PunchInOut manDayId={manDayId}>
              <Modal.Content>
                <div className="simple">
                  <PunchInOut.Header text={`${patronName} 님`} />
                  <PunchInOut.Content />
                </div>
              </Modal.Content>
              <Modal.Actions>
                <Modal.CloseButton>확인</Modal.CloseButton>
              </Modal.Actions>
            </PunchInOut>
          </Modal>
        </>
      );
    }
  }

  return Story;
});

withPunchInOutModal.story = {
  name: 'withPunchInOutModal',
};

export default {
  title: 'component/ProjectDailyPunchTimeline',
  component: docs.component,
  subcomponents: docs.subcomponents,
  parameters: { ...docs.parameters },
};
