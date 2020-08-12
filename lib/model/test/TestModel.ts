
class TestModel {
  //
  year: number;
  memberId: string;
  memberName: string = '';
  companyCareerYear: number = 0;

  constructor(year: number, memberId: string) {
    //
    this.year = year;
    this.memberId = memberId;
  }

  static fromDomain(domain: TestModel): TestModel {
    //
    const yearLeave = new TestModel(domain.year, domain.memberId);

    yearLeave.memberName = domain.memberName;
    yearLeave.companyCareerYear = domain.companyCareerYear;

    return yearLeave;
  }
}

export default TestModel;
