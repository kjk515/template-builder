
import { autobind, mobxService, OffsetModel, SortDirectionType } from '@nara.platform/accent';
import { action, observable } from 'mobx';


@autobind
@mobxService
class PaginationService {
  //
  static readonly instanceName = 'paginationService';
  static readonly serviceName = 'timecard.shared.leaveService';
  static instance: PaginationService;

  @observable
  currentPage: number = 1;

  @observable
  offset: number = 0;

  @observable
  limit: number = 0;

  @observable
  totalCount: number = 0;

  @observable
  startIndex: number = 0;

  // FIXME onChangePage 함수를 받아서 관리하면 좋겠다.
  // @observable
  // onChangePage: (page: number) => void;

  @action
  initOffsetAndLimit(offset: number, limit: number) {
    //
    this.offset = offset;
    this.limit = limit;
  }

  @action
  setCurrentPage(page: number) {
    //
    this.currentPage = page;
  }

  @action
  setOffset(offset: number) {
    //
    this.offset = offset;
  }

  @action
  setLimit(limit: number) {
    //
    this.limit = limit;
  }

  @action
  setTotalCount(totalCount: number) {
    //
    this.totalCount = totalCount;
  }

  @action
  updateOffsetByPage(page: number) {
    //
    this.offset = (page - 1) * this.limit;
  }

  @action
  updateStartIndex() {
    //
    this.startIndex = this.offset;
  }

  getOffsetModel(sort?: SortDirectionType) {
    //
    return new OffsetModel(this.offset, this.limit, sort);
  }

  getTotalPages(totalCount: number) {
    //
    if (this.limit === 0) {
      return 0;
    }

    return Math.ceil(totalCount / this.limit);
  }
}

PaginationService.instance = new PaginationService();
export default PaginationService;
