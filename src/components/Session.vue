<template>
  <div>
    <div id="session" @error="errorHandler" class="pantalla">
    <publisher :session="session" @error="errorHandler" ></publisher>
    <div id="subscribers" v-for="stream in streams" :key="stream.streamId">
      <subscriber @error="errorHandler" :stream="stream" :session="session" ></subscriber>
    </div>
  </div>
  </div>
  
</template>

<script>
import OT from '@opentok/client';  
import Publisher from '@/components/Publisher.vue';
import Subscriber from '@/components/Subscriber.vue';
import { mapState } from 'vuex';

const errorHandler = err => {
  alert(err.message);
};

export default {
  name: 'Session',
  components: { Publisher, Subscriber },
  created() {
    this.session = OT.initSession(this.apiKey, this.cita.aulaVirtual.sessionId);

    this.session.connect(this.cita.aulaVirtual.sessionToken, err => {
      if (err) {
        errorHandler(err);
      }
    }); 

    this.session.on('streamCreated', event => {
      this.streams.push(event.stream);
    });
    this.session.on('streamDestroyed', event => {
      const idx = this.streams.indexOf(event.stream);
      if (idx > -1) {
        this.streams.splice(idx, 1);
      }
    });
  },
  data: () => ({
    apiKey: "46889764",
    sessionID: "2_MX40Njg4OTc2NH5-MTU5NzgzMjE3ODM2MX5wVmpWa2RKdVg4ajNpQUJCQ0thSkxCL2l-UH4",
    token: "T1==cGFydG5lcl9pZD00Njg4OTc2NCZzaWc9ZDUyOWY3MzQxMTA0NzIxZWVkOWJjYzY3YzllYzM0MGQxNGZkMzk3NzpzZXNzaW9uX2lkPTJfTVg0ME5qZzRPVGMyTkg1LU1UVTVOemd6TWpFM09ETTJNWDV3Vm1wV2EyUktkVmc0YWpOcFFVSkNRMHRoU2t4Q0wybC1VSDQmY3JlYXRlX3RpbWU9MTU5NzgzMjE3OSZub25jZT0wLjQzNDUxNDA1Mjg3MDY2NTQ3JnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE1OTc5MTg1NzkmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=",
    streams: [],
    session: null
  }),
  methods: {
    errorHandler
  },
  computed: {
    ...mapState(['cita'])
  }
};
</script>

<style>
.OT_subscriber {
  float: left;
}
.OT_publisher {
  float: left;
}


</style>
