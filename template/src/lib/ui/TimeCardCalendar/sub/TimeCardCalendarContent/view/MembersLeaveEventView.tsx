
import React from 'react';
import { ReactComponent } from '@nara.platform/accent';
import { CalendarTypes } from '@nara.platform/react-ui';
import { observer } from 'mobx-react';

import { List, Popup } from 'semantic-ui-react';
import classNames from 'classnames';

import { LeaveCategoryDisplayType } from '~/lib/model';
import { MembersLeaveEventModel } from '../model';


interface Props extends CalendarTypes.EventProps<MembersLeaveEventModel> {
  event: MembersLeaveEventModel;
}

@observer
class MembersLeaveEventView extends ReactComponent<Props> {
  //
  renderEvent() {
    //
    const { event } = this.props;

    return (
      <div className="member-name">
        <span className="bold">{event.representative}</span>

        { event.leaveCount > 1 && (
          <>
            외 <span className="bold">{event.leaveCount - 1}</span>명
          </>
        )}
      </div>
    );
  }

  render() {
    //
    const { event } = this.props;
    const leaveTooltip = true;

    if (event.leaveCount < 1) {
      return (
        <div className="center no-vacationer">
          <div>
            <p className="no-member">오늘의 휴가자 없음</p>
          </div>
        </div>
      );
    }

    return (
      <div className={classNames({
        center: true,
        'vacationer-list': event.isContainedMyLeave,
      })}
      >
        <div>
          { leaveTooltip ?
            <Popup
              trigger={this.renderEvent()}
              position="bottom center"
              inverted
              content={
                <div className="member-popup">
                  <List>
                    { event.manLeaves.map((manLeave, index) => (
                      <List.Item key={index}>
                        {manLeave.memberName} : {LeaveCategoryDisplayType[manLeave.category]}
                      </List.Item>
                    ))}
                  </List>
                </div>
              }
            />
            :
            this.renderEvent()
          }
        </div>
      </div>
    );
  }
}

export default MembersLeaveEventView;
