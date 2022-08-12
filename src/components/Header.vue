<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-card>
          <v-tabs
            background-color="deep-purple accent-4"
            center-active
            dark
          >
            <v-tab to="/">Главная</v-tab>
            <v-tab to="/cs-books">Книги по CS</v-tab>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <router-view />
</template>

<script>
  export default {
    data: () => ({
      tab: null,
    }),
  }
</script>
