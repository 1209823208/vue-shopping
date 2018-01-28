<template>
  <div id="Address">
    <div class="container">
      <div class="checkout-addr">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>check out</span></h2>
        </div>
        <!-- process step -->
        <div class="check-step">
          <ul>
            <li class="cur"><span>Confirm</span> address</li>
            <li><span>View your</span> order</li>
            <li><span>Make</span> payment</li>
            <li><span>Order</span> confirmation</li>
          </ul>
        </div>

        <!-- address list -->
        <div class="page-title-normal checkout-title">
          <h2><span>Shipping address</span></h2>
        </div>
        <div class="addr-list-wrap">
          <div class="addr-list">
            <ul>
              <li v-for="(item,index) in address.slice(0,currentlength)"
                  :class="{check:checkAddressId===item.addressId}" @click="checkAddressId = item.addressId">
                <dl>
                  <dt>{{item.userName}}</dt>
                  <dd class="address">{{item.streetName}}</dd>
                  <dd class="tel">{{item.postCode}}</dd>
                </dl>
                <div class="addr-opration addr-del" @click="delAddress(item)">
                  <a href="javascript:;" class="addr-del-btn">
                    <icon name="flag"></icon>
                  </a>
                </div>
                <div class="addr-opration" v-if="!item.isDefault"
                     @click="setDefaultAddress(item.addressId)">
                  <a href="javascript:;" class="addr-set-default-btn">Set default</a>
                </div>
                <div class="addr-opration addr-default" v-if="item.isDefault">Default address</div>
              </li>

              <li class="addr-new" @click="openDialog()">
                <div class="add-new-inner">
                  <i class="icon-add">
                    <svg class="icon icon-add">
                      <use xlink:href="#icon-add"></use>
                    </svg>
                  </i>
                  <p>Add new address</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- more-->
          <div class="shipping-addr-more" @click="showAllAddress()" v-if="moreFlag">
            <a class="addr-more-btn up-down-btn" href="javascript:;">
              more
              <i class="i-up-down">
                <i class="i-up-down-l"></i>
                <i class="i-up-down-r"></i>
              </i>
            </a>
          </div>
        </div>

        <!-- shipping method-->
        <div class="page-title-normal checkout-title">
          <h2><span>Shipping method</span></h2>
        </div>
        <div class="lemall-msg-info hidden">
          <span>The region you selected is not within our delivery area. Please select another shipping address within our delivery areas.</span>
        </div>
        <div class="shipping-method-wrap">
          <div class="shipping-method">
            <ul>
              <li class="check">
                <div class="name">Standard shipping</div>
                <div class="price">Free</div>
                <div class="shipping-tips">
                  <p>Once shipped，Order should arrive in the destination in 1-7 business days</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="next-btn-wrap">
          <a class="btn btn--m btn--red" @click="toOrderList()">Next</a>
        </div>
      </div>
    </div>
    <Dialog :isShow=isShow @on-close="closeDialog()">
      <div class="login-div"><span>地址ID:</span><input class="login-input" type="text" v-model="addressId"/></div>
      <div class="login-div"><span>名称:</span><input class="login-input" type="text" v-model="userName"/></div>
      <div class="login-div"><span>详细地址:</span><input class="login-input" type="text" v-model="streetName"/></div>
      <div class="login-div"><span>邮编:</span><input class="login-input" type="text" v-model="postCode"/></div>
      <div class="login-div"><span>电话:</span><input class="login-input" type="text" v-model="tel"/></div>
      <div class="login-div"><span></span>
        <button @click="saveAddress()">save</button>
      </div>
    </Dialog>
  </div>
</template>

<script>
  import Dialog from '../base/Dialog.vue'

  export default {
    data() {
      return {
        address: [],
        isShow: false,
        "addressId": '',
        "userName": '',
        "streetName": '',
        "postCode": '',
        "tel": '',
        "isDefault": false,
        currentlength: 3,
        moreFlag: true,
        checkAddressId: 1,
      }
    },
    methods: {
      getAddress() {
        let _this = this;
        this.$http.get('/users/addressList').then((response) => {
          if (response.data.status === '0') {
            this.address = response.data.result.addressList;
            this.address.forEach(function (item) {
              if (item.isDefault) {
                _this.checkAddressId = item.addressId;
              }
            })
          }
        }).catch((err) => {
          Promise.reject(err);
        })
      },
      saveAddress() {
        let params = {
          "addressId": this.addressId,
          "userName": this.userName,
          "streetName": this.streetName,
          "postCode": this.postCode,
          "tel": this.tel,
          "isDefault": false
        };
        this.$http.post('/users/addAddress', params).then((response) => {
          if (response.data.status === '0') {
            this.getAddress();
            this.isShow = false;
          }

        }).catch((err) => {
          Promise.reject(err);
        })
      },
      setDefaultAddress(addressId) {
        let params = {
          addressId: addressId
        }
        this.$http.post('/users/setDefault', params).then((response) => {
          if (response.data.status === '0') {
            this.getAddress();
          }

        }).catch((err) => {
          Promise.reject(err);
        })
      },
      delAddress(item) {
        if (item.isDefault) {
          alert('默认地址不能删除');
          return false;
        }
        let params = {
          addressId: item.addressId
        }
        this.$http.post('/users/delAddress', params).then((response) => {
          if (response.data.status === '0') {
            this.getAddress();
          }

        }).catch((err) => {
          Promise.reject(err);
        })
      },
      closeDialog() {
        this.isShow = false;
      },
      openDialog() {
        this.isShow = true;
      },
      // more
      showAllAddress() {
        this.currentlength = this.address.length;
        console.log('length ', this.currentlength);
        this.moreFlag = false;
      },
      toOrderList() {
        this.$router.push({
          path: 'orderList', query: {addressId: this.checkAddressId}
        });
      }
    },
    mounted: function () {
      this.getAddress();
      this.$store.commit('getBreadHtml','AddressList');
    },
    components: {
      Dialog
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login-input {
    height: 30px;
    line-height: 30px;
    width: 200px;
  }

  .login-div {
    margin: 20px;
  }

  .login-div span {
    width: 60px;
    display: inline-block;
  }

  .login-div button {
    width: 60px;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    background-color: chartreuse;
    color: #ffffff;
  }
</style>
