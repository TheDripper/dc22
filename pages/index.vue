<template>
  <div id="root" class="bg-back-grey">
    <div :class="classes"></div>
    <div id="square"></div>
    <div id="words" class="flex h-screen v-screen overflow-scroll flex-wrap">
      <p v-for="word in words">{{ word }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import $ from "jquery";
export default {
  data() {
    return {
      notSent: true,
    };
  },
  methods: {
    copy($event) {
      var dummy = document.createElement("input"),
        text = window.location.href;
      document.body.appendChild(dummy);
      dummy.value = text;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
      $($event.target).text("Copied!");
    },
    clear(event) {
      let clicked = event.target.dataset.clicked;
      if (clicked == "false") {
        event.target.value = "";
        event.target.dataset.clicked = "true";
      }
    },
    async send($event) {
      $event.preventDefault();
      let form = document.getElementById("splashform");
      let formData = new FormData(form);
      let contact = {
        properties: [
          { property: "firstname", value: "tyler" },
          { property: "lastname", value: "hill" },
          { property: "email", value: "admin@tylerhillweb.dev" },
        ],
      };
      contact = JSON.stringify(contact);
      this.$axios.setHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );
      let posted = await this.$axios.$post(
        "https://forms.hubspot.com/uploads/form/v2/20008151/f379a28f-402a-46d3-b660-e86a8d1e19cb",
        formData
      );
      this.notSent = false;
      return false;
    },
  },
  created() {},
  mounted() {
    $(".to-top").on("click", function (e) {
      // const offset = $(".community").offset().top;
      $("html,body").animate({ scrollTop: 0 }, 500);
    });
    $(".down").on("click", function (e) {
      const offset = $(".community").offset().top;
      $("html,body").animate({ scrollTop: offset }, 500);
    });
    // $("a").each(function () {
    //   $(this).attr("target", "_blank");
    // });
    $(".scroll a").on("click", function (e) {
      e.preventDefault();
      const hash = $(this).attr("href");
      // const headerHeight = $header.outerHeight() + 500;
      const offset = $(hash).offset().top;
      $("html,body").animate({ scrollTop: offset }, 500);
    });
    let instance = this;
    $(".slider").each(function () {
      instance.$slider($(this));
    });
    $(".reviews").each(function () {
      instance.$reviews($(this).find(".wp-block-group__inner-container"));
    });
  },
  computed: {
    words() {
      return this.$store.state.words;
    },
    pages() {
      return this.$store.state.pages;
    },
    page() {
      return this.$store.state.home;
    },
    header() {
      return this.$store.state.header;
    },
    footer() {
      return this.$store.state.footer;
    },
    classes() {
      return this.$store.state.classes;
    },
  },
};
</script>
<style lang="scss">
#words {
  background: blue;
  @apply relative z-20;
}

#square {
  width: 40vw;
  height: 40vw;
  @apply fixed z-10;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #ff00ff;
}
p {
  color: white;
  font-family: "vcr";
  padding: 2px;
  font-size: 18px;
  &:nth-child(even) {
    animation: 1s infinite alternate spin;
  }
  &:nth-child(odd) {
    animation: 1.33s infinite alternate spinback;
  }
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes spinback {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}
</style>