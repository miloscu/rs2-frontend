<template>
  <div class="signup container w-50 text-center">
    <form v-on:submit.prevent="signUp()" class="card center">
      <h2 class="mt-2">Signup</h2>
      <div class="field">
        <label for="email" class="d-block">Email</label>
        <input type="email" name="email" v-model="email" />
      </div>
      <div class="field mt-2">
        <label for="password" class="d-block">Password</label>
        <input type="password" name="password" v-model="password" />
      </div>
      <div class="field mt-2 mb-2">
        <button class="btn btn-success" v-on:click="login()">Login</button>
        <button class="btn btn-danger">Sign up</button>
        <p class="mt-2" v-if="feedback">{{feedback}}</p>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Signup",
  data() {
    return {
      email: null,
      password: null,
      feedback: null,
    };
  },

  methods: {
    login() {
      if (this.email && this.password) {
        this.feedback = null;
        firebase
          .auth().signInWithEmailAndPassword(this.email, this.password)
          .then(() => this.$router.push({ name: "Store", params: {alias: this.email}}))
          .catch((err) => {
            console.log(err);
            this.feedback = err.message;
          });
      }
    },

    signUp() {
      if (this.email && this.password) {
        this.feedback = null;
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(() => this.$router.push({ name: "Store", params: {alias: this.email}}))
          .catch((err) => {
            console.log(err);
            this.feedback = err.message;
          });
      }
      if (!this.feedback) {
        this.feedback = "Successful signup";
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
