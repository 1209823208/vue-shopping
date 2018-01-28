import shop from '../../api/shop'

const state = {
  products: [],
};
const getters = {
  getProducts: (state) => {
    return state.products
  }
};
const mutations = {
  receiveProducts(state, products) {
    state.products = products;
  },
  updateProducts(state, id) {
    state.products[id-1].inventory--;
  }
};
const actions = {
  getProductsByapi({commit}) {
    let products = shop.getProductsByH();
    commit('receiveProducts', products)
  },
};
export default {
  state,
  getters,
  mutations,
  actions
}
