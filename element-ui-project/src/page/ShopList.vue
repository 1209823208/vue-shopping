<template>
  <div class="shop-message">
    <el-table
      :data="shopListData"
      @expand-change="expandChangeEvent"
      :expand-row-keys='expendRow'
      :row-key="row => row.index"
      ref="singleTable"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="店铺名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="店铺介绍">
              <span>{{ props.row.description }}</span>
            </el-form-item>
            <el-form-item label="店铺ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="联系电话">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="评分">
              <span>{{ props.row.rating }}</span>
            </el-form-item>
            <el-form-item label="销售量">
              <span>{{ props.row.recent_order_num }}</span>
            </el-form-item>
            <el-form-item label="分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column
        label="店铺名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="店铺地址"
        prop="address">
      </el-table-column>
      <el-table-column
        label="店铺介绍"
        prop="description">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">edit
          </el-button>
          <el-button
            size="mini"
            @click="handleAdd(scope.$index, scope.row)">add
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">del
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin-top: 20px;">
      <el-pagination
        background
        @size-change="sizeChangeEvent"
        @current-change="currentChangeEvent"
        :current-page.sync="currentPage"
        :page-size="10"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next"
        :total="countNum">
      </el-pagination>
    </div>

    <!--edit-->
    <el-dialog title="店铺名称" :visible.sync="dialogFormVisible">
      <el-form :model="selectTable">
        <el-form-item label="店铺名称" :label-width="formLabelWidth">
          <el-input v-model="selectTable.name"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-autocomplete
            v-model="selectTable.address"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete>
          <span>当前城市:{{city.name}}</span>
        </el-form-item>
        <el-form-item label="店铺介绍" :label-width="formLabelWidth">
          <el-input v-model="selectTable.description"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="selectTable.phone"></el-input>
        </el-form-item>
        <el-form-item label="店铺分类" :label-width="formLabelWidth">
          <el-cascader
            :options="categoryOptions"
            v-model="selectedOptions"
            change-on-select>
          </el-cascader>
        </el-form-item>

        <el-form-item label="商品图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="baseUrl + '/v1/addimg/shop'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="selectTable.image_path" :scr="baseImgPath+selectTable.image_path" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateShop">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    cityGuess,
    getResturants,
    getResturantsCount,
    foodCategory,
    updateResturant,
    searchplace,
    deleteResturant,
    getResturantDetail,
    getMenuById
  } from '@/api/getData'
  import {baseUrl, baseImgPath} from '@/config/env'

  export default {
    data() {
      return {
        shopListData: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987123',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987125',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987126',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }],
        city: [],
        count: 0,
        offset: 0,
        limit: 10,
        currentPage: 1,
        countNum: 0,
        dialogFormVisible: false,
        selectTable: {},
        formLabelWidth: '120px',
        selectedOptions: [],
        categoryOptions: [],
        baseImgPath,
        baseUrl,
        expendRow: []
      }
    },
    methods: {
      async initData() {
        try {
          this.city = await cityGuess();
          console.log('this.city', this.city);
          const countData = await getResturantsCount();
          console.log('countData', countData);
          if (countData.status == 1) {
            this.countNum = countData.count;
          } else {
            throw new Error('获取数据失败');
          }
          this.getResturants();
        } catch (err) {
          console.log('获取数据失败', err);
        }
      },
      async getResturants() {
        try {
          const {latitude, longitude} = this.city;
          this.shopListData = [];
          const resturants = await getResturants({latitude, longitude, offset: this.offset, limit: this.limit});
          resturants.forEach(item => {
            let shopitem = {};
            shopitem.id = item.id;
            shopitem.name = item.name;
            shopitem.address = item.address;
            shopitem.description = item.description;
            shopitem.phone = item.phone;
            shopitem.rating = item.rating;
            shopitem.recent_order_num = item.recent_order_num;
            shopitem.image_path = item.image_path;
            shopitem.category = item.category;
            this.shopListData.push(shopitem);
          })
          console.log('this.shopListData', this.shopListData);
        } catch (err) {
          console.log('获取店铺失败', err);
        }
      },
      sizeChangeEvent(val) {
        this.limit = val;
        this.getResturants();
      },
      currentChangeEvent(val) {
        this.offset = (val - 1) * this.limit;
        this.getResturants();
      },
      handleEdit(index, row) {
        this.dialogFormVisible = true;
        this.selectTable = row;
        console.log('row', row);
        this.selectedOptions = row.category.split('/');
        console.log('selectedOptions', this.selectedOptions);
        if (!this.categoryOptions.length) {
          this.getCategory();
        }
      },
      handleAdd(index, row) {

      },
      async handleDelete(index, row) {
        try {
          const res = await deleteResturant(row.id);
          if (res.status == 1) {
            this.$message({
              type: 'success',
              message: 'del faild'
            })
            this.tableData.splice(index, 1);
          }
        } catch (err) {
          this.$message({
            type: 'error',
            message: err.message
          })
        }
      },
      async updateShop() {
        this.dialogFormVisible = false;
        try {
          this.selectTable.category = this.selectedOptions.join('/');
          const res = await updateResturant(this.selectTable);
          if (res.status == 1) {
            this.$message({
              type: 'success',
              message: 'sucess'
            })
          } else {
            this.$message({
              type: 'err',
              message: res.message
            })
          }
        } catch (err) {
          console.log('update falid', err);
        }
      },
      async getCategory() {
        const categories = await foodCategory();
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
      handleChangeOnCategory(val) {

      },
      handleAvatarSuccess(res, file) {
        if (res.status == 1) {
          this.selectTable.img_path = res.img_path;
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
      handleSelect(item) {
        console.log(item);
      },
      async querySearchAsync(queryString, cb) {
        if (queryString) {
          try {
            const cityList = await searchplace(this.city.id, queryString);
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
      expandChangeEvent(row, expandedRows) {
        console.log('row', row);
        console.log('expandedRows', expandedRows);
        console.log('this.$refs.singleTable', this.$refs.singleTable); //获取当前表 dom

        //:expand-row-keys='expendRow'
        //:row-key="row => row.index"   这两行是为了  记录当前展开的行
        if (expandedRows.length === 0) {
          const index = this.expendRow.indexOf(row.index);
          this.expendRow.splice(index, 1)
        } else {
//          this.getSelectItemData(row)
        }
      },
      async getSelectItemData(row) {
        console.log('333');

        const restaurant = await getResturantDetail(row.restaurant_id);
        const category = await getMenuById(row.category_id)
        this.selectTable = {
          ...row, ...{
            restaurant_name: restaurant.name,
            restaurant_address: restaurant.address,
            category_name: category.name
          }
        };
        this.tableData.splice(row.index, 1, {...this.selectTable});  // 由于更新这一行 所以用splice先删除再更新
        this.$nextTick(() => {                // 更新数据后立即操作dom
          this.expendRow.push(row.index);
        })
      },
    },
    mounted() {
      this.initData()
    }
  }
</script>
<style scoped>
  .shop-message {
    margin: 20px;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
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
</style>
