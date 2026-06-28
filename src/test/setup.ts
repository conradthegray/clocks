import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

// Node's experimental `localStorage` global shadows jsdom's, so provide a
// simple in-memory implementation that useTheme can read and write.
class LocalStorageMock implements Storage {
  #store = new Map<string, string>();
  get length() {
    return this.#store.size;
  }
  clear() {
    this.#store.clear();
  }
  getItem(key: string) {
    return this.#store.get(key) ?? null;
  }
  key(index: number) {
    return [...this.#store.keys()][index] ?? null;
  }
  removeItem(key: string) {
    this.#store.delete(key);
  }
  setItem(key: string, value: string) {
    this.#store.set(key, String(value));
  }
}

const localStorageMock = new LocalStorageMock();
Object.defineProperty(globalThis, "localStorage", { value: localStorageMock });
Object.defineProperty(window, "localStorage", { value: localStorageMock });

// jsdom doesn't implement matchMedia, which useTheme relies on.
if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}
