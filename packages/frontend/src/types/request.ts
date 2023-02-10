import { BaseError } from "./error";

export enum RequestStates {
  Initial = 0,
  Requested = 1,
  Failed = 2,
  Succeeded = 3,
  Conflict = 4,
}

export interface RequestStatus {
  isInitialized: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export interface BaseState extends BaseError {
  requestState?: RequestStates;
  statusCode?: number;
  status?: RequestStatus;
}
