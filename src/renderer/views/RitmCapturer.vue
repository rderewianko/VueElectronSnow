<template>
  <div class="container h-100 justify-content-center align-items-center">
    <h2 style="text-align:center;">Select A Computer Connection Request</h2>
    <div class="row">
      <div class="col-8">
        <input type="text" placeholder="Enter REQ or RITM" class="form-control" />
      </div>
      <div class="col-4">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </div>
    </div>
    <div class="row h-100">
      <Ritm v-for="ritm in getRitms" :key="ritm"></Ritm>
    </div>
  </div>
</template>

<script>
import Ritm from '@/components/Ritm'
export default {
  name: 'RitmCaputurer',
  components: {
    Ritm
  },
  computed: {
    getRitms () {
      return 5
    }
  }
}
</script>

<style lang="scss" scoped></style>
