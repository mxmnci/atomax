import { webhookSecret } from "../config";

const isWebhookSecretValid = (secret: string) => {
  if (secret && secret === webhookSecret) {
    return true;
  }
  return false;
};

export default isWebhookSecretValid;
