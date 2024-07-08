export class Notification {
  id: string;
  message: string;
  userId: string;
  isRead: boolean;

  constructor(id: string, message: string, userId: string, isRead: boolean) {
    this.id = id;
    this.message = message;
    this.userId = userId;
    this.isRead = isRead;
  }
}
