<template lang="pug">
.work
  .work__pic
    img(:src="renderedPhoto")
  .work__tag
  .work__info
    .work__title {{ work.title }}
    .work__desc {{ work.description }}
    a.work__link(:href="work.link", target="_blank") {{ work.link }}
    .work__tags {{ work.techs }}
    .work__btn
      icon(
        symbol="pencil",
        title="Изменить",
        btnTitle="Изменить",
        grayscale,
        @click="onChange"
      ) 
      icon(
        symbol="cross",
        title="Удалить",
        btnTitle="Удалить",
        grayscale,
        @click="remove"
      ) 
</template>
<script>
import icon from "./../icon";
import tag from "./../tag";
import { getAbsoluteImgPath } from "./../../helpers/pictures";

export default {
  props: {
    work: {
      type: Object,
      default: {},
    },
  },
  components: {
    icon,
    tag,
  },
  computed: {
    renderedPhoto() {
      return getAbsoluteImgPath(this.work.photo);
    },
  },
  methods: {
    onChange() {
      this.$emit("onChange", this.work);
    },
    remove() {
      this.$emit("remove", this.work.id);
    },
  },
};
</script>

<style lang="postcss" scoped>
@import "./../../../styles/mixins.pcss";

.work {
  display: flex;
  flex-direction: column;
  /* border: 1px solid black; */
  height: 100%;
  background: white;
}

.work__info {
  padding: 10%;
  display: flex;
  flex-direction: column;
  word-break: break-all;

  .work__title {
    font-weight: 700;
    margin-bottom: 15px;
  }

  .work__desc {
    margin-bottom: 15px;
    opacity: 0.8;
    font-weight: 600;
    flex: 1;
  }

  .work__link {
    display: block;
    color: blue;
    margin-bottom: 15px;
  }

  .work__tags {
    opacity: 0.6;
    font-weight: 600;
    margin-bottom: 15px;
  }
}

.work__pic {
  width: 100%;
  /* max-height: 200px; */
  height: 200px;

  @include tablets {
    height: initial;
    max-height: 350px;
  }

  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
}

.work__btn {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;

  :first-child {
    margin-right: 10px;
  }
}
</style>