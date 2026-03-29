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

export async function saveTraceToCloud(record: TraceRecord): Promise<void> {
  try {
    await addDoc(collection(db, COLLECTION), {
      ...record,
      createdAt: Date.now(),
    });
  } catch (err) {
    console.warn("Failed to save trace to Firestore:", err);
  }
}

export async function loadTracesFromCloud(): Promise<TraceRecord[]> {
  try {
    const q = query(collection(db, COLLECTION), orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
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
    await deleteDoc(doc(db, COLLECTION, id));
  } catch (err) {
    console.warn("Failed to delete trace from Firestore:", err);
  }
}
