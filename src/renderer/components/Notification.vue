<template>
  <div>
    <div class="container">{{` ${notOnDb.map((i) => i)} NOT FOUND.`}}</div>
  </div>
</template>

<script>
export default {
  name: "Notification",
  props: ["notOnDb"],
};
</script>

<style lang="scss" scoped></style>
