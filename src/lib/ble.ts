/**
 * Web Bluetooth API service for Haptic Atlas belt.
 * Falls back to simulation mode (Web Vibration API) when BLE is unavailable.
 */

// BLE characteristic UUIDs — update to match your hardware
const SERVICE_UUID = "12345678-1234-1234-1234-123456789abc";
const CHAR_UUID = "12345678-1234-1234-1234-123456789def";

// Haptic command bytes
export const HapticCmd = {
  LEFT: new Uint8Array([0x01]),
  RIGHT: new Uint8Array([0x02]),
  ARRIVED: new Uint8Array([0x03]),
  STOP: new Uint8Array([0x00]),
} as const;

export type HapticCmdKey = keyof typeof HapticCmd;

class BLEService {
  private device: BluetoothDevice | null = null;
  private characteristic: BluetoothRemoteGATTCharacteristic | null = null;
  private _connected = false;
  private _simMode = false;

  get connected(): boolean {
    return this._connected;
  }

  get simMode(): boolean {
    return this._simMode;
  }

  isBLEAvailable(): boolean {
    return typeof navigator !== "undefined" && "bluetooth" in navigator;
  }

  async connect(): Promise<{ success: boolean; sim: boolean; error?: string }> {
    if (!this.isBLEAvailable()) {
      this._simMode = true;
      this._connected = true;
      return { success: true, sim: true };
    }

    try {
      this.device = await navigator.bluetooth.requestDevice({
        filters: [{ name: "HapticBelt" }, { namePrefix: "Haptic" }],
        optionalServices: [SERVICE_UUID],
      });

      const server = await this.device.gatt!.connect();
      const service = await server.getPrimaryService(SERVICE_UUID);
      this.characteristic = await service.getCharacteristic(CHAR_UUID);

      this.device.addEventListener("gattserverdisconnected", () => {
        this._connected = false;
        this.characteristic = null;
      });

      this._connected = true;
      this._simMode = false;
      return { success: true, sim: false };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      // User cancelled scan — don't fall back, let UI handle
      if (msg.includes("cancelled") || msg.includes("chooser")) {
        return { success: false, sim: false, error: "Scan cancelled" };
      }
      // BLE not found or other error — fall back to sim
      this._simMode = true;
      this._connected = true;
      return { success: true, sim: true, error: msg };
    }
  }

  async send(cmd: Uint8Array): Promise<void> {
    if (this._simMode) {
      this._vibrateSim(cmd);
      return;
    }
    if (!this.characteristic) return;
    try {
      await this.characteristic.writeValueWithoutResponse(cmd as unknown as BufferSource);
    } catch {
      // silent fail
    }
  }

  async sendLeft(): Promise<void> {
    await this.send(HapticCmd.LEFT);
  }

  async sendRight(): Promise<void> {
    await this.send(HapticCmd.RIGHT);
  }

  async sendArrived(): Promise<void> {
    await this.send(HapticCmd.ARRIVED);
  }

  async sendStop(): Promise<void> {
    await this.send(HapticCmd.STOP);
  }

  disconnect(): void {
    if (this.device?.gatt?.connected) {
      this.device.gatt.disconnect();
    }
    this._connected = false;
    this._simMode = false;
    this.device = null;
    this.characteristic = null;
  }

  /** Simulate haptic via Web Vibration API (mobile browsers) */
  private _vibrateSim(cmd: Uint8Array): void {
    if (typeof navigator === "undefined" || !navigator.vibrate) return;
    const byte = cmd[0];
    if (byte === 0x01) navigator.vibrate([100, 50, 100]); // left: double short
    else if (byte === 0x02) navigator.vibrate([200]);       // right: single long
    else if (byte === 0x03) navigator.vibrate([100, 50, 100, 50, 100]); // arrived: triple
  }
}

// Singleton
export const bleService = new BLEService();
