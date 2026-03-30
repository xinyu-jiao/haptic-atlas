import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "./firebase";
import type { TraceRecord } from "./types";

const COLLECTION = "traces";
const TIMEOUT_MS = 6000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Firestore timeout")), ms)
    ),
  ]);
}

export async function saveTraceToCloud(record: TraceRecord): Promise<void> {
  try {
    await withTimeout(
      addDoc(collection(db, COLLECTION), { ...record, createdAt: Date.now() }),
      TIMEOUT_MS
    );
  } catch (err) {
    console.warn("Failed to save trace to Firestore:", err);
  }
}

export async function loadTracesFromCloud(): Promise<TraceRecord[]> {
  try {
    const q = query(collection(db, COLLECTION), orderBy("timestamp", "desc"));
    const snapshot = await withTimeout(getDocs(q), TIMEOUT_MS);
    return snapshot.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        timestamp: data.timestamp,
        date: data.date,
        duration: data.duration,
        distance: data.distance,
        points: data.points,
        positions: data.positions,
      } as TraceRecord;
    });
  } catch (err) {
    console.warn("Failed to load traces from Firestore:", err);
    return [];
  }
}

export async function deleteTraceFromCloud(id: string): Promise<void> {
  try {
    await withTimeout(
      deleteDoc(doc(db, COLLECTION, id)),
      TIMEOUT_MS
    );
  } catch (err) {
    console.warn("Failed to delete trace from Firestore:", err);
  }
}
