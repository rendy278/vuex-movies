<template>
  <div class="movie-detail">
    <h2>{{ movie.Title }}</h2>
    <p class="year">{{ movie.Year }}</p>
    <img :src="movie.Poster" alt="Movie Poster" class="featured-img" />
    <p class="plot">{{ movie.Plot }}</p>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import env from "/env.js";

export default {
  setup() {
    const movie = ref({});
    const route = useRoute();

    onBeforeMount(() => {
      fetch(
        `https://www.omdbapi.com/?apikey=${env.apikey}&i=${route.params.id}&plot=full`
      )
        .then((response) => response.json())
        .then((data) => {
          movie.value = data;
        });
    });

    return {
      movie,
    };
  },
};
</script>

<style lang="scss">
$mobile: 480px;
$tablet: 768px;

@mixin respond-to($breakpoint) {
  @if $breakpoint == mobile {
    @media only screen and (max-width: $mobile) {
      @content;
    }
  } @else if $breakpoint == tablet {
    @media only screen and (min-width: $mobile + 1) and (max-width: $tablet) {
      @content;
    }
  }
}
.movie-detail {
  padding: 18px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  h2 {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 16px;
  }
  .year {
    color: #aee1ca;
    margin-bottom: 16px;
  }
  .featured-img {
    display: block;
    max-width: 100%;
    margin-bottom: 16px;
  }
  .plot {
    font-size: 18px;
  }
}
</style>
