<template>
  <div class="teams-container">
    <base-spinner v-if="isLoading"></base-spinner>
    <h4 v-else-if="!isLoading && message">{{ message }}</h4>
    <organization-profile-list-item v-else v-for="team in teams" :key="team.id" :itemTitle="team.name" :itemDescription="team.description"></organization-profile-list-item>
  </div>
</template>

<script>
import OrganizationProfileListItem from "./OrganizationProfileListItem.vue";

export default {
  components: { OrganizationProfileListItem },
  data() {
    return {
      teams: new Array(),
      isLoading: false,
      message: "",
    };
  },
  methods: {
    async loadOrganizationTeams() {
      try {
        this.isLoading = true;

        this.teams = await this.$store.dispatch("getOrganizationTeams", {
          organizationID: this.$store.getters.selectedOrganizationID,
        });

        this.isLoading = false;

        if (this.teams.length === 0) {
          this.message = "No member in any team!";
        } else {
          this.message = "";
        }
      } catch (error) {
        this.message = error.message || "Something went wrong!";
      }
    },
  },
  created() {
    this.loadOrganizationTeams();
  },
};
</script>

<style scoped>
.teams-container {
  display: inline-block;
}
@media (max-width: 900px) {
  .teams-container {
    display: block;
    margin: 0 auto;
  }
}
</style>
