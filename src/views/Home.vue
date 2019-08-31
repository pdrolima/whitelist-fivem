<template>
  <div class="home">
    <div class="text-center mt-5 mb-5">
      <img src="../assets/logo.png" width="350" alt="">
    </div>
    <WhitelistForm v-if="discordAuthorized"/>
    <Discord v-else/>
  </div>
</template>

<script>
import WhitelistForm from "@/views/Form.vue"; 
import Discord from "@/views/Discord.vue"; 
import { Route } from "vue-router";

export default {

    name: 'home',

    data: () => ({
      discordAuthorized: false
    }),

    components: {
      WhitelistForm,
      Discord
    },

    created () {
      if (this.$route.query.token) {
        const token = this.$route.query.token;
        localStorage.setItem("discordToken", token);
        this.$router.push({ name: "home" });
      }
      this.discordToken();
    },

    methods: {
      discordToken() {
    if (localStorage.getItem("discordToken")) {
      this.discordAuthorized = true;
    } else {
      this.discordAuthorized = false;
    }
  }
    }
}
</script>