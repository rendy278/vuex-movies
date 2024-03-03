<template>
  <header>
    <h1><span>Rend</span>Movies</h1>
    <router-link to="/">
      <i class="pi pi-arrow-left back" style="color: #42b883"></i>
    </router-link>
  </header>
  <main>
    <router-view />
  </main>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Fira Sans", sans-serif;

  &::selection {
    background: transparentize(#42b883, 0.5);
  }
}

body {
  background-color: #35495e;
}

a {
  text-decoration: none;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background-color: #2c3d4e;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);

  h1 {
    color: #fff;
    font-size: 28px;

    span {
      color: #42b883;
    }
  }
}
</style>
