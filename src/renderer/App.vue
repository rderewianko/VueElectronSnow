<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" :class="active= true">
          <router-link :to="{name:'ritm-capturer'}">Select Ritm</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link :to="{name:'form-page'}">Fill Form</router-link>
        </li>
      </ol>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "my-project",
};
</script>

<style>
html,
body {
  height: 100%;
}
</style>
