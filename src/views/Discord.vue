<template>
  <div class="text-center mt-5">
    <h2 class="text-white">Log In with Discord to proceed.</h2>
    <b-button
      class="mt-5"
      variant="discord"
      size="lg"
      @click="loginWithDiscord"
    >
      <img class="discord-logo" src="../assets/Discord-Logo-White.svg" alt>
      Log in with Discord
    </b-button>
  </div>
</template>

<script>

export default {
  name: 'discord',

  methods: {
    loginWithDiscord() {
      return window.location.href = process.env.VUE_APP_OAUTH2_URL
    }
  }
}

</script>

<style>
.discord-logo {
  width: 32px;
}
</style>
