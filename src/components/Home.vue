<template>
  <div class="Home">
    <form @submit.prevent="searchMovies" class="search-box">
      <input type="text" placeholder="Search Movie" v-model="search" />
      <button type="submit" class="search">Search</button>
    </form>
    <div class="feature-card">
      <router-link to="/movie/tt0409591">
        <img src="../assets/naruto.jpeg" alt="Naruto" class="featured-img" />
        <div class="detail">
          <h3>Naruto</h3>
          <p>
            Naruto Uzumaki, a mischievous adolescent ninja, struggles as he
            searches for recognition and dreams of becoming the Hokage, the
            village's leader and strongest ninja.
          </p>
        </div>
      </router-link>
    </div>
    <div class="movie-list">
      <div class="movie" v-for="movie in movies" :key="movie.imdbID">
        <router-link :to="'/movie/' + movie.imdbID" class="movie-link">
          <div class="product-image">
            <img :src="movie.Poster" alt="movie poster" />
            <div class="type">{{ movie.Type }}</div>
          </div>
          <div class="detail">
            <p class="year">{{ movie.Year }}</p>
            <h3>{{ movie.Title }}</h3>
          </div>
        </router-link>
      </div>
      <div v-if="!movies.length" class="no-results">
        <p class="error">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import env from "/env.js";

export default {
  setup() {
    const router = useRouter();
    const search = ref("");
    const movies = ref([]);
    const errorMessage = ref("");
    const searchMovies = () => {
      if (search.value.trim() !== "") {
        fetch(`https://www.omdbapi.com/?apikey=${env.apikey}&s=${search.value}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.Error) {
              // Jika API mengembalikan error, set pesan error
              errorMessage.value =
                "Maaf, film yang Anda cari tidak dapat ditemukan.";
              movies.value = [];
            } else {
              // Jika tidak ada error, set hasil pencarian
              errorMessage.value = "";
              movies.value = data.Search;
            }
            search.value = "";
          });
      } else {
        // Jika pencarian kosong, reset pesan error dan daftar film
        errorMessage.value = "";
        movies.value = [];
      }
    };

    return {
      search,
      movies,
      errorMessage,
      searchMovies,
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
.Home {
  .search-box {
    width: 100%;
    display: flex;
    input {
      padding: 1rem;
      width: 85%;
      outline: none;
      border: none;

      &[type="text"] {
        color: white;
        background: #8c8c8c;
        transition: 0.4s;
        &::placeholder {
          color: white;
        }
      }
    }
    .search {
      width: 20%;
      background-color: #42b883;
      color: #fff;
      font-weight: 700;
      border: none;

      &:hover {
        background: #349267;
      }
    }
  }
  .feature-card {
    position: relative;

    .featured-img {
      display: block;
      width: 100%;
      height: 500px;
      object-fit: cover;
      position: relative;
      z-index: 0;

      @include respond-to(mobile) {
        height: 300px;
      }
    }
    .detail {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.6);
      color: #fff;
      padding: 16px;
      z-index: 1;
    }
  }
  .movie-list {
    display: flex;
    flex-wrap: wrap;
    margin: 0 8px;

    .movie {
      max-width: 20%;
      flex: 1 1 20%;
      padding: 16px 8px;
      @include respond-to(tablet) {
        max-width: 25%;
        flex: 1 1 25%;
      }

      @include respond-to(mobile) {
        max-width: 50%;
        flex: 1 1 50%;
      }
      .movie-link {
        display: flex;
        flex-direction: column;
        height: 100%;

        .product-image {
          position: relative;
          display: block;

          img {
            display: block;
            width: 100%;
            height: 275px;
            object-fit: cover;
          }
          .type {
            position: absolute;
            padding: 8px 16px;
            background-color: #42b883;
            color: #fff;
            top: 0;
            text-transform: capitalize;
          }
        }
        .detail {
          background-color: #8c8c8c;
          color: #fff;
          padding: 16px 8px;
          flex: 1 1 100%;
          border-radius: 0px 0px 8px 8px;

          .year {
            color: #aee1ca;
            font-size: 14px;
          }
          h3 {
            color: #fff;
            font-weight: 600;
            font-size: 18px;
          }
        }
      }
    }
  }
  .error {
    color: #fff;
    font-size: 30px;
    padding: 20px;
    text-align: center;
  }
}
</style>
