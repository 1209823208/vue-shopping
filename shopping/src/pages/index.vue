<template>
  <div id="indexPage">
    <div class="row" style="padding: 0px; margin: 0px">
      <div class="col-sm-3 index-page-left">
        <div class="com-back">
          <h2 class="page-title">全部产品</h2>
          <div class="index-product-cotent" v-for="(item,index) in productList" :class="{nobord:index==='app'}">
            <h3 class="product-title">{{item.title}}</h3>
            <ul>
              <li v-for="val in item.content">
                <a>{{val.text}}</a>
                <span v-if="val.active" class="hot-lable">HOT</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="com-back new-message">
          <h2 class="page-title">最新消息</h2>
          <div class="index-product-cotent">
            <ul style="padding-left: 5px">
              <li v-for="item in newList">
                <a class="word-space">{{item.text}}</a>
              </li>
            </ul>
          </div>

        </div>
      </div>
      <div class="col-sm-9 index-page-right">
        <div class="row" style="padding: 0px; margin: 0px;background: #fff">
          <slide-show :slideList="slideList"></slide-show>
        </div>
        <div class="row" style="padding: 0; margin: 0; margin-top: 20px">
          <div class="item-detail-list col-sm-6" v-for="(item,index) in detailList">
            <div class="item-detail" :class="{fr:index%2!=0}">
              <div class="clearfix item-detail-content">
                <a class="fl detail-img">
                  <!--<img src="../assets/images/1.png"/>-->
                  <img :src="item.img"/>
                </a>
                <div class="fl detail-text">
                  <h3 class="title">{{item.title}}</h3>
                  <p>{{item.text}}</p>

                  <router-link :to="{path: 'detail/' + item.linkParam,params:{'til':item.linkParam}}" tag="button">
                    立即购买
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import slideShow from '../components/SlideShow'

  export default {
    created: function () {
      this.$http.get('db.json')
        .then((res) => {
          console.log('res:', res);
        }, (err) => {
          console.log(err)
        })
    },
    data() {
      return {
        productList: {
          pc: {
            title: 'PC产品',
            content: [
              {
                id: 1,
                text: '数据统计',
                active: false
              },
              {
                id: 2,
                text: '数据预测',
                active: false
              },
              {
                id: 3,
                text: '流量分析',
                active: true
              },
              {
                id: 4,
                text: '广告发布',
                active: false
              }
            ]
          },
          app: {
            title: '手机应用类',
            content: [
              {
                id: 1,
                text: '91助手',
                active: false
              },
              {
                id: 2,
                text: '产品助手',
                active: true
              },
              {
                id: 3,
                text: '智能地图',
                active: false
              },
              {
                id: 4,
                text: '团队语音',
                active: false
              }
            ]
          }
        },
        newList: [
          {
            id: 1,
            text: '新闻条目1新闻条目1新闻条目1新闻条目1',
            url: ''
          },
          {
            id: 2,
            text: '新闻条目2新闻条目2新闻条目2新闻条目2',
            url: ''
          },
          {
            id: 3,
            text: '新闻条目3新闻条目3新闻条目3',
            url: ''
          },
          {
            id: 4,
            text: '新闻条目4',
            url: ''
          }
        ],
        detailList: [
          {
            title: '开放产品',
            text: '开放产品是一款开放产品',
            img: require('../assets/images/1.png'),
            linkParam: 'count'
          },
          {
            title: '品牌营销',
            text: '品牌营销品牌营销品牌营销品牌营销开放产品是一款开放产品',
            img: require('../assets/images/2.png'),
            linkParam: 'datspecu'
          },
          {
            title: '使命必达',
            text: '使命必达使命必达开放产品是一款开放产品',
            img: require('../assets/images/3.png'),
            linkParam: 'analysis'
          },
          {
            title: '勇敢高峰',
            text: '勇敢高峰勇敢高峰勇敢高峰开放产品是一款开放产品',
            img: require('../assets/images/4.png'),
            linkParam: 'public'
          }
        ],
        slideList: [
          {
            link: '',
            text: 'pic1',
            img: require('../assets/slideShow/pic1.jpg')
          },
          {
            link: '',
            text: 'pic2',
            img: require('../assets/slideShow/pic2.jpg')
          },
          {
            link: '',
            text: 'pic3',
            img: require('../assets/slideShow/pic3.jpg')
          },
          {
            link: '',
            text: 'pic4',
            img: require('../assets/slideShow/pic4.jpg')
          }
        ]
      }
    },
    components: {
      slideShow
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #indexPage {
    padding: 20px 0px;
  }

  .index-page-left {
    margin-left: 0px;
    padding: 0px;
  }

  .com-back {
    background: #fff;
  }

  .index-page-left .page-title {
    background: #6EBE91;
    font-size: 16px;
    padding: 10px;
    color: #fff;
    margin-top: 0px;
  }

  .index-product-cotent {
    padding: 0px 10px;
    border-bottom: 1px solid #DDDDDD;
    /*border-bottom: 1px solid red;*/

  }

  .index-product-cotent.nobord {
    border-bottom: 0;
  }

  .index-product-cotent .product-title {
    font-size: 16px;
    font-weight: bold;
  }

  .index-product-cotent li {
    list-style: none;
    margin-left: 10px;
  }

  .index-product-cotent li a {
    color: #444444;
  }

  .index-product-cotent .hot-lable {
    background: red;
    color: #fff;
    font-size: 14px;
  }

  .new-message {
    margin-top: 20px;
  }

  .new-message .word-space {
    display: inline-block;
    width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .item-detail-list {
    padding: 0px;
    margin-bottom: 10px;
  }

  .item-detail {
    background: #fff;
    width: 98%;
    height: 150px;
    border: 1px solid transparent;
  }

  .item-detail-content {
    margin: 20px;
  }

  .item-detail-content .title {
    font-size: 20px;
    font-weight: bold;
    margin-top: 10px
  }

  .item-detail-content .buy_button {
    background: #6EBE91;
    color: #fff;
    padding: 2px 10px;
  }

  .detail-img {
    width: 30%;
  }

  .detail-text {
    margin-left: 10px;
    width: 60%;
  }

</style>
