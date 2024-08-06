export interface CardData {
  id: string;
  groupId: string;
  createdBy: string;
  eventName: string;
  eventType: string;
  date?: string;
  location?: string;
  color: string;
  likes: string[]; // Array of user IDs who liked
  dislikes: string[]; // Array of user IDs who disliked
}
