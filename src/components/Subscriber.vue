<template>
  <div></div>
</template>

<script>
import OT from '@opentok/client';  
export default {
  name: 'Subscriber',
  props: {
    stream: {
      type: OT.Stream,
      required: true
    },
    session: {
      type: OT.Session,
      required: true
    },
    opts: {
      type: Object,
      required: false
    }
  },
  mounted: function() {
    var publisherOptions = {width: '50%', height:585, name:"su ptm stream"};
    const subscriber = this.session.subscribe(
      this.stream,
      this.$el,
      publisherOptions,
      err => {
        if (err) {
          this.$emit('error', err);
        } else {
          this.$emit('subscriberConnected', subscriber);
        }
      }
    );
    this.$emit('subscriberCreated', subscriber);
  }
};
</script>
