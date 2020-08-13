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
const Axios = require("axios");
import Ritm from "@/components/Ritm";
export default {
  name: "RitmCaputurer",
  components: {
    Ritm,
  },
  computed: {
    getRitms() {
      // Axios.get(
      //   "https://dev81248.service-now.com/api/now/table/sc_req_item?sysparm_limit=1"
      // );
      return 5;
    },
  },
};
</script>

<style lang="scss" scoped></style>


// https://dev81248.service-now.com/sc_req_item_list.do?sysparm_query=request.requested_for%3Djavascript%3Ags.getUserID()%5Eactive%3Dtrue&sysparm_view=ess