const STORAGE_KEY = 'todos-vuejs';
export default {
  fetch() {
    let store_val = window.localStorage.getItem(STORAGE_KEY) || '[]';
    return JSON.parse(store_val);
  },
  save(items) {
    window.localStorage.setItem(STORAGE_KEY,JSON.stringify(items))
  }
}
