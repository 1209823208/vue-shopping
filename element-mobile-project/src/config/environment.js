const environment = {
  UrlPrefix: "//cangdu.org:8001",
};

export default {
  _URL(url) {
    if (url.charAt(0) !== '/') {
      url = '/' + url;
    }
    return environment.UrlPrefix + url;
  },
  getHeader() {
    let jwt = localStorage.getItem('id_token');
    let headers = {
      withCredentials: false,
      headers: {
        Authorization: 'JWT ' + jwt,
        'Content-Type': 'application/json',
      }
    }
    return headers
  }
}
