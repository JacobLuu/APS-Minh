import { AxiosResponse } from "axios";

import baseService from "../baseApi";

import type { CategoriesDropdownList } from "../../types/category";

export const BASE_URL = "/api/v1/categories";

const categoriesDropdownList = (): Promise<
  AxiosResponse<CategoriesDropdownList>
> => {
  return baseService.get(`${BASE_URL}/ranking-dropdown-list`);
};

export default {
  categoriesDropdownList,
};
