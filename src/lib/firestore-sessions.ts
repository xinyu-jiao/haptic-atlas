import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "./firebase";
import type { SessionResult } from "./types";

const COLLECTION = "sessions";

export async function saveSessionToCloud(result: SessionResult): Promise<void> {
  try {
    await addDoc(collection(db, COLLECTION), {
      ...result,
      createdAt: Date.now(),
    });
  } catch (err) {
    console.warn("Failed to save session to Firestore:", err);
  }
}

export async function loadSessionsFromCloud(): Promise<SessionResult[]> {
  try {
    const q = query(collection(db, COLLECTION), orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        date: data.date,
        timestamp: data.timestamp,
        level: data.level,
        levelName: data.levelName,
        role: data.role,
        environment: data.environment,
        duration: data.duration,
        corrections: data.corrections,
        helpCount: data.helpCount,
        consistency: data.consistency,
        responseTime: data.responseTime,
        badges: data.badges ?? [],
      } as SessionResult;
    });
  } catch (err) {
    console.warn("Failed to load sessions from Firestore:", err);
    return [];
  }
}
