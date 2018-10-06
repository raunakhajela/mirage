<template>
  <div>
    <br><br>
    <center>
      <router-link :to="{name: 'task', params:{id:id}}" v-show="!error">Go Back</router-link>
    </center>
  </div>
</template>

<script>
import db from "../firebase.js";
export default {
  data() {
    return {
      id: this.$route.params.id,
      error: false
    };
  },
  methods: {
    redirect() {
      this.$router.push({ name: "task", params: { id: this.id } });
    }
  },
  mounted() {
    var c = confirm("Are You Sure Want To Delete This Task?");
    if (c) {
      db.collection("TODOS")
        .doc(this.id)
        .delete()
        .then(() => this.$router.push({ name: "tasks" }));
    } else {
      this.redirect();
    }
  }
};
</script>

<style scoped>
</style>
