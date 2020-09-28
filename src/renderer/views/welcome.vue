<template>
  <div>
    <div class="container justify-content-center">
      <h1 style="text-align: center">Automatic Itam creator</h1>
      <div class="row justify-content-center align-content-center">
        <div class="col-4">Step 1</div>
        <div class="col-8">Sign in using Domain Account</div>
        <div class="col-4">Step 2</div>
        <div class="col-8">
          Select the Computer Connection Request Assigned to you
        </div>
        <div class="col-4">Step 3</div>
        <div class="col-8">Verify Ticket and Computer Information</div>
      </div>
      <router-link
        class="btn btn-large btn-block btn-primary"
        :class="{ active: true }"
        exact
        :to="{ name: 'ritm-capturer' }"
        >Get Started</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'welcome'
}
</script>

<style lang="scss" scoped>
</style>