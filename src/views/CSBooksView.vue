<template>
  <v-container id="viewCSBooks">
    <div class="text-h2">Книги по CS</div>

    <div v-if="listOfCSBooks" class="content">
      <h2>{{ listOfCSBooks }}</h2>
    </div>
  </v-container>
</template>

<script>
  const yaml = require('js-yaml');

  export default {
    name: 'CS Books',

    data() {
      return {
          tab: null,
          listOfCSBooks: null,
          error: null
        }
      },
    created() {
      // watch the params of the route to fetch the data again
      this.$watch(
        () => this.$route.params,
        () => {
          this.fetchData()
        },
        // fetch the data when the view is created and the data is
        // already being observed
        { immediate: true }
      )
    },
    methods: {
      fetchData() {
        this.error = this.listOfCSBooks = null
        this.loading = true

        fetch('/data/cs-books.yaml').then((response) => {
          return response.text().then((data) => {
            this.listOfCSBooks = yaml.load(data)
          }).catch((err) => {
            this.error = err.toString()
          })
        })
      }
    }
  }
</script>
