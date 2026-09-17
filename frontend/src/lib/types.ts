// Hand-written mirror of the Guestbook Pydantic models in backend/models/guestbook.py —
// nothing infers across the HTTP boundary, so keep this pair in sync in the same edit.
export interface GuestbookNote {
  id: string;
  name: string;
  message: string;
  stamp_emoji: string;
  created_at: string; // ISO timestamp serialised by the backend
}

export interface GuestbookNoteCreate {
  name: string;
  message: string;
  stamp_emoji?: string;
}
