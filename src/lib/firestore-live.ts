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

function withTimeout<T>(promise: Promise<T>, ms = 6000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Firestore timeout")), ms)
    ),
  ]);
}

export async function updateLiveLocation(
  liveId: string,
  data: LiveLocation
): Promise<boolean> {
  try {
    await withTimeout(setDoc(doc(db, COLLECTION, liveId), data));
    return true;
  } catch (err) {
    console.error("Failed to update live location:", err);
    return false;
  }
}

export async function getLiveLocation(
  liveId: string
): Promise<LiveLocation | null> {
  try {
    const snap = await withTimeout(getDoc(doc(db, COLLECTION, liveId)));
    if (!snap.exists()) return null;
    return snap.data() as LiveLocation;
  } catch (err) {
    console.error("Failed to get live location:", err);
    throw err;
  }
}

export function subscribeLiveLocation(
  liveId: string,
  callback: (data: LiveLocation | null) => void,
  onError?: (err: Error) => void
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
      console.error("Live location subscription error:", err);
      if (onError) onError(err as Error);
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
