import { Language as LanguageEnum } from "../constants/enums";
import { UUIDBaseModel } from "./base_model";
import { Organization } from "./organization";
import { BaseState } from "./request";
import { Pagination } from "./pagination";

export interface MembersState extends BaseState {
  members: Member[];
  pagination: Pagination;
}

export interface Language {
  language: LanguageEnum.english | LanguageEnum.chinese;
}

export interface Member extends UUIDBaseModel, Language {
  email_address: string;
  first_name: string;
  last_name: string;
  organization?: Organization;
  organization_id?: string;
  role: string;
}
