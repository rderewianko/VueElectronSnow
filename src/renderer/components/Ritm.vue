<template>
  <div class="col-4 p-2">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ ritm.number }}</h5>
        <p class="card-text">Opened at: {{ ritm.opened_at }}</p>
        <router-link class="btn btn-primary" to="itam">Create CI</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Ritm",
  props: {
    ritm: {
      number: Number,
      opened_at: String,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>