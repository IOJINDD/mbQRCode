<template>
  <div>
    <mt-header :title="title">
      <mt-button icon="more" slot="right" @click.native="openAction"></mt-button>
    </mt-header>
    <div>
      <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
      <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
    </div>
    <mt-actionsheet :actions="actions"
                    v-model="sheetVisible">

    </mt-actionsheet>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        title: '',
        actions: [],
        sheetVisible: false
      }
    },
    methods: {
      openAction () {
        this.sheetVisible = true
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.title = "二维码激活"
        vm.actions = [{
          name: '个人中心',
          method: function () {
            window.location = 'http://www.baidu.com'
          }
        }]
      })
    }
  }
</script>
