
import React, { ContextType } from 'react';
import { ReactComponent, autobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Dropdown, DropdownProps, Grid } from 'semantic-ui-react';
import { NameTextModel } from '@nara.platform/react-ui';

import { PanelSubFields } from '~/lib/ui/shared';
import { EventType, EventTextType } from '../../model';
import TimeCardCalendarContext from '../../context/TimeCardCalendarContext';


@autobind
@observer
class CalendarHeaderContainer extends ReactComponent {
  //
  static contextType = TimeCardCalendarContext;

  context!: ContextType<typeof TimeCardCalendarContext>;

  getSelectableEventOptions() {
    //
    const { selectableEventTypes } = this.context.timeCardCalendar;

    return selectableEventTypes.map((eventType, index) =>
      new NameTextModel(index.toString(), EventTextType[eventType], eventType)
    );
  }

  onChangeEventType(e: React.SyntheticEvent, { value }: DropdownProps): void {
    //
    const { timeCardCalendar } = this.context;
    const eventType = EventType[value as EventType];

    timeCardCalendar.changeEventType(eventType);
  }

  render() {
    //
    const { eventType } = this.context.timeCardCalendar;
    const selectableOptions = this.getSelectableEventOptions();

    return (
      <PanelSubFields>
        { selectableOptions.length > 0 && (
          <Grid.Column floated={'right'} width={6} verticalAlign="middle" textAlign="right">
            <Dropdown
              selection
              options={this.getSelectableEventOptions()}
              value={eventType}
              onChange={this.onChangeEventType}
            />
          </Grid.Column>
        )}
      </PanelSubFields>
    );
  }
}

export default CalendarHeaderContainer;
