<template>
  <div id="HelloWorld">
    <p class="active">父子组件通信</p>
    <p class="active">Header</p>
    <div>
      <Header
        parentHeader="this is a hello world components header"
        v-on:childTellParentByFunction="ListenValue">
      </Header>
      <p>Header子传父：{{fromChild}}</p>
    </div>


    <p class="active">Footer</p>
    <div>
      <Footer
        parent-footer="this is a hello world components Footer"
        @get-footer-event="getFooterEvent">
        <p>2222222</p>
        <p slot="footer1">footer1 has data</p>
        <p slot="footer2">footer2 has data</p>

      </Footer>
      <p>Footer子传父：{{footerFromChild}}</p>

      <h1 v-text="title"></h1>
      <input type="text" v-model="newItem" v-on:keyup.enter="addNew">
      <ul>
        <li v-for="item in items" v-bind:class="{finished: item.isFinished}" v-on:click="toggleFinish(item)">
          {{item.label}}
        </li>
      </ul>
    </div>


    <p class="active">input-checkbox</p>
    <div>
      <input v-model="checkboxArr" type="checkbox" value="1"/>1
      <input v-model="checkboxArr" type="checkbox" value="2"/>2
      <input v-model="checkboxArr" type="checkbox" value="3"/>3
      <p>选中的数值：{{checkboxArr}}</p>
    </div>


    <p class="active">input-radio</p>
    <div>
      <input v-model="radioArr" type="radio" value="1"/>1
      <input v-model="radioArr" type="radio" value="2"/>2
      <input v-model="radioArr" type="radio" value="3"/>3
      <p>选中的数值：{{radioArr}}</p>
    </div>


    <p class="active">select</p>
    <div>
      <select v-model="selectValue">
        <option v-for="item in selectArr" :value="item.id">{{item.value}}</option>
      </select>
      <p>选中的数值：{{selectValue}}</p>
    </div>


    <p class="active">computed</p>
    <div>
      <input v-model="myComputedValue"/>
      <p>computed：{{myComputedValueByInput}}</p>
      <p>by function：{{myComputedValueByInputFun()}}</p>
    </div>


    <p class="active">transtion</p>
    <div>
      <button v-on:click="pShow=!pShow">toggle</button>
      <transition name="my-trans">
        <p v-show="pShow">显示与隐藏</p>
      </transition>
    </div>


    <p class="active">动态切换component</p>
    <div>
      <button v-on:click="toggleCom">toggle</button>
      <transition name="fade">
        <keep-alive>
          <div :is="currentView"></div>
        </keep-alive>
      </transition>
    </div>


    <p class="active">directives</p>
    <div v-color="'red'">directives指令 改变颜色</div>


    <p class="active">路由跳转 router</p>
    <div id="router">
      <router-link :to="{'path':'Header/red/3'}">to Header</router-link>
      <br/>
      <router-link :to="{'name':'Header','params':{'color':'red','type':3}}">to Header and params</router-link>
      <br/>
      <router-link :to="{'path':'Footer'}">to Footer by path</router-link>
      <br/>
      <router-link :to="{'name':'FooterByName','params':{'color':'red','type':3}}">to Footer by name</router-link>
      <br/>
      <router-link :to="'Footer'">to Footer by string</router-link>
      <br/>
      <router-link :to="footer_str">to Footer by 变量</router-link>
      <br/>
      <router-link :to="{'path':'Footer'}" class="a_p_active" tag="p">to Footer 指定标签</router-link>
      <router-link :to="{ path: 'Footer', query: { plan: 'private' }}">to Footer by query</router-link>
    </div>


    <p class="active red">vuex</p>
    <div>
      <p>总价：{{getTotalPrice}}</p>
      <p>
        <apple></apple>
      </p>
      <p>
        <banana></banana>
      </p>
    </div>

    <div>{{fullName}}:{{firstName}}:{{lastName}}</div>

    <p class="active red">filters</p>
    <p>{{19 | formatMoney}}</p>
    <p>{{19 | formatMoney('元')}}</p>

  </div>
</template>

<script>
  import localStorageStore from '../localStorageStore.js'
  import Header from './Header.vue'
  import Footer from './Footer.vue'

  import ComA from './ComA.vue'
  import ComB from './ComB.vue'

  import Apple from './Apple.vue'
  import Banana from './Banana.vue'

  import {mapState} from 'vuex'

  export default {
    name: 'HelloWorld',
    data() {
      return {
        footer_str: 'Footer',
        currentView: 'com-a',
        pShow: true,
        title: 'this is a todo list',
        items: localStorageStore.fetch(),
        newItem: '',
        fromChild: '',
        footerFromChild: '',
        checkboxArr: [],
        radioArr: [],
        selectArr: [
          {
            'id': 1,
            'value': 1
          },
          {
            'id': 2,
            'value': 2
          }
        ],
        selectValue: [],
        myComputedValue: '',
        firstName: 'Foo',
        lastName: 'Bar'
      }
    },
    components: {Header, Footer, ComA, ComB, Apple, Banana},
    computed: {
      myComputedValueByInput() {
        return this.myComputedValue.replace(/\d/g, '');
      },
      // store
//      getTotalPrice: function () {
//        return this.$store.state.totalPrice;
//      },
      fullName() {
        let s = 'John Doe';
        var names = s.split(' ');
        this.firstName = names[0]
        this.lastName = names[names.length - 1];
        return this.firstName + ' ' + this.lastName
      }
    },
    methods: {
      toggleFinish: function (item) {
        item.isFinished = !item.isFinished;
      },
      addNew: function () {
        this.items.push({
          label: this.newItem,
          isFinished: false
        });
        this.newItem = '';
      },
      ListenValue: function (msg) {
        this.fromChild = msg;
      },
      getFooterEvent: function (msg) {
        this.footerFromChild = msg;
      },
      myComputedValueByInputFun() {
        return this.myComputedValue.replace(/\d/g, '');
      },
      toggleCom() {
        if (this.currentView === 'com-a') {
          this.currentView = 'com-b';
        } else {
          this.currentView = 'com-a';
        }
      },
      getDataByVueSource() {
        this.$http.get('http://localhost:3000/db', {
          params: {
            ID: 12345
          },
          headers: {}
        })
          .then(res => {

          }, erroe => {

          })
      },
      postFunByVueSource() {
        this.$http.post('pack.json', {
          ID: 12345   // 传递参数
        }, {
          headers: {
            // 头部请求
            token: 'ssss'
          }
        })
          .then(res => {

          }, erroe => {

          })
      },
      jsonPFuncByVueSource() {
        this.$http.jsonp("http://www.imooc.com/course/ajaxskillcourse?cid=796",
          {
            params: {
              ID: 12345
            },
          }
        )
          .then(res => {

          }, erroe => {

          })
      },
      httpFunByVueSource() {
        this.$http({
          url: 'package.json',
          method: 'get',
          params: {
            ID: 12345
          },
          headers: {
            token: 123
          },
          timeout: 5,
          before: function () {

          }
        })
          .then(res => {

          }, erroe => {

          })
      },
      getDataByAxios() {
        this.$http.get('http://localhost:3000/db', {
          params: {
            ID: 12345
          },
          headers: {}
        })
          .then(function (res) {
            console.log('res', res);
          })
          .catch(function (err) {
            console.log(err);
            return Promise.reject(err);

          })
      },
      postFunByAxios() {
        this.$http.post('pack.json', {
          ID: 12345   // 传递参数
        }, {
          headers: {
            // 头部请求
            token: 'ssss'
          }
        })
          .then(function (res) {
            console.log('res', res);
          })
          .catch(function (err) {
            console.log(err);
            return Promise.reject(err);

          })
      },
      httpFunByAxios() {
        this.$http({
          url: 'package.json',
          method: 'post',
          data: {
            ID: 12345
          },
          headers: {
            token: 123
          },
          timeout: 5,
          before: function () {

          }
        })
          .then(function (res) {
            console.log('res', res);
          })
          .catch(function (err) {
            console.log(err);
            return Promise.reject(err);

          })
      }
    },
    watch: {
      items: {
        handler: function (items) {
          localStorageStore.save(items);
        },
        deep: true
      },
      newItem: function (val, oldVal) {

      },
      '$route': function (to, from) {
        console.log('route to', to);
        console.log('route from', from);

      }
    },
    directives: {
      color: function (el, binding) {
//        console.log('el', el);
//        console.log('binding', binding);
        el.style.color = binding.value;
      }
    },
    http: {
      root: 'http:8080'
    },
    mounted: function () {
//      this.getDataByHttp();
      // vue-resource
//      this.$http.interceptors.push(function (request,next) {
//        console.log('request init');
//        // loading show  批量
//        next(function (response) {
//          // loading hide
//
//          console.log('response init');
//          return response;
//        });
//      })

      // axios
//      this.$http.interceptors.request.use(function (request) {
//        console.log('request init');
//        // loading show  批量
//        return request;
//      });
//      this.$http.interceptors.response.use(function (response) {
//        console.log('response init');
//        // loading show  批量
//        return response;
//      })
    },
    filters: {
      formatMoney: function (val) {
        return "¥" + val.toFixed(2);
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .finished {
    text-decoration: underline;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .a_p_active {
    color: #42b983;
  }

  .red {
    color: red;
  }

  .active {
    font-size: 20px;
    font-weight: bold;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opcity 0.5s ease-out;
  }

  .fade-enter, .fade-leave-active {
    opcity: 0;
  }

  .my-trans-enter-active, .my-trans-leave-active {
    transition: all .5s ease-out;
  }

  .my-trans-enter {
    transform: translateY(-500px);
    opacity: 0;
  }

  .my-trans-leave-active {
    transform: translateY(500px);
    opacity: 0;
  }
</style>
