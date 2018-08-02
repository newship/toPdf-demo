<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Life was like a box of chocolates. You never know what you're gonna get.<br>
      have a try
      <a href="https://mall.jd.com/index-1000078502.html" target="_blank">buy one for your girl</a>.
    </p>
    <el-upload
      class="upload-demo"
      drag
      action="http://localhost:5050/upload/"
      :before-upload="beforeFileUpload"
      :on-success="handleFileSuccess"
      :on-change="handleFileChange"
      :limit=1
      >
      <!-- <i class="el-icon-upload"></i> -->
      <!-- <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div> -->
      <i class="el-icon-download"></i> 
      <div class="el-upload__text">下载pdf文件，或<em>重新上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传doc/docx文件，且不超过5MB</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
      handleFileSuccess(res, file) {
        console.log("success");
      },
      beforeFileUpload(file) {
        console.log(file)
        const isWORD = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
         || file.type === 'application/msword';
        const isLt2M = file.size / 1024 / 1024 < 10;

        if (!isWORD) {
          this.$message.error('上传文件只能是 DOC 格式或者 DOCX 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传文件大小不能超过 2MB!');
        }
        return isWORD && isLt2M;
      },
      handleFileChange(file) {
        console.log("3",file);
        if(file.response){
          if(file.response.status==='1'){
            console.log("3",file.response.path);
          }else {
            console.log("转换失败");
          }
          
        }
      }

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.el-icon-download {
  font-size: 67px;
  color: #c0c4cc;
  margin: 40px 0 16px;
  line-height: 50px;
}
</style>
