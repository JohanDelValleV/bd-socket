<template>
  <v-app dark>
    <v-dialog v-model="dialog3" width="600px">
      <v-btn icon slot="activator" color="primary">
        <v-icon>edit</v-icon>
      </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">New BackUp</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Name" v-model="name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Database name" v-model="databaseName"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Database user" v-model="databaseUser"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field type="password" label="Database password" v-model="databasePassword"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="date"
                lazy
                full-width
                width="290px"
                persistent
                >
                  <v-text-field
                  slot="activator"
                  v-model="date"
                  label="Backup date"
                  prepend-icon="event"
                  readonly
                  ></v-text-field>
                  <v-date-picker v-model="date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="modal = false">Canel</v-btn>
                    <v-btn flat color="primary" @click="$refs.dialog.save(date)">Ok</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs12 sm6 md4>
                <v-dialog
                  ref="dialog2"
                  v-model="modal2"
                  :return-value.sync="time"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="time"
                    label="Backup time"
                    prepend-icon="access_time"
                    readonly
                  ></v-text-field>
                  <v-time-picker
                    v-if="modal2"
                    v-model="time"
                    full-width
                  >
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.dialog2.save(time)">Ok</v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      dialog3: false,
    })
  }
</script>

<style scoped>

</style>