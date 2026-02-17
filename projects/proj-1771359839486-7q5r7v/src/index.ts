import { WebhookService } from './services/webhook-service';
import { BatchUpdateService } from './services/batch-update-service';

const webhookService = WebhookService.getInstance();
const batchUpdateService = BatchUpdateService.getInstance();

// Example usage
(async () => {
  const webhookPayload = { event: 'update', data: { id: 1, name: 'Project A' } };
  const webhookResult = await webhookService.processWebhook(webhookPayload);

  if (webhookResult.isErr()) {
    console.error('Webhook processing failed:', webhookResult.unwrapErr());
  } else {
    console.log('Webhook processed successfully');
  }

  const batchResult = await batchUpdateService.reconcileData();

  if (batchResult.isErr()) {
    console.error('Batch update failed:', batchResult.unwrapErr());
  } else {
    console.log('Batch update completed successfully');
  }
})();