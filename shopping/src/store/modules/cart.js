import shop from '../../api/shop'

const state = {
  cartList: [],
  total: 0,
  checkoutStatus: ''
};
const getters = {
  getCartList: (state, getters, rootState) => {
    let s = state.cartList.map(({id, num}) => {
      let record = rootState.products.products.find(product => product.id === id);
      if (record) {
        return {
          title: record.title,
          quantity: num,
          price: record.price
        }
      }

    });
    return s;
  },
  getTotalPrice: (state, getters) => {

    for (let val of  getters.getCartList) {
      state.total += val.price * val.quantity
    }
    return state.total;
  },
  checkoutStatus: (state) => {
    return state.checkoutStatus
  }
};
const mutations = {
  updateProducts(state, id) {
    let record = state.cartList.find(item => item.id === id)
    if (!record) {
      state.cartList.push({
        id: id,
        num: 1
      })
    } else {
      record.num++;
    }
  },
  clearCart(state) {
    state.cartList = [];
  },
  updateCheckoutStatus(state, content) {
    state.checkoutStatus = content;
  }
};
const actions = {
  checkoutCart({state, commit}) {
    let response = shop.commitCart(state.cartList);
    if (response.status === 1) {
      commit('clearCart', []);
      commit('updateCheckoutStatus','succeful');
    }else{
      commit('updateCheckoutStatus','Error');
    }
  }
};
export default {
  state,
  getters,
  mutations,
  actions
}
