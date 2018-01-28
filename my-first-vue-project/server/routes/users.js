var express = require('express');
var router = express.Router();
require('./../util/util')
var User = require('./../models/user');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


//登陆 退出
router.post('/login', function (req, res, next) {
  var params = {
    userName: req.body.userName,
    userPwd: req.body.userPwd,
  };
  User.findOne(params, function (err, doc) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message
      })
    } else {
      if(doc){
        res.cookie("userId", doc.userId, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        res.cookie("userName", doc.userName, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        res.json({
          status: "0",
          msg: '',
          result: {
            "userName": doc.userName
          }
        })
      }else{
        res.json({
          status: "1",
          msg: '账号密码错误'
        })
      }
    }
  });

});
router.get('/loginOut', function (req, res, next) {
  res.cookie("userId", '', {
    path: '/',
    maxAge: -1
  });
  res.cookie("userName", '', {
    path: '/',
    maxAge: -1
  });
  res.json({
    status: "0",
    msg: '',
    result: 'sucess'
  })
});
router.get('/checkLogin', function (req, res, next) {
  if (req.cookies.userId) {
    res.json({
      status: "0",
      msg: '',
      result: {
        userName: req.cookies.userName
      }
    })
  } else {
    res.json({
      status: "1",
      msg: '未登陆',
      result: ''
    })
  }
});


//购物车
router.get('/getCartList', function (req, res, next) {
  var params = {
    userId: req.cookies.userId,
  };
  User.findOne(params, function (err, doc) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message
      })
    } else {
      if (doc) {
        res.json({
          status: "0",
          msg: '',
          result: {
            "cartList": doc.cartList
          }
        })
      }

    }
  });

});
// 修改商品数量
router.post("/cartEdit", function (req, res, next) {
  var userId = req.cookies.userId,
    productId = req.body.productId,
    productNum = req.body.productNum,
    checked = req.body.checked;
  User.update({"userId": userId, "cartList.productId": productId}, {
    "cartList.$.productNum": productNum,
    "cartList.$.checked": checked,
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'suc'
      });
    }
  })
});
// 全选
router.post('/editCheckAll', function (req, res, next) {
  var params = {
    'userId': req.cookies.userId,
  };
  let checkAll = req.body.checkAll ? '1' : '0';
  User.findOne(params, function (err, use) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message
      })
    } else {
      if (use) {
        use.cartList.forEach((item) => {
          item.checked = checkAll;
        });
        use.save(function (err1, doc) {
          if (err) {
            res.json({
              status: "1",
              msg: err.message
            })
          } else {
            res.json({
              status: "0",
              msg: '',
              result: 'sucess'
            })
          }
        })
      }


    }
  });

});
// 删除
router.post("/cartDel", function (req, res, next) {
  var params = {
    'userId': req.cookies.userId,
  };
  let productId = req.body.productId;
  User.update(params, {
    $pull: {
      'cartList': {
        'productId': productId
      }
    }
  }, function (err, doc) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message
      })
    } else {
      res.json({
        status: "0",
        msg: '',
        result: 'sucess'
      })
    }
  });
});
// 获取当前购物车数量
router.get("/getCartCount", function (req, res, next) {
  let userId = req.cookies.userId;
  if (userId) {
    User.findOne({"userId": userId}, function (err, doc) {
      if (err) {
        res.json({
          status: "1",
          msg: err.message
        })
      } else {
        let cartList = doc.cartList;
        let cartCount = 0;

        cartList.map(function (item) {
          cartCount += parseFloat(item.productNum)
        });
        res.json({
          status: "0",
          msg: '',
          result: {
            cartCount: cartCount
          }
        })
      }
    });
  } else {
    res.json({
      status: "1",
      msg: '未登陆'
    })
  }

})


//用户地址
router.get('/addressList', function (req, res, next) {
  let params = {
    userId: req.cookies.userId,
  };
  User.findOne(params, function (err, doc) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message
      })
    } else {
      res.json({
        status: "0",
        msg: '',
        result: {
          addressList: doc.addressList
        }
      })
    }
  })
});
// 设置默认地址接口
router.post('/setDefault', function (req, res, next) {
  let userId = req.cookies.userId;
  let addressId = req.body.addressId;
  if (!addressId) {
    res.json({
      status: "1",
      msg: '地址为空'
    })
  } else {
    User.findOne({userId: userId}, function (err, doc) {
      if (err) {
        res.json({
          status: "1",
          msg: err.message
        })
      } else {
        let addressList = doc.addressList;
        addressList.forEach(function (item) {
          if (item.addressId === addressId) {
            item.isDefault = true;
          } else {
            item.isDefault = false;
          }
        });
        doc.save(function (err1, doc1) {
          if (err1) {
            res.json({
              status: "1",
              msg: err1.message
            })
          } else {
            res.json({
              status: "0",
              msg: '',
              result: 'sucess'
            })
          }
        })
      }
    })
  }
});
// 删除地址
router.post("/delAddress", function (req, res, next) {
  var params = {
    'userId': req.cookies.userId,
  };
  let addressId = req.body.addressId;
  User.update(params, {
    $pull: {
      'addressList': {
        'addressId': addressId
      }
    }
  }, function (err, doc) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message
      })
    } else {
      res.json({
        status: "0",
        msg: '',
        result: 'sucess'
      })
    }
  });
});
// 添加地址
router.post("/addAddress", function (req, res, next) {
  var userId = req.cookies.userId;
  let params = {
    "addressId": req.body.addressId,
    "userName": req.body.userName,
    "streetName": req.body.streetName,
    "postCode": req.body.postCode,
    "tel": req.body.tel,
    "isDefault": false
  };
  User.findOne({userId: userId}, function (err, userDoc) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message
      })
    } else {
      if (userDoc) {
        userDoc.addressList.push(params);
        userDoc.save(function (err2, doc2) {
          if (err2) {
            res.json({
              status: "1",
              msg: err2.message
            })
          } else {
            res.json({
              status: '0',
              msg: '',
              result: 'suc'
            })
          }
        })
      }
    }
  })
});


// 生成订单
router.post('/addOrder', function (req, res, next) {
  let userId = req.cookies.userId;
  let addressId = req.body.addressId;
  let orderTotal = req.body.orderTotal;
  User.findOne({userId: userId}, function (err, useDoc) {

    if (err) {
      res.json({
        status: 1,
        msg: err.message
      })
    } else {
      let address = {};
      let goodsList = [];
      let checkedCartIdList = [];
      //  获取当前订单地址
      useDoc.addressList.forEach((item) => {
        if (item.addressId === addressId) {
          address = item;
        }
      });
      //  获取当前购买商品
      useDoc.cartList.forEach((item) => {
        if (item.checked === '1') {
          goodsList.push(item);
          checkedCartIdList.push(item.productId);
        }
      });
      let platform = '622';
      var r1 = Math.floor(Math.random() * 10);
      var r2 = Math.floor(Math.random() * 10);
      var sysDate = new Date().Format('yyyyMMddhhmmss');
      var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
      var orderId = platform + r1 + sysDate + r2;

      let order = {
        orderId: orderId,
        orderTotal: orderTotal,
        addressInfo: address,
        goodsList: goodsList,
        orderStatus: '1',
        createDate: createDate
      };

      useDoc.orderList.push(order);
      useDoc.save(function (err1, doc1) {
        if (err1) {
          res.json({
            status: '1',
            msg: err1.message
          })
        } else {
          useDoc.update({
            $pull: {
              'cartList': {
                'productId': {$in: checkedCartIdList}
              }
            }
          }, function (err2, doc2) {
            if (err2) {
              res.json({
                status: '1',
                msg: err2.message
              })
            } else {
              res.json({
                status: '0',
                msg: '',
                result: {
                  orderId: order.orderId,
                  orderTotal: order.orderTotal
                }
              })
            }
          });
        }
      })
    }
  })
});
// 根据订单ID查询详细信息
router.get('/getOrderDetail', function (req, res, next) {
  let userId = req.cookies.userId;
  let orderId = req.param('orderId');
  User.findOne({userId: userId}, function (err, userInfo) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      let orderList = userInfo.orderList;
      let total = 0;
      let currentItem = {};
      if (orderList.length > 0) {
        orderList.forEach(function (item) {
          if (item.orderId === orderId) {
            total = item.orderTotal;
            currentItem = item;
          }
        });
        if (total > 0) {
          res.json({
            status: '0',
            msg: '',
            result: {
              currentOrder: currentItem
            }
          })
        }else{
          res.json({
            status: '1',
            msg: '无此订单'
          })
        }
      } else {
        res.json({
          status: '1',
          msg: '无订单'
        })
      }
    }
  })

})


module.exports = router;
