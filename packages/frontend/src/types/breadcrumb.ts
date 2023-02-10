interface Company {
  id: number;
  name: string;
  name_cn: string;
}

interface Category {
  id: number;
  category_type: string;
}

interface Factor {
  id: number;
  label: string;
}

export interface BreadCrumb {
  company: Company;
  category?: Category;
  factor?: Factor;
}
