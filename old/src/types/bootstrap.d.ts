declare module 'bootstrap' {
  export class Modal {
    constructor(element: HTMLElement, options?: any);
    show(): void;
    hide(): void;
    dispose(): void;
    handleUpdate(): void;
    static getInstance(element: HTMLElement): Modal | null;
    static getOrCreateInstance(element: HTMLElement, config?: any): Modal;
  }
}
