type StorageEngineTypes = "localStorage" | "sessionStorage";

export const getStorage = (
  storageEngineType: StorageEngineTypes = "localStorage"
) => {
  if (storageEngineType in window) {
    return window[storageEngineType];
  }

  throw new Error("Unsupported storage engine type");
};

export const getItem = (storage: Storage, storageKey: string) => {
  const serializedItem = storage.getItem(storageKey);
  return serializedItem && JSON.parse(serializedItem);
};

export const setItem = (
  storage: Storage,
  storageKey: string,
  value: unknown
) => {
  const serializedItem = JSON.stringify(value);
  storage.setItem(storageKey, serializedItem);
};
