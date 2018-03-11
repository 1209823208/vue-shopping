import {SAVE_GEOHASH, RECORD_ADDRESS, INIT_BUYCART, RECORD_SHOPDETAIL, REDUCE_CART, ADD_CART} from './mutation-types.js'

export default {
  // 记录当前经度纬度
  [RECORD_ADDRESS](state, {
    latitude,
    longitude
  }) {
    state.latitude = latitude;
    state.longitude = longitude;
  },
  //保存geohash
  [SAVE_GEOHASH](state, geohash) {
    state.geohash = geohash;
  },
  // 网页初始化时从本地缓存获取购物车数据
  [INIT_BUYCART](state) {
    let initCart = window.localStorage.getItem('buyCart');
    if (initCart) {
      state.cartList = JSON.parse(initCart);
    }
  },
  [RECORD_SHOPDETAIL](state, detail) {
    state.shopDetail = detail;
  },
  [REDUCE_CART](state, {
    shopid,
    category_id,
    item_id,
    food_id,
    name,
    price,
    specs,
  }) {
    let cart = state.cartList;
    let shop = cart[shopid] || {};
    let category = shop[category_id] || {};
    let item = category[item_id] || {};
    if (item && item[food_id]) {
      if (item[food_id]['num'] > 0) {
        item[food_id]['num']--;
        state.cartList = {...cart};
        //  存入localStorage
        window.localStorage.setItem('buyCart', JSON.stringify(state.cartList));
      } else {
        item[food_id] = null;
      }
    }
  },
  [ADD_CART](state, {
    shopid,
    category_id,
    item_id,
    food_id,
    name,
    price,
    specs,
    packing_fee,
    sku_id,
    stock,
  }) {
    let cart = state.cartList;
    let shop = cart[shopid] = cart[shopid] || {}; //店铺
    let category = shop[category_id] = shop[category_id] || {};//一级分类
    let item = category[item_id] = category[item_id] || {};//二级分类
    if (item[food_id]) {          // 商品id
      item[food_id]['num']++;
    } else {
      item[food_id] = {
        'num': 1,
        'id': food_id,
        'name': name,
        'price': price,
        'specs': specs,
        'packing_fee': packing_fee,
        'sku_id': sku_id,
        'stock': stock
      }
    }
    state.cartList = {...cart};
    //  存入localStorage
    window.localStorage.setItem('buyCart', JSON.stringify(state.cartList));
  }
}
