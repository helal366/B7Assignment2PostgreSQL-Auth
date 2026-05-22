export type IssueStatus= "open" | "in_progress" | "resolved" ;
export type IssueType= "bug" | "feature_request";
export interface IIssue{
    id:number,
    title:string,
    description:string,
    type:IssueType,
    status:IssueStatus,
    reporter_id:number
}
export type CreateIssuePayload=Omit<IIssue, "id" | "status" | "reporter_id"> & {
    status?: IssueStatus;
}
export enum ESort{
    newest="newest",
    oldest="oldest"
}