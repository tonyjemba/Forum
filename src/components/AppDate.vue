<template>
  <span :title="humandate()">
    {{ diffForHumand() }}
  </span>
</template>

<script>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localisedDate from "dayjs/plugin/localizedFormat";

dayjs.extend(relativeTime);
dayjs.extend(localisedDate);

export default {
  props: {
    timestamp: {
      required: true,
      type: Number,
    },
  },
  methods: {
    diffForHumand() {
      return dayjs.unix(this.timestamp).fromNow();
    },
    humandate() {
      return dayjs.unix(this.timestamp).format("llll");
    },
  },
};
</script>
