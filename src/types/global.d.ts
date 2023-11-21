declare var __CSS_MODULE_PREFIX__: string;
declare var __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: string;

declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
