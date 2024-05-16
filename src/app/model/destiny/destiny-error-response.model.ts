export class DestinyErrorResponseModel {
  ErrorCode!: number;
  ErrorStatus!: string;
  Message!: string;
  MessageData?: any;
  Response!: number;
  ThrottleSeconds!: number;
}
