const LOCAL_STORAGE_KEY = "state";

export function importFromStorage(): string {
    return localStorage[LOCAL_STORAGE_KEY];
}

export function exportToStorage(json: string) {
    localStorage[LOCAL_STORAGE_KEY] = json;
}
