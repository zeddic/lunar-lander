// WebPack requires.

declare var require: {
    (path: string): any;
    <T>(path: string): T;
    (paths: string[], callbacks: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
}
