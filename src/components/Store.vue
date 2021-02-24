<template>
  <div>
    <form class="center-block">
      <input
        type="text"
        placeholder="Search by name"
        v-model="searchQuery.name"
      />
      <select name="dropdown" v-model="searchQuery.type">
        <option value="none" selected disabled hidden>Choose type</option>
        <option value="Games">Games</option>
        <option value="Music">Music</option>
        <option value="Books">Books</option>
        <option value="none">Any</option>
      </select>
      <input
        type="number"
        id="quantity"
        name="quantity"
        min="1"
        value="1"
        v-model="qty"
      />
      <button
        v-on:submit.prevent="addToCart()"
        v-on:click.prevent="addToCart()"
      >
        Add
      </button>
    </form>

    <table class="table">
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
      </tr>
      <tr
        v-for="product in resultQuery"
        v-bind:key="product.id"
        v-bind:class="{ active: product.isActive }"
        v-on:click="activate(product)"
      >
        <td>{{ product.name }}</td>
        <td>{{ product.type }}</td>
        <td>{{ product.description }}</td>
      </tr>
    </table>
    <table class="table">
      <tr>
        <th></th>
        <th>Wishlist</th>
        <th></th>
        <th></th>
      </tr>
      <tr class="" v-for="product in cart" v-bind:key="product.id">
        <td>{{ product.name }}</td>
        <td>{{ product.type }}</td>
        <td>{{ product.description }}</td>
        <td>{{ product.qty }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "Store",
  data() {
    return {
      qty: 1,
      searchQuery: {
        name: "",
        type: "none",
      },
      products: [
        {
          name: "Album1",
          type: "Music",
          isActive: false,
          id: "99",
          description: "This is an Album",
        },
        {
          name: "Album2",
          type: "Music",
          isActive: false,
          id: "2",
          description: "This is an Album",
        },
        {
          name: "Album3",
          type: "Music",
          isActive: false,
          id: "3",
          description: "This is an Album",
        },
        {
          name: "Album4",
          type: "Music",
          isActive: false,
          id: "4",
          description: "This is an Album",
        },
        {
          name: "Album5",
          type: "Music",
          isActive: false,
          id: "5",
          description: "This is an Album",
        },
        {
          name: "Album6",
          type: "Music",
          isActive: false,
          id: "0",
          description: "This is an Album",
        },
        {
          name: "Album7",
          type: "Music",
          isActive: false,
          id: "6",
          description: "This is an Album",
        },
        {
          name: "Album8",
          type: "Music",
          isActive: false,
          id: "7",
          description: "This is an Album",
        },
        {
          name: "Album9",
          type: "Music",
          isActive: false,
          id: "8",
          description: "This is an Album",
        },
        {
          name: "Book1",
          type: "Books",
          isActive: false,
          id: "9",
          description: "This is a Book",
        },
        {
          name: "Book2",
          type: "Books",
          isActive: false,
          id: "10",
          description: "This is a Book",
        },
        {
          name: "Book3",
          type: "Books",
          isActive: false,
          id: "11",
          description: "This is a Book",
        },
        {
          name: "Book4",
          type: "Books",
          isActive: false,
          id: "1",
          description: "This is a Book",
        },
        {
          name: "Book5",
          type: "Books",
          isActive: false,
          id: "12",
          description: "This is a Book",
        },
        {
          name: "Book6",
          type: "Books",
          isActive: false,
          id: "13",
          description: "This is a Book",
        },
        {
          name: "Book7",
          type: "Books",
          isActive: false,
          id: "14",
          description: "This is a Book",
        },
        {
          name: "Book8",
          type: "Books",
          isActive: false,
          id: "15",
          description: "This is a Book",
        },
        {
          name: "Book9",
          type: "Books",
          isActive: false,
          id: "16",
          description: "This is a Book",
        },
      ],
      cart: [],
    };
  },
  methods: {
    addToCart() {
      let toPush = this.resultQuery.filter((item) => item.isActive)[0];
      console.log(toPush);
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
      }
      this.products.forEach((product) => (product.isActive = false));
      console.log(this.cart);
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
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
/* .card {
  border: 1px solid black;
} */

.active {
  background-color: cadetblue;
}
</style>
