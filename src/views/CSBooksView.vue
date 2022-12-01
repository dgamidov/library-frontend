<template>
  <v-container id="viewCSBooks">
    <div class="text-h2">Книги по CS</div>

    <v-radio-group
        v-if="false"
        v-model="this.chartType"
        mandatory
    >
      <v-radio label="Default" value="default"></v-radio>
      <v-radio label="Circle" value="circle"></v-radio>
    </v-radio-group>

    <div class="text-center">
      <svg></svg>
    </div>
  </v-container>
</template>

<script>
  const yaml = require('js-yaml')
  import * as d3 from 'd3'

  export default {
    name: 'CS Books',

    data() {
      return {
          chartType: 'default',
          tab: null,
          error: null,
          books: null,
        }
      },
    mounted() {
      this.fetchDataAndDrawTree();
    },
    methods: {
      getNodeColor(status) {
        // https://encycolorpedia.ru/10e030
        if (status === 'прочитал') {
          return '#10e030';
        } else if (status === 'читаю') {
          return '#ff00ff';
        } else if (status === 'купил') {
          return '#ffd700';
        } else if (status === 'перечитать') {
          return '#00d8ff';
        } else {
          return '#555';
        }
      },
      fetchDataAndDrawTree() {
        this.error = this.books = null;
        // this.loading = true

        fetch('/data/cs-books.yaml', {cache: "no-cache"}).then((response) => {
          return response.text().then((raw_data) => {

            this.books = yaml.load(raw_data);

            const tree = d3.cluster;
            const label = d => d.name;
            const title = d => `[${d.status}] ${d.name}${d.author ? ' - ' + d.author : ''}`;
            const link = d => d.link;
            const stroke = '#0092f0';
            const width = 1400;
            const height = 1400;
            const margin = 300;

            const sort = null;
            const strokeOpacity = null;
            const strokeLinecap = null;
            const strokeLinejoin = null;
            const strokeWidth = null;

            const separation = tree === d3.tree ? (a, b) => (a.parent === b.parent ? 1 : 2) / a.depth : (a, b) => a.parent === b.parent ? 1 : 2;
            const linkTarget = "_blank";
            const marginTop = margin; // top margin, in pixels
            const marginRight = margin; // right margin, in pixels
            const marginBottom = margin; // bottom margin, in pixels
            const marginLeft = margin; // left margin, in pixels
            const radius = Math.min(width - marginLeft - marginRight, height - marginTop - marginBottom) / 2; // outer radius
            const r = 3; // radius of nodes
            const halo = "#fff"; // color of label halo
            const haloWidth = 3; // padding around the labels

            const root = d3.hierarchy(this.books);

            // Sort the nodes.
            if (sort != null) root.sort(sort);

            // Compute labels and titles.
            const descendants = root.descendants();
            const L = !label ? null : descendants.map(d => label(d.data, d));

            // Compute the layout.
            tree().size([2 * Math.PI, radius]).separation(separation)(root);

            const svg = d3.select("svg")
                .attr("viewBox", [-marginLeft - radius, -marginTop - radius, width, height])
                .attr("width", width)
                .attr("height", height)
                .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
                .attr("font-family", "sans-serif")
                .attr("font-size", 10);

            svg.append("g")
                .attr("fill", "none")
                .attr("stroke", stroke)
                .attr("stroke-opacity", strokeOpacity)
                .attr("stroke-linecap", strokeLinecap)
                .attr("stroke-linejoin", strokeLinejoin)
                .attr("stroke-width", strokeWidth)
              .selectAll("path")
              .data(root.links())
              .join("path")
                .attr("d", d3.linkRadial()
                    .angle(d => d.x)
                    .radius(d => d.y));

            const node = svg.append("g")
              .selectAll("a")
              .data(root.descendants())
              .join("a")
                .attr("xlink:href", !link ? null : d => link(d.data, d))
                .attr("target", !link ? null : linkTarget)
                .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`);

            node.append("circle")
                .attr("fill", d => d.children ? stroke : this.getNodeColor(d.data.status))
                .attr("r", r);

            if (title) node.append("title")
                .text(d => title(d.data, d));

            if (L) node.append("text")
                .attr("transform", d => `rotate(${d.x >= Math.PI ? 180 : 0})`)
                .attr("dy", "0.32em")
                .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
                .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
                .attr("paint-order", "stroke")
                .attr("stroke", halo)
                .attr("stroke-width", haloWidth)
                .text((d, i) => L[i]);

          }).catch((err) => {
            this.error = err.toString();
          })
        })
      }
    }
  }
</script>
