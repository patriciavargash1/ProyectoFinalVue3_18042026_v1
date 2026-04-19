
class AppMemory {

    constructor() {
        this.state = {};
        this.listeners = {};
    }

    // ==========================
    // SET DATA
    // ==========================
    set(key, value, persist = false) {

        this.state[key] = value;

        if (persist) {
            localStorage.setItem(key, JSON.stringify(value));
        }

        this.notify(key);
    }

    // ==========================
    // GET DATA
    // ==========================
    get(key) {

        // Si no está en memoria, buscar en localStorage
        if (!this.state[key]) {
            const stored = localStorage.getItem(key);
            if (stored) {
                this.state[key] = JSON.parse(stored);
            }
        }

        return this.state[key];
    }

    // ==========================
    // SUBSCRIBE
    // ==========================
    subscribe(key, callback) {

        if (!this.listeners[key]) {
            this.listeners[key] = [];
        }

        this.listeners[key].push(callback);

        // Retornar función para desuscribirse
        return () => {
            this.listeners[key] = this.listeners[key]
                .filter(cb => cb !== callback);
        };
    }

    // ==========================
    // NOTIFY
    // ==========================
    notify(key) {

        if (this.listeners[key]) {
            this.listeners[key].forEach(cb => cb(this.state[key]));
        }
    }

    // ==========================
    // REMOVE
    // ==========================
    remove(key) {
        delete this.state[key];
        localStorage.removeItem(key);
        this.notify(key);
    }

    // ==========================
    // CLEAR ALL
    // ==========================
    clear() {
        this.state = {};
        localStorage.clear();
    }
}

// Exportar instancia única (singleton)
export default new AppMemory();