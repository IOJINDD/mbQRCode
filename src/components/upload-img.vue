<template>
    <div id="upload-img">
      <div class='finish_room' :style="{width: screenWidth - 50 + 'px'}">
          <div class='finish_room2'>
              <div v-for='(item ,index ) in images' class='room_img' :style="{width: (screenWidth - 80) / 3 + 'px', heigth: (screenWidth - 80) / 3 + 'px'}" v-if="images">
                  <img :src="item">
                  <span @click='deleteImg(index)'><img :src="deleteImage"></span>
              </div>
              <div class='room_add_img' style="width: 30%">
                    <span><img :src="addImage"></span>
                    <span>上传图片</span>
                    <input @change='addImg' type="file" id="upload-input" accept="image/*" >
              </div>
          </div>
      </div>
      <img :src=scaleImg id="scaleImg" style="display: none"/>
    </div>
  </template>
  <script>
    import { MultipartFile } from 'services/service'
    import { getCheckCode } from 'tools/index'
    import addImage from 'assets/add_img.png'
    import { Toast } from 'mint-ui'
    import deleteImage from 'assets/delete.png'
    export default {
      data () {
        return {
          addImage,
          deleteImage,
          scaleImg: '', // 压缩图片路径
          imgType: '', // 上传图片的类型
          imgName: '', // 上传图片的名字
          images: [], // 私有图片路径
          screenWidth : window.screen.width
        }
      },
      methods: {
        // 删除图片
        deleteImg (item) {
          this.images.splice(item, 1)
          this.$emit('imgPaths', this.images)
        },
        // 添加图片
        addImg (event) {
          let reader = new FileReader()
          let img = event.target.files[0]
          this.imgType = img.type.split('/')[1]
          this.imgName = img.name
          console.log(img)
          let that = this
          reader.readAsDataURL(img)
          reader.onloadend = function (e) {

            // 新建一个image对象，用canvas绘制
            let image = new Image()
            image.src = e.target.result // 获得base64编码
            image.onload = function () {
              let expectWidth = this.naturalWidth // 获取原本图片的宽度
              let expectHeight = this.naturalHeight // 获取原本图片的高度

              // 利用canvas绘制图像
              let canvas = document.createElement('canvas')
              let ctx = canvas.getContext('2d')
              canvas.width = expectWidth
              canvas.height = expectHeight
              ctx.drawImage(this, 0, 0, canvas.width, canvas.height)
              let base64
              if (img.size > 153600) {
                base64 = canvas.toDataURL(img.type, 153600 / img.size)
              } else {
                base64 = canvas.toDataURL(img.type, 1)
              }
              that.scaleImg = base64
              // 把base64编码转file
              let a = that.getBlobBydataURI(that.scaleImg, that.imgType)
              let formData = new FormData()
              formData.append('image', a, that.imgName)
              MultipartFile.bind(that)(formData, 'note').then(res => {
                if (res.code === '200') {
                  that.images.push(res.dataBody)
                  that.$emit('imgPaths', that.images)
                } else {
                  Toast('解析失败')
                }
              })
            }
          }
        },
        // base64转码
        getBlobBydataURI (dataURI, type) {
          console.log(dataURI)
          let binary = atob(dataURI.split(',')[1])
          let array = []
          for (let i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i))
          }
          return new Blob([new Uint8Array(array)], {type: type})
        }
      }
    }
  </script>
  <style>
    #upload-img .finish_room {
      margin: auto;
    }
   #upload-img .finish_room2{
        width: 100%;
        padding-top: 15px;
        padding-bottom: 15px;
        display: flex;
        align-items: center;
       flex-wrap: wrap;
        border-bottom: 2px solid #e1e1e1;
     }
    #upload-img .finish_room2 .room_img{
        margin-right: 10px;
        position: relative;
        overflow: hidden;
        margin-top: 10px;
     }
    #upload-img .finish_room2 .room_img img{
        width: 100%;
        height: 100%;
     }
    #upload-img .finish_room2>.room_img span{
         position: absolute;
         width: auto;
         height: auto;
         right: 5px;
         bottom:3px;
     }
    #upload-img .room_add_img{
        border:1px solid #e1e1e1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        position: relative;
        margin-top: 10px;
     }
    #upload-img .room_add_img >span:nth-child(1){
      margin-top: 16px;
      margin-bottom: 10px;
      width: 30px;
      height: 30px;
     }
    #upload-img .room_add_img img {
      width: 100%
     }
    #upload-img .room_add_img >span:nth-child(2){
         margin-bottom: 10px;
     }
    #upload-img .room_add_img input{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        z-index: 1000;
        opacity: 0;
    }
  </style>
