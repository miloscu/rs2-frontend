<template>
  <div>
    <form class="mb-2 ml-1 d-flex justify-content-center">
      <div class="row">
        <div class="col">
          <input
            class="form-control"
            type="text"
            placeholder="Search by name"
            maxlength="30"
            @keypress="isNumber($event)"
            v-on:submit.prevent
            v-model="searchQuery.name"
          />
        </div>
        <div class="col">
          <select name="dropdown" class="form-control" v-model="searchQuery.type">
            <option value="none" selected disabled hidden>Choose type</option>
            <option value="Games">Games</option>
            <option value="Music">Music</option>
            <option value="Books">Books</option>
            <option value="none">Any</option>
          </select>
        </div>
        <div class="col">
          <input
            class="form-control"
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            value="1"
            v-model="qty"
          />
        </div>
        <div class="col">
          <button
            class="btn btn-danger form-control"
            v-on:submit.prevent="addToCart()"
            v-on:click.prevent="addToCart()"
          >Add</button>
        </div>
      </div>
    </form>
    <div class="row">
      <div class="col-xs-6 col-s-6 col-m-6 col-l-6 col-xl-9">
        <h2 class="sub-header">Store</h2>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="product in resultQuery"
                v-bind:key="product.id"
                v-bind:class="{ 'bg-danger': product.isActive }"
                v-on:click="activate(product)"
              >
                <td>{{ product.name }}</td>
                <td>{{ product.type }}</td>
                <td>{{ product.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-xs-6 col-s-6 col-m-6 col-l-3 col-xl-3">
        <h2 class="sub-header">{{this.alias}}'s Wishlist</h2>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr class v-for="product in cart" v-bind:key="product.id">
                <td>{{ product.name }}</td>
                <td>{{ product.qty }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template> 


<script>
/* eslint-disable */
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "Store",

  data() {
    return {
      qty: 1,
      searchQuery: { name: "", type: "none" },
      alias: null,
      products: [],
      cart: [],
    };
  },
  methods: {
    isNumber(evt) {
      const keysAllowed = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
      ];
      const keyPressed = evt.key;
      if (!keysAllowed.includes(keyPressed)) {
        evt.preventDefault();
      }
    },
    addToCart() {
      let toPush = this.resultQuery.filter((item) => item.isActive)[0];
      let alreadyInThere = false;
      this.cart.forEach((product) => {
        if (product.name == toPush.name) {
          alreadyInThere = true;
        }
      });
      if (alreadyInThere) {
        alert("already added");
      } else {
        this.cart.push({
          name: toPush.name,
          id: toPush.id,
          type: toPush.type,
          description: toPush.description,
          qty: this.qty,
        });
        db.collection("basket")
          .doc()
          .set({
            productID: toPush.id,
            qty: this.qty,
            userID: firebase.auth().currentUser.uid,
          })
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      }
      this.products.forEach((product) => (product.isActive = false));
      this.qty = 1;
    },
    activate(p) {
      this.products.forEach((a) => (a.isActive = false));
      p.isActive = !p.isActive;
    },
  },
  computed: {
    resultQuery() {
      if (this.searchQuery.type || this.searchQuery.name) {
        return this.products
          .filter(
            (item) =>
              item.type == this.searchQuery.type ||
              this.searchQuery.type == "none" ||
              item.isActive
          )
          .filter((item) => {
            return this.searchQuery.name
              .toLowerCase()
              .split(" ")
              .every(
                (v) =>
                  item.name.toLowerCase().includes(v) ||
                  item.name == null ||
                  item.isActive
              );
          });
      } else {
        return this.products;
      }
    },
  },

  created() {
    //fetch data from the Firestore

    db.collection("products")
      .get()
      .then((snapshot) => {
        snapshot.forEach((productObject) => {
          let currentProduct = productObject.data();
          currentProduct.id = productObject.id;
          currentProduct.isActive = false;
          this.products.push(currentProduct);
        });
        this.products.sort((a, b) => a.name.localeCompare(b.name));
      });
  },

  mounted() {
    db.collection("basket")
      .where("userID", "==", firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        snapshot.forEach((alreadyWishlistedProduct) => {
          let currentProduct = alreadyWishlistedProduct.data();

          currentProduct.name = "temp";

          db.collection("products")
            .doc(currentProduct.productID)
            .get()
            .then((snapshot) => (currentProduct.name = snapshot.data().name));

          this.cart.push(currentProduct);
          //console.log(currentProduct);
        });
      })
      .catch((err) => console.log(err));
    this.alias = firebase.auth().currentUser.email.split("@")[0];
  },
};
</script> <style scoped>
</style>