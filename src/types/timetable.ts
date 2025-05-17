export interface TimetableSlot {
  id: string;
  time: string;
  subject: string;
  location: string;
  lecturer: string;
  day: string;
}

export interface Note {
  id: string;
  date: Date;
  content: string;
  createdAt: Date;
} 