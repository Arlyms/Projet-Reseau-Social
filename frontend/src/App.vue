<template>
  <router-view></router-view>
</template>

<script>

export default{
  name: 'App',
  components:{
  }
}
</script>

<style lang="scss" >
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap');

* {
  font-family: 'Poppins', sans-serif;
  color: #091F43;
  margin:0;
  padding: 0;
  box-sizing: border-box;
}


#app {
  max-width: 100%;
};

body {
  background-color: white;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  padding:32px;
};
</style>
