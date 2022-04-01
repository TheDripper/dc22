<template>
  <div id="root" class="testtttt">
    <div :class="classes"></div>
    <div class="flex bg-back-grey">
      <div id="page" class="w-full text-white">
        <div :id="slug" class="frame">
          <div id="content" v-html="page" class=""></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import $ from "jquery";
export default {
  methods: {
    clear(event) {
      let clicked = event.target.dataset.clicked;
      if (clicked == "false") {
        event.target.value = "";
        event.target.dataset.clicked = "true";
      }
    },
    async send() {
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
    },
  },
  created() {},
  mounted() {
    // $("a").each(function () {
    //   $(this).attr("target", "_blank");
    // });
    $(".unmute").on("click", function () {
      if ($(this).hasClass("unmuted")) {
        $(this).removeClass("unmuted");
        $(".night").find("video").prop("muted", "muted");
      } else {
        $(".night").find("video").attr("muted", "");
        let night = $(".night").find("video");
        console.log($(night).prop("muted"));
        $(".night").find("video").prop("muted", "");
        $(this).addClass("unmuted");
      }
    });
    let master = $(".scroller").find("video").attr("src");
    $(window).on("scroll", function (e) {
      if ($(window).innerWidth() > 767) {
        console.log($(window).innerWidth());
        let height = $(".scroll-start").offset().top;
        if ($(window).innerWidth() < 1152) {
          height = height - 75;
        }
        let phone = $(".scroller").outerHeight();
        let tri = $("#dead-customer").offset().top;
        let bottom = tri - phone;
        let one = $("#one-copy").offset().top + 500;
        let winHeight = $(window).innerHeight();
        one = one - winHeight;
        let two = $("#two-copy").offset().top + 500;
        two = two - winHeight;
        let three = $("#three-copy").offset().top + 500;
        three = three - winHeight;
        // let four = $("#four-copy").offset().top;
        // four = four - winHeight;
        // let five = $("#five-copy").offset().top;
        // five = five - winHeight;
        // let six = $("#six-copy").offset().top;
        // six = six - winHeight;
        // let masterImg = $('img').attr('src',master);
        $(".scroller").find("video").attr("srcset", null);
        let scrolly = $(document).scrollTop();
        if (scrolly > height) {
          $(".scroller").addClass("scrolling");
        } else {
          $(".scroller").removeClass("scrolling");
          console.log("master", master);
          $(".scroller").find("video").attr("src", master);
        }
        if (scrolly > one) {
          // let target = $("#one").find("video").attr("src");
          // console.log("one", target);
          // $(".scroller").find("video").attr("src", target);
          $(".scrolling").addClass("down");
          $("#one").addClass("up");
        }
        if (scrolly > two) {
          $("#two").addClass("up");
        }
        if (scrolly > three) {
          $("#three").addClass("up");
        }

        // if (scrolly > four) {
        //   let target = $("#four").find("video").attr("src");
        //   console.log("four", target);
        //   $(".scroller").find("video").attr("src", target);
        // }

        // if (scrolly > five) {
        //   let target = $("#five").find("video").attr("src");
        //   console.log("five", target);
        //   $(".scroller").find("video").attr("src", target);
        // }

        // if (scrolly > six) {
        //   let target = $("#six").find("video").attr("src");
        //   console.log("six", target);
        //   $(".scroller").find("video").attr("src", target);
        // }
        if (scrolly > bottom) {
          // let target = $('#six').find('img').attr('src');
          // console.log('six',target);
          $(".scroller").addClass("done");
          $(".up").addClass("done");
          $(".done-img").addClass("open");
        } else {
          $(".scroller").removeClass("done");
          $(".done-img").removeClass("open");
        }
      }
      // if(scrolly < height) {
      //   console.log('top',master);
      //   $(".scroller").removeClass("scrolling");
      //   $(".scroller").find("video").fadeOut(200).remove();
      // }
      // if (scrolly > two) {
      //   let src = $('#two').attr('src');
      //   $('.scroller').attr('src',src);
      // }
      // if (scrolly > bottom) {
      //   $(".scroller").addClass("done");
      // }
    });
    $(".scroll a").on("click", function (e) {
      e.preventDefault();
      const hash = $(this).attr("href");
      // const headerHeight = $header.outerHeight() + 500;
      const offset = $(hash).offset().top;
      $("html,body").animate({ scrollTop: offset }, 500);
    });
    let instance = this;
    $(".slider").each(function () {
      instance.$slider($(this).find(".wp-block-group__inner-container"));
    });
  },
  computed: {
    pages() {
      return this.$store.state.pages;
    },
    page() {
      // let slug = this.$route.params.page.replace(/-/g, "");
      // return this.$store.state.pages[slug];
      return this.$store.state.home;
    },
    slug() {
      return "home";
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
#one {
  transition: all 0.3s linear;
  box-shadow: 2px 4px 0px #ff00ff, -6px -8px 0px #00ff00, -1px 3px 5px #00ffff,
    7px -9px 0 black;
}
#two {
  transition: all 0.3s linear;
  box-shadow: 2px 4px 0px #ff00ff, -6px -8px 0px #00ff00, -1px 3px 5px #00ffff,
    7px -9px 0 black;
}
#three {
  transition: all 0.3s linear;
  box-shadow: 2px 4px 0px #ff00ff, -6px -8px 0px #00ff00, -1px 3px 5px #00ffff,
    7px -9px 0 black;
  @apply z-30;
}
.up {
  &#one {
    @apply fixed  z-30;
    top: 50%;
    right: 0;
  }
  &#two {
    @apply fixed  z-40;
    top: 50%;
    right: 0;
  }
  &#three {
    @apply fixed  z-50;
    top: 50%;
    right: 0;
  }
}
h1 {
  @apply p-4 mb-4;
  font-size: 48px;
  line-height: 1;
}
h1,
h2 {
  font-family: "vcr";
  text-shadow: 2px 2px 0px black, -2px -2px 0px black, -2px 2px 0px black,
    2px -2px 0 black;
  &:hover {
    text-shadow: 2px 2px 0px #ff00ff, -2px -2px 0px #00ff00,
      -2px 2px 0px #00ffff, 2px -2px 0 black;
    color: black !important;
    transition: all 0.3s linear;
  }
  &#depression-1998,
  &#dc-head {
    font-size: 5vw;
    @apply absolute cursor-pointer z-10;
    top: 50%;
    left: 50%;
  }
}
h2 {
  font-size: 20px;
  color: #ff00ff !important;
  text-shadow: 2px 2px 0 #00ffff;
}
.night {
  video {
    width: auto !important;
    height: 100vh !important;
    max-width: none !important;
  }
}
.unmuted {
  opacity: 0.2;
  transform: skew(33deg);
}
.unmute {
  transition: all 0.2s ease;
  @apply absolute cursor-pointer;
  right: 50px;
  bottom: 50px;
  width: 15%;
}
.done {
  opacity: 0;
}
.done-img {
  &.open {
    width: 225px;
    height: 473px;
    @screen xl {
      width: 315px;
      height: 663px;
    }
    img {
      opacity: 1 !important;
      width: 225px;
      transform: translate(98px, 208px);
      @screen xl {
        width: 315px;
        transform: translate(47px, 208px);
      }
    }
  }
}
.scroll-pane {
  @apply flex items-center justify-center;
  img,
  video {
    width: 315px;
    transform: translate(47px);
    opacity: 0;
    // transition: all 0.2s ease;
  }
}
html,
body {
  font-family: "vcr";
  h2 {
    color: #ff00ff;
  }
  p {
    @apply p-4;
    background: blue;
  }
  h2 {
    @apply p-4;
    background: blue;
    font-size: 3vw;
  }
}
input,
select,
textarea {
  background: none;
  appearance: none;
  border: 2px solid #57514a;
  font-size: 14px;
  color: #999999;
  letter-spacing: 1px;
  @apply p-4 mb-4;
}
select {
  @apply uppercase;
}
textarea {
  height: 244px;
  background: rgba(24, 24, 24, 0.7);
  @apply mt-8;
}
form {
  button {
    background: #728694;
    width: 250px;
    letter-spacing: 1px;
    height: 44px;
    @apply flex items-center justify-center uppercase rounded-full mx-auto mt-16 mb-48;
    font-size: 14px;
  }
}
.wp-block-columns {
  @apply px-0 max-w-5xl mx-auto flex items-center justify-center;
  h4 {
    @apply font-bold uppercase mb-4;
    color: #008080;
    font-size: 14px;
    @screen xl {
      font-size: 18px;
    }
  }
  h2 {
    font-size: 24px;
    @apply font-light mb-4;
    @screen xl {
      font-size: 40px;
    }
  }
  p {
    @apply mb-6;
  }
}
// .blue-hollow {
//   .wp-block-button__link {
//     border-radius: 0 !important;
//     background: blue;
//     letter-spacing: 1px;
//     color: white;
//     font-size: 24px;
//   }
// }
.partner {
  height: 750px;
}
.team {
  @apply py-32;
  h2 {
    @apply uppercase font-thin mb-8;
  }
  h5 {
    font-size: 24px;
    @apply font-light mb-6;
  }
  h3 {
    font-size: 18px;
    @apply uppercase mb-2;
  }
  p {
    font-size: 14px;
  }
  .wp-block-columns {
    @apply p-0;
  }
}
.mission {
  h2 {
    @apply text-head-40 uppercase font-thin mb-16;
  }
  p {
    font-size: 22px;
    @apply mb-6 font-light;
  }
}
.behind {
  min-height: 439px;
  h2 {
    font-size: 40px;
    @apply font-thin uppercase;
  }
  h4 {
    @apply font-bold;
  }
  p {
    @apply mb-6;
  }
  ul {
    @apply list-disc pl-8 mb-8;
  }
}
.story {
  height: 750px;
  h1 {
    font-size: 52px;
    @apply uppercase font-thin;
  }
}
.logobg {
  width: 100vw;
  min-height: 0 !important;
  @screen xl {
    min-height: 1024px !important;
  }
  .wp-block-cover__image-background {
    object-position: 50% 0% !important;
  }
  // @screen md {
  //   .wp-block-cover__image-background {
  //   }
  // }
}
.grey-button {
  .wp-block-button__link {
    background: #4c4741;
  }
}
#dead-customer {
  @apply relative;
  // min-height: 1013px;
}
.episode {
  overflow: hidden !important;
}
.wp-block-group {
  @apply relative;
  iframe {
    width: 100%;
  }
}
.wp-block-cover {
  min-height: none !important;
}
.scroll-start {
  @apply relative;
  left: 50%;
  overflow: visible;
  margin: 0 !important;
  // margin-top: 160px !important;
  // width: 323px;
  // height: 544px;
  // min-height: 544px;
  background: url("/bridge.png");
  // background-size: 225px;
  background-repeat: no-repeat;
  background-position: 0 0;
  figure {
    @apply m-0;
    transition: all 0.5s ease-in-out;
    max-width: none !important;
    width: 700px;
  }
  @screen scroll {
    left: unset;
  }
  @screen xl {
    width: 453px;
    height: 734px;
    background-size: 315px;
    background-position: 0 71px;
    // transform: none;
    figure {
      width: 615px;
      // height: 663px;
    }
    img,
    video {
      width: 315px;
      height: 663px;
      transform: translate(98px);
      margin: 0;
    }
  }
}
.scrolling {
  @screen lg {
    @apply fixed top-0 z-10;
    box-shadow: 2px 4px 0px #ff00ff, -6px -8px 0px #00ff00, -1px 3px 5px #00ffff,
      7px -9px 0 black;
    transform: translate(98px, 0) rotate(33deg) !important;
    img,
    video {
      opacity: 1 !important;
      // transform: none;
    }
  }
}

.bg-blue {
  text-shadow: none !important;
}
.wp-block-button__link {
  color: #ff00ff !important;
  background: blue;
  width: 250px;
  text-shadow: 2px 2px 0 #00ffff;
  font-size: 24px;
  border-radius: 0 !important;
}

.text-img {
  .wp-block-column {
    &:first-child {
      @apply flex flex-col items-start justify-center;
    }
    &:last-child {
      @apply flex items-center justify-center;
    }
  }
}
</style>
