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
      :on-progress="handleFileProgress"
      :on-success="handleFileSuccess"
      :on-error="handleFileError"
      :limit=1
      v-if="seen">
      <i class="el-icon-upload" v-if="loading=='none'"></i>
      <i class="el-icon-loading" v-if="loading=='upload'"></i>
      <img src="../assets/text-animation-1s-280x100px.gif" v-if="loading=='transfer'">
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传doc/docx文件，且不超过5MB</div>
    </el-upload>
    <div class="download-box" v-else>
      <div class="download-box-file">
        <i class="el-icon-download"></i>
        <div class="download__text"><a v-bind:href="['http://localhost:5050/download?file='+name]" download='filename'>下载pdf文件</a>，或<em @click="toUp">重新上传</em></div> 
        <!-- <div class="download__text"><a href='../../server/files/logo.png' download=''>下载pdf文件</a>，或<em @click="toUp">重新上传</em></div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToPdf',
  props: {
    msg: String
  },
  data() {
    return {
      seen: true,
      loading: 'none',
      name: 'test.pdf'
    }
  },
  methods: {
      handleFileProgress(event) {
        this.loading='upload';
        if(event.percent===100){
          this.loading='transfer';
        }
      },
      handleFileSuccess(res,file) {
        this.loading='none';
        this.seen=false;
        this.name=res.file;
        console.log("success",res.file,file);
        this.$message.success('您的文件已转换成功！');
      },
      handleFileError(err) {
        this.loading='none';
        console.log("error",err);
        this.$message.error('发生了一个不可描述的错误！');
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
      // handleFileChange(file) {
      //   console.log("3",file);
      //   if(file.response){
      //     if(file.response.status==='1'){
      //       console.log("3",file.response.path);
      //       this.seen=false;
      //     }else {
      //       console.log("转换失败");
      //     }
      //   }
      // },
      toUp() {
        let self = this;
        self.seen = true;
      },
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
.el-icon-download,.el-icon-loading{
  font-size: 67px;
  color: #c0c4cc;
  margin: 40px 0 16px;
  line-height: 50px;
}
.download-box {
  display: inline-block;
  cursor: pointer;
  outline: 0;
}
.download-box-file {
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 360px;
  height: 180px;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.download__text {
  color: #606266;
  font-size: 14px;
  text-align: center;
}
.download__text em {
  color: #409EFF;
  font-style: normal;
}
</style>
