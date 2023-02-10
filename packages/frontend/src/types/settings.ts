import { FrameworkStatusType } from "../constants/enums";
import { Questionnaire } from "./questionnaire";
import { BaseState } from "./request";
import type { IndicatorKey } from "./indicator_key";

export enum ActionType {
  none = 0,
  getData = 1,
  activateTemporaryData = 2,
  cancelTemporaryData = 3,
  uploadFrameworkFile = 4,
  checkProcessStatus = 5,
}

export interface Factor {
  id: number;
  label: string;
  label_cn: string;
  description: string;
  questionnaires: Questionnaire[];
  indicator_keys: IndicatorKey[];
  status: FrameworkStatusType;
}

export interface Category {
  category_label: "environmental" | "social" | "governance";
  category_type: number;
  id: number;
  factors?: Factor[];
}

export interface CategoriesState extends BaseState {
  categories: Category[];
  actionType: ActionType;
  error?: string;
  isRequesting: boolean;
  isProcessing: boolean;
  isConflicted: boolean;
  isUploadFrameworkStatus: boolean;
  data: any;
  errorType: ErrorType;
  isTooltipStatus: boolean;
}

export interface FactorState {
  factor: Factor;
}

export interface TemplateFileState {
  fileData: Blob;
  fileName: string;
}

export enum ErrorType {
  FrameworkImportFactorLengthErrorMessage = 0,
  Other = 1,
}

export interface CustomFramework {
  name: string;
  description: string;
}
