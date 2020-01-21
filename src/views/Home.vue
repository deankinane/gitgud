<template>
  <div class="home">
    <TerminalView></TerminalView>
  </div>
</template>

<script>
// @ is an alias to /src
import TerminalView from "@/components/terminal/TerminalView.vue";

export default {
  name: "home",
  components: {
    TerminalView
  }
};
</script>
