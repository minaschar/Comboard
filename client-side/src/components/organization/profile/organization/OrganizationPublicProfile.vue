<template>
  <div>
    <organization-page-header><back-header-button></back-header-button></organization-page-header>
    <div v-if="organizationObj && !isLoading">
      <div class="header__wrapper">
        <div v-if="banner" class="profile-header">
          <img class="backgroundImage" :src="banner" alt="User Background Image" />
        </div>
        <div v-else class="profile-header">
          <img
            class="backgroundImage"
            src="https://img.freepik.com/free-photo/abstract-grunge-decorative-relief-navy-blue-stucco-wall-texture-wide-angle-rough-colored-background_1258-28311.jpg?w=2000"
            alt="User Background Image"
          />
        </div>
      </div>
      <div class="img__container">
        <img v-if="organizationImage" :src="organizationImage" alt="Organization Profile Pic" />
        <img v-else src="../../../../assets/images/common-images/default-organization-photo.png" alt="Organization Profile Pic" />
      </div>
      <div class="main-area">
        <div class="organization-data">
          <h2>{{ organizationObj.name }}</h2>
          <h3 v-if="organizationObj.email">{{ organizationObj.email }}</h3>
          <h3 v-if="organizationObj.location">{{ organizationObj.location }}</h3>
          <p v-if="organizationObj.description">{{ organizationObj.description }}</p>
          <base-button v-if="isModerator" class="edit-organization--btn" @click="goToOrganizationPrivateProfile()">Edit organization</base-button>
        </div>
        <div class="right__col">
          <div class="menu-ul">
            <router-link class="menu-link" to="/organization/my-organization/posts">Posts</router-link>
            <router-link class="menu-link" to="/organization/my-organization/members">Members</router-link>
            <router-link class="menu-link" to="/organization/my-organization/teams">Teams</router-link>
            <router-link class="menu-link" to="/organization/my-organization/projects">Projects</router-link>
          </div>
          <router-view class="dynamic-area"></router-view>
        </div>
        <news-list></news-list>
      </div>
    </div>
    <loading-spinner v-if="isLoading"></loading-spinner>
  </div>
</template>

<script>
import BaseButton from "../../../basic-components/BaseButton.vue";
import BackHeaderButton from "../../../layout/headers/BackHeaderButton.vue";
import OrganizationPageHeader from "../../../layout/headers/OrganizationPageHeader.vue";
import NewsList from "../../network/NewsList.vue";

export default {
  components: { OrganizationPageHeader, NewsList, BackHeaderButton, BaseButton },
  data() {
    return {
      organizationObj: null,
      members: [],
      team: [],
      projects: [],
      posts: [],
      isLoading: false,
      isModerator: false,
      banner: "",
      organizationImage: "",
    };
  },
  methods: {
    async loadOrganizationPublicData() {
      try {
        this.isLoading = true;

        this.organizationObj = await this.$store.dispatch("getOrganizationPublicData", {
          organizationID: this.$store.getters.selectedOrganizationID,
        });

        this.isModerator = this.organizationObj.creatorID === this.$store.getters.loggedUserID;

        this.isLoading = false;

        if (!this.organizationObj) {
          this.$router.push("/not-found");
        }
      } catch (error) {
        console.log(error.message || "Something went wrong!");
        this.$router.push("/not-found");
      }
    },
    goToOrganizationPrivateProfile() {
      this.$router.push("/organization/my-organization-private");
    },
    async takeOrganizationImage() {
      try {
        const blob = await this.$store.dispatch("takeOrganizationImage", {
          organizationID: this.$store.getters.selectedOrganizationID,
        });

        if (blob.size !== 0) {
          this.changeBlobToImage(blob);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async takeOrganizationBanner() {
      try {
        const blob = await this.$store.dispatch("takeOrganizationBanner", {
          organizationID: this.$store.getters.selectedOrganizationID,
        });

        if (blob.size !== 0) {
          this.changeBlobToBanner(blob);
        }
      } catch (e) {
        console.log(e);
      }
    },
    changeBlobToImage(blob) {
      const fileSend = new File([blob], "");
      const fileReader = new FileReader();

      fileReader.onload = () => {
        this.organizationImage = fileReader.result;
      };

      fileReader.readAsDataURL(fileSend);
    },
    changeBlobToBanner(blob) {
      const fileSend = new File([blob], "");
      const fileReader = new FileReader();

      fileReader.onload = () => {
        this.banner = fileReader.result;
      };

      fileReader.readAsDataURL(fileSend);
    },
  },
  created() {
    this.loadOrganizationPublicData();
    this.takeOrganizationImage();
    this.takeOrganizationBanner();
  },
};
</script>

<style scoped>
.dynamic-area {
  width: 100%;
  margin-top: 10px;
  height: 30vh;
  overflow-y: auto;
  box-sizing: border-box;
}
.organization-data h2 {
  font-size: 48px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: -10px;
}

.organization-data h3 {
  font-size: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
}

.organization-data p {
  font-size: 17px;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 80%;
  text-align: center;
}

.organization-data {
  padding-top: 20px;
  padding-bottom: 50px;
  padding-left: 40px;
  padding-right: 10px;
  box-sizing: border-box;
  width: 50%;
}

.organization-data {
  margin-left: 2%;
}

.profile-header img {
  width: 100%;
  background: no-repeat 50% 20% / cover;
  height: calc(100px + 15vw);
}

.img__container {
  display: flex;
  justify-content: center;
}

.img__container img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  display: inline-block;
  box-shadow: 1px 3px 12px rgba(0, 0, 0, 0.18);
  margin-top: -70px;
}

.main-area {
  display: flex;
  flex-wrap: wrap;
}

.edit-organization--btn {
  margin-top: 10px;
}

.menu-ul {
  list-style-type: none;
  margin-top: 30px;
  padding: 0;
}

.menu-link {
  margin-left: 20px;
  font-size: 18px;
  text-decoration: none;
  color: black;
}

@keyframes cssAnimation {
  to {
    visibility: hidden;
  }
}

/* Responsiveness */
@media (min-width: 900px) {
}

@media (min-width: 1017px) {
}

@media (max-width: 867px) {
  .menu-ul {
    display: flex;
    justify-content: center;
  }
}
</style>
