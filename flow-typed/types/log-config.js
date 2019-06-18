declare type LogHandlerType = (messages: any[], context: Object) => void;
declare type UILogConfigObject = {
  level:string,
  handler:LogHandlerType
};
