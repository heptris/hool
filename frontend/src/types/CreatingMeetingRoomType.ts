export interface CreatingMeetingRoomType {
  conferenceCategory:
    | "SOCCER"
    | "BASEBALL"
    | "BASKETBALL"
    | "VOLLEYBALL"
    | "ESPORTS";
  description: string;
  title: string;
  tag?: string;
  isPublic: boolean;
  conferencePassword?: string;
}
