export default class CancelationToken {
  cancelled = false;
  onCancel: () => void;

  cancel() {
    this.cancelled = true;
    this.onCancel?.();
  }
}
