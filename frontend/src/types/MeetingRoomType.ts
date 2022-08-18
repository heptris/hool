export interface MeetingRoomType {
  category: "SOCCER" | "BASEBALL" | "BASKETBALL" | "VOLLEYBALL" | "ESPORTS";
  conferenceId: number;
  isPublic: boolean;
  description: string;
  nickName: string;
  title: string;
  total: number;
}
