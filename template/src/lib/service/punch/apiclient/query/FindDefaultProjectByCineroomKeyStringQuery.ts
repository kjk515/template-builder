
import { fromDomain, CqrsUserQuery } from '@nara.platform/accent';
import { ProjectModel } from '~/lib/model';


@fromDomain
class FindDefaultProjectByCineroomKeyStringQuery extends CqrsUserQuery<ProjectModel> {
  //
  constructor() {
    super(ProjectModel);
  }

  static fromDomain(domain: FindDefaultProjectByCineroomKeyStringQuery) {
    //
    const query = new FindDefaultProjectByCineroomKeyStringQuery();

    query.setResponse(domain);
    return query;
  }
}

export default FindDefaultProjectByCineroomKeyStringQuery;
