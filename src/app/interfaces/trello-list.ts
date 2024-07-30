import { ITask } from "./task";

export interface ITrelloList {
  assignedForMe: ITask[];
  assignedFromMe: ITask[];
}
