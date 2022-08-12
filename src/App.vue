<template>
  <v-app>
    <v-main>
      <Header/>
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',

  components: {
    Header,
  },

  data: () => ({
    //
  }),
}
</script>
