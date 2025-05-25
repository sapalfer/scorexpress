/// <reference types="react" />

declare module 'react/jsx-runtime' {
  export type { JSX } from 'react';

  export const jsx: <P extends object>(type: React.ElementType<P>, props: P, key?: React.Key) => React.ReactElement<P, React.ElementType<P>>;

  export const jsxs: <P extends object>(type: React.ElementType<P>, props: P, key?: React.Key) => React.ReactElement<P, React.ElementType<P>>;

  export const Fragment: typeof React.Fragment;
}
