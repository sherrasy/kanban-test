declare module '*.css';
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare module '*.svg' {
  const src: string;
  export default src;
}
declare module '@/data/tasks.json' {
  const url: string;
  export default url;
}
