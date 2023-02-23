/**
 * A simple cancellation token that can be used to cancel async operations.
 */
export default class CancelationToken {
  cancelled = false;
  onCancel?: () => void;

  cancel() {
    this.cancelled = true;
    this.onCancel?.();
  }
}
