export const addCart = ({ commit }, product) => {
  if (product.inventory > 0) {
    commit('updateProducts', product.id);
  }
}
