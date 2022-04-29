<template>
  <v-flex xs6 sm2 md2>
    <div class="caption grey--text">
      Uploaded Session
      {{ $t('torrent.uploadedSession') }}
    </div>
    <div>
      {{ torrent.uploaded_session | getDataValue }}
      <span class="caption grey--text">
        {{
          torrent.uploaded_session | getDataUnit
        }}
      </span>
    </div>
  </v-flex>
</template>
<script>
export default {
  name: 'UploadedSession',
  props: ['torrent']
}
</script>
