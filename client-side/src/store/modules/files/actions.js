export default {
  async getFiles(context, payload) {
    try {
      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${context.rootGetters.loggedUserToken}`);

      let requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const files = await fetch(`/api/user/files?limit=10&skip=${payload.skip}`, requestOptions);
      // console.log("a");

      const file = await files.json();

      if (file.length > 0) {
        context.commit("setFiles", { files: file });
        context.commit("setNextFiles", { files: file });
      } else {
        context.commit("setNextFilesg");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async upload(context, payload) {
    let myHeaders = new Headers();

    // console.log(context);

    myHeaders.append("Authorization", `Bearer ${context.rootGetters.loggedUserToken}`);

    let formdata = new FormData();

    formdata.append("upload", payload.file, payload.file.name);

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch("/api/user/upload", requestOptions);
  },
};