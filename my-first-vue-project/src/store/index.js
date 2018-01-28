import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    countCart: 0,
    navBreadHtml: '<span>goods</span>',
    errorArr:{
      mdShow: false,
      errorText: '',
    }
  },
  mutations: {
    getCountCart(state, cartNum) {
      state.countCart = cartNum;
    },
    getBreadHtml(state, html) {
      state.navBreadHtml = html;
    },
    getErrorArr(state,arr){
      state.errorArr.mdShow = arr.mdShow;
      state.errorArr.errorText = arr.errorText;
    }

  },
  actions: {
    getCartNumByAPi({commit}) {
      let cartNum = 0;
      axios.get('/users/getCartCount').then((response) => {
        if (response.data.status === '0') {
          cartNum = response.data.result.cartCount;
          commit('getCountCart', cartNum)
        }
      }).catch((err) => {
        console.log('get cart num err', err);
      });
    }
  }
})
