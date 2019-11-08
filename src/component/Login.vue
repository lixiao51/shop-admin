<template>
    <!-- el-form:表单组件
       1 ：model必须提供一个对象，作用收集表单数据
       2 label-width设置标签宽度
       3 el-form-item:表单项
       4 el-elementui的组件有一个特点，组件最终渲染都会给这个元素一个类名
       5给form提供一个ref属性，通过ref获取到form组件，调用 this.$refs.form.resetFields()重置表单
     -->
  <div class="login">
    <el-form :model="form" :rules="rules" label-width="80px"  ref="form" >
    <img src="../assets/avatar.jpg" alt="">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="form.password" placeholder="请输入密码"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="login">登录</el-button>
    <el-button @click="reset">取消</el-button>
  </el-form-item>
</el-form>

  </div>
</template>

<script>
// 引入axios
import axios from 'axios'
export default {
  data () {
    return {
      // 获取输入框内容
      form: {
        username: '',
        password: ''
      },
      // 输入框表单校验
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 请求数据表单较验，这里必须使用箭头函数，否则this指向window
      this.$refs.form.validate((valid) => {
        if (!valid) return false
        axios({
          method: 'post',
          url: `http://localhost:8888/api/private/v1/login`,
          data: this.form
        }).then(res => {
          console.log(res)
          const { meta, data } = res.data

          if (meta.status === 200) {
            console.log(this)
            // 把token存入localStorage
            localStorage.setItem('token', data.token)
            // 跳转到home组件
            this.$router.push('/home')
            // 登录成功信息提示
            this.$message.success('登录成功')
          } else {
            // 登录失败信息提示
            this.$message.error(meta.msg)
          }
        })
      })
    },
    // 重置表单
    reset () {
      console.log(11111)
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
  @color: #2d434c;
  .login {
    background-color: @color;
    height: 100%;
    overflow: hidden;
    .el-form {
      background-color: #fff;
      width: 400px;
      margin: 200px auto;
      padding: 75px 40px 15px;
      border-radius: 20px;

        img {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 100px;
          border-radius: 50%;
          border: 10px solid #fff
        }
        .el-button:last-child {
          margin-left: 80px;
        }
    }
  }
</style>
