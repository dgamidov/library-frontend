<template>
  <v-container id="viewCSBooks">
    <div class="text-h2">Книги по CS</div>

    <div id="tree" class="text-center"></div>
  </v-container>
</template>

<script>
  const yaml = require('js-yaml')
  import Tree from '../plugins/d3/tree-radial-cluster.js'
  import * as d3 from 'd3'

  export default {
    name: 'CS Books',

    data() {
      return {
          tab: null,
          listOfCSBooks: null,
          error: null,
          tree_exists: false
        }
      },
    created() {
      // watch the params of the route to fetch the data again
      this.$watch(
        () => this.$route.params,
        () => {
          this.fetchDataAndDrawTree()
        },
        // fetch the data when the view is created and the data is
        // already being observed
        { immediate: true }
      )
    },
    methods: {
      fetchDataAndDrawTree() {
        this.error = this.listOfCSBooks = null
        this.loading = true

        if (!this.tree_exists) {
          fetch('/data/cs-books.yaml').then((response) => {
            return response.text().then((data) => {

              const listOfCSBooks = yaml.load(data)
              const chart = Tree(listOfCSBooks, {
                tree: d3.cluster,
                label: d => d.name,
                title: d => `[${d.status}] ${d.name}${d.author ? ' - ' + d.author : ''}`, // hover text
                link: d => d.link,
                width: 1400,
                height: 1400,
                margin: 300,
                stroke: '#0040ff'
              });

              const div = document.getElementById('tree');
              div.appendChild(chart);

              this.tree_exists = true
            }).catch((err) => {
              this.error = err.toString()
            })
          })
        }
      }
    }
  }
</script>
