import Action from "./action";
interface ActionResponse {
  isSuccess: boolean;
  action: Action | undefined;
  message: string;
}

export default ActionResponse;
