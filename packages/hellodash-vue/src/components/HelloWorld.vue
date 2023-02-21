<script lang="tsx">
import { ref, defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {
      count: ref(0),
    };
  },
  render() {
    return (
      <>
        <h1 class="header">{this.msg}</h1>
        <dash-button onClick={() => this.count++}>{this.count}</dash-button>
      </>
    );
  },
});
</script>

<style scoped>
.header {
  color: red;
}
</style>
