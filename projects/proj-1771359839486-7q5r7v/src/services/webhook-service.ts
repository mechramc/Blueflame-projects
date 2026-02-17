import { Result } from '../utils/result';

interface WebhookPayload {
  event: string;
  data: Record<string, unknown>;
}

export class WebhookService {
  private static instance: WebhookService;

  private constructor() {}

  public static getInstance(): WebhookService {
    if (!WebhookService.instance) {
      WebhookService.instance = new WebhookService();
    }
    return WebhookService.instance;
  }

  public async processWebhook(payload: WebhookPayload): Promise<Result<void, Error>> {
    try {
      // Process the webhook payload
      console.log('Processing webhook:', payload);
      // Add your business logic here

      return Result.ok();
    } catch (error) {
      return Result.err(error as Error);
    }
  }
}