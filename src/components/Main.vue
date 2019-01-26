<template>
  <v-app dark>
    <div>
      <v-toolbar flat color="#303030">
        <v-toolbar-title>BackUp</v-toolbar-title>
        <v-divider
          class="mx-2"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" width="600px" persistent>
          <v-btn slot="activator" color="primary" dark class="mb-2">New BackUp</v-btn>
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
                    <v-text-field label="Database password" v-model="databasePassword"></v-text-field>
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
      </v-toolbar>

      <v-data-table
      :headers="headers"
      :items="contenido"
      class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.id }}</td>
          <td class="text-xs-center">{{ props.item.name }}</td>
          <td class="text-xs-center">{{ props.item.name_db }}</td>
          <td class="text-xs-center">{{ props.item.user_db }}</td>
          <td class="text-xs-center">{{ props.item.password_db }}</td>
          <td class="text-xs-center">{{ props.item.date_backup }}</td>
          <td class="text-xs-center">{{ props.item.time_backup }}</td>
          <td class="text-xs-center">{{ props.item.status }}</td>
          <td class="justify-center layout px-0">
            <v-icon
            small
            @click="backup(props.item.id)"
            >
              backup
            </v-icon>
            <v-dialog v-model="updateDialogForm" width="600px" persistent>
              <v-btn icon slot="activator" @click="show(props.item.id)">
                <v-icon small class="mr-2">edit</v-icon>
              </v-btn>
              <v-card>
                <v-card-title>
                  <span class="headline">Edit Backup</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md4>
                        <v-text-field label="Name" v-model="name2"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field label="Database name" v-model="databaseName2"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field label="Database user" v-model="databaseUser2"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field label="Database password" v-model="databasePassword2"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-dialog
                        ref="updateDate"
                        v-model="modalDate"
                        :return-value.sync="date"
                        lazy
                        full-width
                        width="290px"
                        persistent
                        >
                          <v-text-field
                          slot="activator"
                          v-model="dateU"
                          label="Backup date"
                          prepend-icon="event"
                          readonly
                          ></v-text-field>
                          <v-date-picker v-model="dateU" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="modalDate = false">Canel</v-btn>
                            <v-btn flat color="primary" @click="$refs.updateDate.save(date)">Ok</v-btn>
                          </v-date-picker>
                        </v-dialog>
                      </v-flex>
                      <v-spacer></v-spacer>
                      <v-flex xs12 sm6 md4>
                        <v-dialog
                          ref="updateTime"
                          v-model="modalTime"
                          :return-value.sync="time"
                          persistent
                          lazy
                          full-width
                          width="290px"
                        >
                          <v-text-field
                            slot="activator"
                            v-model="time2"
                            label="Backup time"
                            prepend-icon="access_time"
                            readonly
                          ></v-text-field>
                          <v-time-picker
                            v-if="modalTime"
                            v-model="time2"
                            full-width
                          >
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="modalTime = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.updateTime.save(time)">Ok</v-btn>
                          </v-time-picker>
                        </v-dialog>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="updateDialogForm = false">Cancel</v-btn>
                  <v-btn color="blue darken-1" flat @click="actualizar(props.item.id)">Update</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-icon
            small
            @click="eliminar(props.item.id)"
            >
              delete
            </v-icon>
          </td>
        </template>
      </v-data-table>
    </div>
  </v-app>
</template>

<script>
import { API } from '../service/axios';
  export default {
    data: () => ({
      name: null,
      databaseName: null,
      databaseUser: null,
      databasePassword: null,
      name2: null,
      databaseName2: null,
      databaseUser2: null,
      databasePassword2: null,
      date: new Date().toISOString().substr(0,10),
      dateU: null,
      timeU: null,
      dialog: false,
      time: null,
      time2: null,
      modal: false,
      modal2: false,
      modalTime: false,
      modalDate: false,
      updateDialogForm: false,
      updateDate: false,
      updateTime: null,
      myId: null,
      headers: [
        {
          text: 'Id',
          align: 'left',
          sortable: false
        },
        { text: 'Name', align: 'left', sortable: false },
        { text: 'Database name', sortable: false },
        { text: 'Database user', sortable: false },
        { text: 'Database password', sortable: false },
        { text: 'Backup date', sortable: false },
        { text: 'Backup time', sortable: false },
        { text: 'Status', sortable: false },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      contenido:[]
    }),
    computed: {

    },
    methods: {
      eliminar(id){
        API.delete('settings/'+ id).then(response => {
          this.getDatos();
        })
      },
      show(id){
        API.get('settings/'+ id).then(response => {
          this.name2 = response.data.name;
          this.databaseName2 = response.data.name;
          this.databaseName2 = response.data.name_db;
          this.databaseUser2 = response.data.user_db;
          this.databasePassword2 = response.data.password_db;
          this.dateU = response.data.date_backup;
          this.time2 = response.data.time_backup;
        })
      },
      actualizar(id){
        console.log(id)
        API.put('settings/'+ id, {
          name: this.name2,
          name_db: this.databaseName2,
          user_db: this.databaseUser2,
          password_db: this.databasePassword2,
          date_backup: this.date2,
          time_backup: this.time2,
          status: 0
        }).then(response => {
          this.getDatos();
          this.updateDialogForm = false;
        })
      },
      backup(id){

      },
      close () {
        this.dialog = false,
        this.name = null,
        this.databaseName = null,
        this.databaseUser = null,
        this.databasePassword = null,
        this.date = new Date().toISOString().substr(0,10),
        this.time = null
      },
      save () {
        API.post('settings/',{
          name: this.name,
          name_db: this.databaseName,
          user_db: this.databaseUser,
          password_db: this.databasePassword,
          date_backup: this.date,
          time_backup: this.time,
          status: 0
        }).then(response => {
          this.getDatos();
        })
        this.close();
      },
      getDatos(){
        API.get('settings/').then(response => {
          this.contenido = response.data;
        })
      }
    },
    mounted: function(){
      API.get('settings/').then(response => {
        this.contenido = response.data;
      })
    }
  }
</script>

<style scoped>

</style>