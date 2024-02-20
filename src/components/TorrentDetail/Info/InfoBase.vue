<template>
  <v-col cols="12" sm="6" lg="3">
    <v-sheet rounded="xl" class="d-flex align-center py-2 border">
      <div class="pl-4">
        <slot name="title" />
      </div>
      <v-spacer />
      <div class="pr-4">
        <slot name="text" />
      </div>
    </v-sheet>
  </v-col>
</template>
