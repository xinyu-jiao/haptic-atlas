import {
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "./firebase";

const COLLECTION = "live-sessions";

export interface LiveLocation {
  lat: number;
  lng: number;
  timestamp: number;
  elapsed: number;
  status: "active" | "ended";
  userName: string;
  startedAt: number;
}

export function generateLiveId(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 6; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

export async function updateLiveLocation(
  liveId: string,
  data: LiveLocation
): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTION, liveId), data);
  } catch (err) {
    console.warn("Failed to update live location:", err);
  }
}

export async function getLiveLocation(
  liveId: string
): Promise<LiveLocation | null> {
  try {
    const snap = await getDoc(doc(db, COLLECTION, liveId));
    if (!snap.exists()) return null;
    return snap.data() as LiveLocation;
  } catch (err) {
    console.warn("Failed to get live location:", err);
    return null;
  }
}

export function subscribeLiveLocation(
  liveId: string,
  callback: (data: LiveLocation | null) => void
): Unsubscribe {
  return onSnapshot(
    doc(db, COLLECTION, liveId),
    (snap) => {
      if (snap.exists()) {
        callback(snap.data() as LiveLocation);
      } else {
        callback(null);
      }
    },
    (err) => {
      console.warn("Live location subscription error:", err);
      callback(null);
    }
  );
}

export async function endLiveSession(liveId: string): Promise<void> {
  try {
    const snap = await getDoc(doc(db, COLLECTION, liveId));
    if (snap.exists()) {
      const data = snap.data() as LiveLocation;
      await setDoc(doc(db, COLLECTION, liveId), { ...data, status: "ended" });
    }
  } catch (err) {
    console.warn("Failed to end live session:", err);
  }
}
