<template>
  <div id="nav">
    <router-link to="/">Главная</router-link> |
    <router-link to="/cs-books">Книги по CS</router-link>
  </div>
  <router-view/>
</template>

<script>
export default {
  name: "Header"
};
</script>
