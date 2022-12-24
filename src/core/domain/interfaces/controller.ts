export interface IController {
  handle(...args: any[]): Promise<any> | any;
}
