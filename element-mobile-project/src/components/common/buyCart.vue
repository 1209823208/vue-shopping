<template>
  <div>
    <section v-if="foods.specifications.length==0">
      <span @click="removeOutCart" v-if="foodNum"><i class="fa fa-minus-circle icon_class"
                                                     aria-hidden="true"></i></span>
      <span class="cart_num" v-if="foodNum">{{foodNum}}</span>
      <span @click="addToCart()"><i class="fa fa-plus-circle icon_class"></i></span>
    </section>
    <section v-else>
      <span v-if="foodNum" @click="showReduceTip">
        <i class="fa fa-minus-circle icon_class" aria-hidden="true"></i>
      </span>
      <span v-if="foodNum">{{foodNum}}</span>
      <span @click="showChooseList()" class="chooseguige">选规格</span>
    </section>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    data() {
      return {}
    },
    props: ['shopId', 'foods'],
    computed: {
      ...mapState([
        'cartList'
      ]),
      //监听cartList变化，更新当前商铺的购物车信息，同时返回一个新的对象
      shopCart: function () {
        if (this.cartList && this.cartList[this.shopId]) {
          return Object.assign({}, this.cartList[this.shopId]);
        }
      },
      foodNum: function () {
        let category_id = this.foods.category_id;
        let item_id = this.foods.item_id;
        if (this.shopCart && this.shopCart[category_id] && this.shopCart[category_id][item_id]) {
          let num = 0;
          Object.values(this.shopCart[category_id][item_id]).forEach(item => {
            num += item.num;
          })
          return num;
        } else {
          return 0;
        }
      }
    },
    methods: {
      ...mapMutations(['REDUCE_CART', 'ADD_CART']),
      //  减少购物车num
      removeOutCart() {
        if (this.foodNum > 0) {
          let obj = {
            shopid: this.shopId,
            category_id: this.foods.category_id,
            item_id: this.foods.item_id,
            food_id: this.foods.specfoods[0].food_id,
            name: this.foods.specfoods[0].name,
            price: this.foods.specfoods[0].price,
            specs: '',
            packing_fee: this.foods.specfoods[0].packing_fee,
            sku_id: this.foods.specfoods[0].sku_id,
            stock: this.foods.specfoods[0].stock,
          };
          this.REDUCE_CART(obj);
        }
      },
      addToCart() {
        let obj = {
          shopid: this.shopId,
          category_id: this.foods.category_id,
          item_id: this.foods.item_id,
          food_id: this.foods.specfoods[0].food_id,
          name: this.foods.specfoods[0].name,
          price: this.foods.specfoods[0].price,
          specs: '',
          packing_fee: this.foods.specfoods[0].packing_fee,
          sku_id: this.foods.specfoods[0].sku_id,
          stock: this.foods.specfoods[0].stock,
        };
        console.log(obj);
        this.ADD_CART(obj);
      },
      // 显示规格列表
      showChooseList() {
        this.$emit('showChooseList', this.foods);
      },
      //点击多规格商品的减按钮，弹出提示
      showReduceTip() {
        this.$emit('showReduceTip');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .icon_class {
    color: #4C8DE2;
    font-size: 16px;
  }

  .chooseguige {
    display: block;
    color: #fff;
    padding: 5px 10px;
    background-color: #3190e8;
    border-radius: 1rem;
    border: 1px solid #3190e8;
  }
</style>
