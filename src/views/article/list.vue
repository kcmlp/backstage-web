<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">创建用户</el-button> -->
      <add-user 
        @test1="testdemo" 
      />
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column 
        :label="'昵称'" 
        align="center" 
        width="800">
        <template slot-scope="scope">
          {{ scope.row.nickName }}
        </template>
      </el-table-column>
      <el-table-column 
        label="手机号" 
        align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column 
        label="头像" 
        align="center" 
        width="160">
        <template slot-scope="scope">
          <img 
            :src="scope.row.photoUrl" 
            height="100">
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" prop="created_at" label="创建时间" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.ca }}</span>
        </template>
      </el-table-column> -->
      <el-table-column 
        label="操作" 
        align="center" 
        width="150" 
        class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- <el-button type="primary" size="mini" @click="handlePreview(scope.row)"> 预览 </el-button> -->
          <!-- <el-button type="danger" size="mini" @click="handleDelete(scope.row)"> 删除 </el-button> -->
          <el-button 
            type="primary" 
            size="mini" 
            @click="handleUpData(scope.row.uid,scope.row.photoKey,scope.row.nickName,scope.row.mobile)"> 更新 </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination 
      v-show="total>0" 
      :total="total" 
      :page.sync="listQuery.page" 
      :limit.sync="listQuery.limit" 
      @pagination="fetchArticleData" />  
      <!-- <el-dialog :visible.sync="dialogPreviewVisible" :title="previewArticle.title" class="previewDialog" width="600px">
      <div>
        <div class="previewContent" v-html="content" />
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
// import { getArticleList, getArticleView, deleteArticle } from '@/api/article'
// import { getArticleList, updateAddArticle } from '@/api/article'
import { getArticleList } from '@/api/article'
import addUser from './add'
// import { getUserBasicInfo } from '@/api/login'
import { getOssUrl } from '@/utils/index'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
// import { Message, MessageBox } from 'element-ui'

export default {
  components: { Pagination, addUser },
  data() {
    return {
      userInfo: {},
      list: null,
      listLoading: true,
      // dialogPreviewVisible: false,
      previewArticle: {},
      content: '',
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    this.fetchArticleData()
  },
  // http://images.isouth.com/oss-cn-shenzhen.aliyuncs.com,isouth-medium,w2367068450_1545134030264
  // https://undefined.undefined/oss-cn-shenzhen.aliyuncs.com,isouth-medium,w1_1545156615506
  // https://isouth-medium.oss-cn-shenzhen.aliyuncs.com/w1_1545156615506 limit
   methods: { 
    // 接受子组件的值
    testdemo(val) {
      this.fetchArticleData(val.mobile) 
    },
    async fetchArticleData(mobile) {
        if(!mobile || typeof mobile == 'object'){
           mobile = ''
        }
      this.listLoading = true
      await getArticleList(this.listQuery.page - 1,mobile).then(response => {
        this.list = response.datas.list.filter(function(article) {
          article.photoUrl = getOssUrl(article.photoUrl)
          // https://isouth-medium.oss-cn-shenzhen.aliyuncs.com/
          article.photoKey = article.photoUrl.split('https://isouth-medium.oss-cn-shenzhen.aliyuncs.com/')[1].split('?x-oss-process=style/avatar-large')[0]
          // console.log('article.photoUrl', )
          return true
        })
        this.total = response.datas.count
        this.listLoading = false
      })
      // console.log('this.listQuery.limit', this.listQuery.limit)
    },
    // handleCreate() {
    //   this.$router.push({ path: '/article/add' })
    // },
    handleUpData(uid, photoUrl, nickName, mobile) {
      this.$router.push({ path: '/updataModelWindow', query: { uid: uid, photoUrl: photoUrl, nickName: nickName, mobile: mobile }})
    }
    // handleUpData(uid, photoUrl, nickName) {
    //   console.log(uid, photoUrl, nickName)
    //   const params = {}
    //   params.uid = uid
    //   params.photoUrl = photoUrl
    //   params.nickName = nickName
    //   updateAddArticle(params).then(response => {
    //     console.log('更新', response)
    //   })
    // }
    // handleDelete(row) {
    //   MessageBox.confirm(
    //     '是否删除',
    //     '提示',
    //     {
    //       confirmButtonText: '确认',
    //       cancelButtonText: '取消'
    //     }
    //   ).then(() => {
    //     deleteArticle(row.artKey).then(() => {
    //       for (let i = 0; i < this.list.length; i++) {
    //         if (this.list[i].artKey === row.artKey) {
    //           this.list.splice(i, 1)
    //           break
    //         }
    //       }
    //       Message({
    //         message: '删除用户成功',
    //         type: 'success',
    //         duration: 5 * 1000
    //       })
    //     })
    //   })
    // }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .previewContent p {
    width: 100%;
    word-break: break-all;
    word-wrap: break-word;
  }

  .previewContent img {
    width: 100%;
  }
</style>
