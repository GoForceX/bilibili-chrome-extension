<template>
  <div class="main">
    <div class="container">
      <span>
        网络错误或账号未登录
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Denied",
  data() {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  display: flex
}

.container {
  align-self: center;
  margin: 0 auto;
}

span {
  font-size: 30px;
  font-weight: 300;
}
</style>