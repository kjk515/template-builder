
import { autobind } from '@nara.platform/accent';
import { extendObservable } from 'mobx';
import RuleScope from './RuleScope';
import RuleType from './RuleType';
import TimeWindowModel from './TimeWindowModel';


@autobind
class PunchRuleModel {
  //
  scope: RuleScope = RuleScope.Organization;
  type: RuleType = RuleType.FixedTimeWindow;
  timeWindow: TimeWindowModel = new TimeWindowModel();


  constructor(punchRule?: PunchRuleModel) {
    //
    extendObservable(this, {
      scope: punchRule ? punchRule.scope : RuleScope.Organization,
      type: punchRule ? punchRule.type : RuleType.FixedTimeWindow,
      timeWindow: punchRule ? punchRule.timeWindow : TimeWindowModel.newNineToSix(),
    });
  }
}

export default PunchRuleModel;
