<template>
  <div>
    <div class="container h-100">
      <div class="row h-100 justify-content-center">
        <div class="col-6">
          <form class>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="Username"
                v-model="username"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                v-model="password"
                required
              />
            </div>
            <button class="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      username: '',
      password: ''
    }
    methods: {
      login: {
      }
    }
  }

}
</script>

<style lang="scss" scoped>
</style>