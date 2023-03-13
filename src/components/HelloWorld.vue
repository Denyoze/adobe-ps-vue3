<template>
  <div id="plugin">
    <sp-button @click="inc">Hello, Vue!</sp-button>
    <sp-progressbar :max="myValueMax" :value="myValue"></sp-progressbar>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      myValue: 0,
      myValueMax: 10,
    };
  },
  methods: {
    inc() {
      this.myValue++;
      if (this.myValue > this.myValueMax) {
        this.myValue = 0;
      }
    },
  },
};
</script>

<style lang="css" scoped>
div#plugin > * {
  margin: 10px 0px;
  width: 100%;
}
</style>