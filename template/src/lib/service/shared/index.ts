
import PaginationService from './PaginationService';


export const store = {
  shared: {
    paginationService: PaginationService.instance,
  },
};

export {
  PaginationService,
};
