<template>
   <el-container class="home">
    <el-header>
      <div class="logo">

      </div>
      <div class="title">
        <h1>电商后台管理系统</h1>
      </div>
      <div class="out">
        欢迎你，***<a href="javascript:;" @click="logout">退出</a>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <!--
           el-menu:是整个菜单
           el-submenu:是子菜单
           需要通过template来指定文字和图片
           el-menu-item-group:对菜单项进行分组
           el-menu-item:一个菜单项
           router:会开户导航模式，点击会跳转index
        -->
         <el-menu
      :default-active="$route.path.slice(1)"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened
      router>
      <el-submenu :index="menu.path" v-for="menu in menuList" :key="menu.id">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{menu.authName}}</span>
        </template>
          <el-menu-item :index="submenu.path" v-for="submenu in menu.children" :key="submenu.id">
        <i class="el-icon-menu"></i>
        <span slot="title">{{submenu.authName}}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      menuList: []
    }
  },
  // 在created钩子函数中发送请求
  created () {
    axios({
      method: 'get',
      url: 'http://localhost:8888/api/private/v1/menus',
      // 设置请求头,发送请求的时候必须带有token不然请求不到数据
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }).then(res => {
      // 解构res.data对象
      const { data, meta } = res.data
      // 判断如果请求成功把请求回的对象赋值给this.menuList
      if (meta.status === 200) {
        this.menuList = data
      }
    })
  },
  methods: {
    logout () {
      this.$confirm('你确定要退出吗？', '温馨提示', { type: 'warning' }).then(() => {
        localStorage.removeItem('token')
        this.$router.push('/login')
      }).catch(() => {
        this.$message.info('取消退出')
      })
    }
  }
}
</script>

<style lang="less" scoped>
// 给style设置样式的时候，推荐加一个属性：scoped
// 作用：保证当前组件样式，只会影响当前组件
// scoped属性会给当前组件所有元素添加一个自定义属性
.home {
  height: 100%;
  .el-header {
    background-color: #b3c1cd;
    padding-left: 0;
    display: flex;
    line-height: 60px;
    .logo,.out {
      width: 180px;
    }
    .title {
      flex: 1;
      text-align: center;
      color: #fff;
      h1 {
        padding: 0;
        margin: 0;
      }
    }
    .logo {
      background: url(../assets/logo.png)no-repeat center center/contain
    }
    .out {
      text-align: right;
    }
  }
  .el-aside {
    background-color: #545c64;
    .el-submenu {
      width: 200px;
    }
  }
  .el-main {
    background-color: #eaeef1;
  }
}
</style>
