export type TIssueStatus = "open" | "in_progress" | "resolved";
export type TIssueType = "bug" | "feature_request";
export interface IIssue {
  id: number;
  title: string;
  description: string;
  type: TIssueType;
  status: TIssueStatus;
  reporter_id: number;
}
export type CreateIssuePayload = Omit<
  IIssue,
  "id" | "status" | "reporter_id"
> & {
  status?: TIssueStatus;
};
export enum EIssueSort {
  newest = "newest",
  oldest = "oldest",
}
