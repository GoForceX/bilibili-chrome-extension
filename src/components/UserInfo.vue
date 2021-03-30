<template>
  <div class="main">
    <div align="center">
      <div class="avatar-container">
        <img :src="faceUrl" id="avatar" />
        <div :class="userType" class="user-type" id="user-type"></div>
      </div>
    </div>
    <div align="center">
      <span id="username" :style="nameStyle" class="username">{{
        username
      }}</span>
      <span id="vip-sign" :style="vipStyle" class="vip-sign">{{ vip }}</span>
    </div>
    <div style="margin-bottom: 4px">
      <div class="container">
        <span class="level-left" id="level"> Level {{ level }} </span>
        <span class="level-right" id="exp"> {{ expNow }} / {{ expNext }} </span>
      </div>
      <div class="center-align">
        <div class="expbar">
          <div class="expbar-fill" id="expbar-fill" :style="expbarStyle"></div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="left center-align">
        <span class="key center-align">{{ followI18n }}</span>
        <div>
          <span class="value center-align" id="follow">{{ follow }}</span>
        </div>
      </div>
      <div class="center center-align">
        <span class="key center-align">{{ followerI18n }}</span>
        <div>
          <span class="value center-align" id="follower">{{ follower }}</span>
        </div>
      </div>
      <div class="right center-align">
        <span class="key center-align">{{ dynamicI18n }}</span>
        <div>
          <span class="value center-align" id="dynamic">{{ dynamic }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserInfo",
  data() {
    return {
      username: "-",
      vip: "",
      level: "-",
      expNow: "-",
      expNext: "-",
      followI18n: chrome.i18n.getMessage("follow"),
      follow: "-",
      followerI18n: chrome.i18n.getMessage("follower"),
      follower: "-",
      dynamicI18n: chrome.i18n.getMessage("dynamic"),
      dynamic: "-",
      faceUrl: require("../assets/noface.jpg"),
      userType: {
        "personal-auth": false,
        "organization-auth": false,
        "vip-auth": false,
      },
      vipStyle: {
        display: "none",
      },
      nameStyle: {
        color: "#000000",
      },
      expbarStyle: {
        width: "0%",
      },
    };
  },
  asyncComputed: {
    setInfo: {
      get() {
        axios({
          method: "get",
          url: "https://api.bilibili.com/x/space/myinfo",
        })
          .then((res) => {
            var response = res.data;
            if (response.code != 0) {
              this.$router.push("/error");
            }
            var data = response.data;
            this.level = data.level_exp.current_level;
            this.expNow = data.level_exp.current_exp;
            this.expNext = data.level_exp.next_exp;
            this.expbarStyle.width =
              (data.level_exp.current_exp / data.level_exp.next_exp) * 100 +
              "%";
            var mid = data.mid;
            axios({
              method: "get",
              url: "https://api.bilibili.com/x/web-interface/nav/stat",
            })
              .then((resp) => {
                resp = resp.data;
                this.follow = resp.data.following;
                this.follower = resp.data.follower;
                this.dynamic = resp.data.dynamic_count;
              })
              .catch(function (error) {
                console.log(error);
              });
            this.faceUrl = data.face.replace("http", "https");
            if (data.official.role == 1 || data.official.role == 2) {
              this.userType["personal-auth"] = true;
            } else if (data.official.role >= 3 && data.official.role <= 6) {
              this.userType["organization-auth"] = true;
            } else if (data.vip.status == 1) {
              this.userType["vip-auth"] = true;
            }
            if (data.vip.status == 1) {
              this.nameStyle.color = "#fb7299";
              this.vipStyle.display = "inline-block";
              this.vip = data.vip.label.text;
            }
            this.username = data.name;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
}

.left {
  margin-left: 5px;
  padding: 0;
  width: 100px;
}

.right {
  margin-right: 5px;
  padding: 0;
  width: 100px;
}

.center {
  margin: 0, 5px;
  padding: 0;
  flex: 1;
}

.key {
  font-size: 12px;
  font-weight: 100;
}

.value {
  font-size: 16px;
  font-weight: 600;
}

.center-align {
  text-align: center;
}

.expbar {
  background-color: #f0f0f0;
  width: 300px;
  height: 2px;
  margin: 0 auto;
}

.expbar-fill {
  background-color: #f1e313;
  height: 2px;
  margin: 0 auto 0 0;
}

.level-left {
  margin-left: 10px;
  width: 150px;
  font-weight: 800;
}

.level-right {
  margin-right: 10px;
  width: 150px;
  font-weight: 800;
  text-align: right;
}

#avatar {
  background: #fff;
  width: 80px;
  height: 80px;
  border-radius: 60px;
}

.avatar-container {
  width: 80px;
  position: relative;
}

.user-type {
  transform: scale(0.6);
  position: absolute;
  display: none;
  right: -8px;
  top: 50px;
  width: 40px;
  height: 40px;
  background-image: url(../assets/user-auth.png);
}

.user-type.personal-auth {
  display: block;
  background-position: -76px -106px;
}

.user-type.organization-auth {
  display: block;
  background-position: -8px -106px;
}

.user-type.vip-auth {
  display: block;
  background-position: -144px -106px;
}

.username {
  margin-right: 5px;
  font-weight: 700;
  line-height: 18px;
  font-size: 18px;
  vertical-align: middle;
  color: #fff;
}

.vip-sign {
  background-color: #f45a8d;
  vertical-align: middle;
  height: 16px;
  border-radius: 4px;
  line-height: 16px;
  font-size: 12px;
  color: #fff;
  padding: 0 5px;
  display: none;
}
</style>
