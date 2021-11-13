type notifyFunction = (message: string, options?: Object) => void;

export interface Notifier {
  danger: notifyFunction;
  warning: notifyFunction;
  info: notifyFunction;
  success: notifyFunction;
}
