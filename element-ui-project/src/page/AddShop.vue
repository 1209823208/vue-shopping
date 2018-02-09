<template>
  <div class="add-shop-message">
    <el-form ref="formData" :model="formData" :rules="rules" label-width="100px">
      <el-form-item label="店铺名称" prop="name">
        <el-input v-model="formData.name" class="inputWidth"></el-input>
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-autocomplete
          v-model="formData.address"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          @select="handleSelect"
        ></el-autocomplete>
        <span>当前城市:{{city.name}}</span>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="formData.phone" class="inputWidth"></el-input>
      </el-form-item>
      <el-form-item label="店铺介绍">
        <el-input v-model="formData.description" class="inputWidth"></el-input>
      </el-form-item>
      <el-form-item label="店铺标语">
        <el-input v-model="formData.promotion_info" class="inputWidth"></el-input>
      </el-form-item>
      <el-form-item label="店铺分类">
        <el-cascader
          :options="categoryOptions"
          v-model="selectedOptions"
          change-on-select>
        </el-cascader>
      </el-form-item>
      <el-form-item label="店铺特点">
        <span>品牌保证</span>
        <el-switch v-model="formData.is_premium"></el-switch>
        <span>蜂鸟专送</span>
        <el-switch v-model="formData.delivery_mode"></el-switch>
        <span>新开店铺</span>
        <el-switch v-model="formData.new"></el-switch>
        <span>外卖保</span>
        <el-switch v-model="formData.bao"></el-switch>
        <span>准时达</span>
        <el-switch v-model="formData.zhun"></el-switch>
        <span>开发票</span>
        <el-switch v-model="formData.piao"></el-switch>
      </el-form-item>
      <el-form-item label="配送费">
        <el-input-number v-model="formData.float_delivery_fee" @change="handleChangeNum" :min="0" :max="20"
                         label="描述文字">

        </el-input-number>

      </el-form-item>
      <el-form-item label="起送价">
        <el-input-number v-model="formData.float_minimum_order_amount" @change="handleChangePrice" :min="0" :max="100"
                         label="描述文字">

        </el-input-number>

      </el-form-item>

      <el-form-item label="营业时间">
        <el-col :span="5">
          <el-date-picker type="date" placeholder="起始时间"
                          v-model="formData.startTime"
                          :picker-options="{
                          start: '05:30',
                          step: '00:15',
                          end: '23:30'
                          }">
          </el-date-picker>
        </el-col>
        <el-col class="line" :span="2" style="text-align: center">-</el-col>
        <el-col :span="5">
          <el-time-picker type="fixed-time" placeholder="结束时间"
                          v-model="formData.endTime"
                          :picker-options="{
                            start: '05:30',
                            step: '00:15',
                            end: '23:30',
                            minTime: formData.startTime
                            }">
          </el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="商品图片">
        <el-upload
          class="avatar-uploader"
          action="baseUrl + '/v1/addimg/shop'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="formData.image_path" :scr="baseImgPath+selectTable.image_path" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="优惠活动">
        <el-select v-model="activityValue" @change="selectActivity" :placeholder="activityValue">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-table
        :data="activities"
        style="min-width: 600px;margin-bottom: 20px;"
        :row-class-name="tableRowClassName"
        align="cneter">
        <el-table-column
          prop="icon_name"
          label="活动标题"
          align="cneter"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="活动名称"
          align="cneter"
          width="120">
        </el-table-column>
        <el-table-column
          prop="description"
          align="cneter"
          label="活动详情">
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
          <template scope="scope">
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formData')">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    searchplace,
    cityGuess,
    foodCategory,
    addShop
  } from '@/api/getData'
  import {baseUrl, baseImgPath} from '@/config/env'

  export default {
    data() {
      return {
        formData: {
          name: '', //店铺名称
          address: '', //地址
          latitude: '',
          longitude: '',
          description: '', //介绍
          phone: '',
          promotion_info: '',
          float_delivery_fee: 5, //运费
          float_minimum_order_amount: 20, //起价
          is_premium: true,
          delivery_mode: true,
          new: true,
          bao: true,
          zhun: true,
          piao: true,
          startTime: '',
          endTime: '',
          image_path: '',
          business_license_image: '',
          catering_service_license_image: '',
        },
        rules: {
          name: [
            {required: true, message: '请输入店铺名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '详细地址', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入tel', trigger: 'blur'},
            {len: 11, message: '长度11', trigger: 'blur'}
          ],
          date1: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ],
          date2: [
            {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
          ]
        },
        options: [{
          value: '满减优惠',
          label: '满减优惠'
        }, {
          value: '优惠大酬宾',
          label: '优惠大酬宾'
        }, {
          value: '新用户立减',
          label: '新用户立减'
        }, {
          value: '进店领券',
          label: '进店领券'
        }],
        activityValue: '满减优惠',
        activities: [{
          icon_name: '减',
          name: '满减优惠',
          description: '满30减5，满60减8',
        }],
        city: {},
        selectedOptions: [],
        categoryOptions: [],
      }
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      async initData() {
        try {
          this.city = await
            cityGuess();
          console.log('this.city', this.city);
        } catch (err) {
          console.log('获取数据失败', err);
        }
      },
      async querySearchAsync(queryString, cb) {
        if (queryString) {
          try {
            const cityList = await
              searchplace(this.city.id, queryString);
            if (cityList instanceof Array) {
              cityList.map(item => {
                item.value = item.address;
                return item;
              })
              cb(cityList)
            }

          } catch (err) {

          }
        }

      },
      async getCategory() {
        const categories = await
          foodCategory();
        categories.forEach(item => {
          let categoryItem = {};
          categoryItem.value = item.id;
          categoryItem.label = item.name;
          categoryItem.children = [];
          if (item.sub_categories.length) {
            item.sub_categories.forEach(sub_item => {
              categoryItem.children.push({
                value: sub_item.id,
                label: sub_item.name
              })
            })
          }
          this.categoryOptions.push(categoryItem);
        })
        console.log('this.categoryOptions', this.categoryOptions);
      },
      handleSelect(address) {
        console.log('详细地址', address);
        this.formData.latitude = address.latitude;
        this.formData.longitude = address.longitude;
      },
      handleChangeNum(val) {
        console.log('配送费', val);
      },
      handleChangePrice(val) {
        console.log('配送价', val);
      },
      handleAvatarSuccess(res, file) {
        if (res.status == 1) {
          console.log('res', res);
        } else {
          this.$message.error('上传失败!');

        }
      },
      beforeAvatarUpload(file) {
        const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png');
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      selectActivity() {
        this.$prompt('请输入活动详情', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then((inputArr) => {
          const value = inputArr.value;
          if (value == null) {
            this.$message({
              type: 'info',
              meaasge: 'not null'
            })
            return;
          }
          let newObj = {};
          switch (this.activityValue) {
            case '满减优惠':
              newObj = {
                icon_name: '满',
                name: '满减优惠',
                description: value
              }
              break;
            case '优惠大酬宾':
              newObj = {
                icon_name: '优',
                name: '优惠大酬宾',
                description: value
              }
              break;
            case '新用户立减':
              newObj = {
                icon_name: '新',
                name: '新用户立减',
                description: value
              }
              break;
            case '进店领券':
              newObj = {
                icon_name: '进',
                name: '进店领券',
                description: value
              }
              break;
          }
          this.activities.push(newObj);
          console.log('this.activities', this.activities);
        }).catch(() => {
          this.$message({
            type: 'info',
            meaasge: 'dancel'
          })
        })
      },
      handleDelete(index) {
        this.activities.splice(index, 1);
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            Object.assign(this.formData, {activities: this.activities}, {
              category: this.selectedOptions.join('/')
            })
            console.log('this.formData', this.formData);
            try {
              let result = await addShop(this.formData);
              if (result.status == 1) {
                this.$message({
                  type: 'success',
                  message: '添加成功'
                });
                // 重置数据
                this.formData = {
                  name: '', //店铺名称
                  address: '', //地址
                  latitude: '',
                  longitude: '',
                  description: '', //介绍
                  phone: '',
                  promotion_info: '',
                  float_delivery_fee: 5, //运费
                  float_minimum_order_amount: 20, //起价
                  is_premium: true,
                  delivery_mode: true,
                  new: true,
                  bao: true,
                  zhun: true,
                  piao: true,
                  startTime: '',
                  endTime: '',
                  image_path: '',
                  business_license_image: '',
                  catering_service_license_image: '',
                };
                this.selectedCategory = ['快餐便当', '简餐'];
                this.activities = [{
                  icon_name: '减',
                  name: '满减优惠',
                  description: '满30减5，满60减8',
                }];
              } else {
                this.$message({
                  type: 'error',
                  message: result.message
                });
              }
              console.log(result)
            } catch (err) {
              console.log(err)
            }
          } else {
            this.$notify.error({
              title: '错误',
              message: '请检查输入是否正确',
              offset: 100
            });
            return false;
          }
        });
      },
    }
    ,
    created() {
      this.initData();
      this.getCategory();
    }
  }
</script>
<style scoped>
  .add-shop-message {
    width: 70%;
    margin: 30px auto;
    border: 1px solid #ebebeb;
    padding: 30px;
    border-radius: 3px;
    transition: .2s;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .inputWidth {
    width: 500px;
  }

  .el-table .warning-row {
    background: oldlace !important;
  }

  .el-table .success-row {
    background: #f0f9eb !important;
  }
</style>
