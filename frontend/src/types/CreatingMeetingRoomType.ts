import { ConferenceCategoryType } from "./ConferenceCategoryType";

export interface CreatingMeetingRoomType {
  conferenceCategory: ConferenceCategoryType;
  description: string;
  title: string;
  tag?: string;
  isPublic: boolean;
  conferencePassword?: string;
}
