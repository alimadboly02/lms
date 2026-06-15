declare module 'react' {
    const React: any;
    export default React;
    export = React;
    export type MouseEvent<T = any> = any;
    export type FormEvent<T = any> = any;
    export type ChangeEvent<T = any> = any;
    export type FC<P = {}> = any;
    export type ReactNode = any;
    export type CSSProperties = any;
    export type HTMLAttributes<T> = any;
    export type ButtonHTMLAttributes<T> = any;
    export type InputHTMLAttributes<T> = any;
    
    export function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
    export function useState<T = undefined>(): [T | undefined, (newState: T | ((prevState: T | undefined) => T) | undefined) => void];
    
    export const useEffect: any;
    
    export function useRef<T>(initialValue: T): { current: T };
    export function useRef<T>(initialValue: T | null): { current: T | null };
    export function useRef<T = undefined>(): { current: T | undefined };
    
    export const useMemo: any;
    export const useCallback: any;
    export const useContext: any;
    export const useReducer: any;
    export const createContext: any;
    export const forwardRef: any;
    export const memo: any;
}

declare module 'react-dom' {
    const ReactDOM: any;
    export default ReactDOM;
}

declare module 'react-dom/client' {
    export function createRoot(container: any, options?: any): any;
}

declare module 'react/jsx-runtime' {
    export const jsx: any;
    export const jsxs: any;
    export const Fragment: any;
}

declare namespace JSX {
    interface IntrinsicElements {
        [elemName: string]: any;
    }
}

declare module '*.png' {
    const value: string;
    export default value;
}

declare module '*.jpg' {
    const value: string;
    export default value;
}

declare module '*.jpeg' {
    const value: string;
    export default value;
}

declare module '*.svg' {
    const value: string;
    export default value;
}

declare module '*.gif' {
    const value: string;
    export default value;
}
