<template>
  <v-app>
    <v-app-bar max-height="60" color="orange">
      <v-app-bar-title style="color: white"
        >Datatrics CSV Converter</v-app-bar-title
      >
    </v-app-bar>
    <div class="home">
      <div style="padding-left: 5%; padding-right: 5%; padding-top: 20px">
        <v-text-field
          style="padding-right: 70%"
          v-model="projectId"
          label="project id"
        ></v-text-field>

  <!-- <v-container fluid>
    <v-row align="center">
     
      <v-col
        class="d-flex"
        cols="12"
        sm="6"
      > -->

        <div style="padding-right:70%">
          <v-select
            v-on:click="optselected"
            :items="items"
            filled
            label="Data type"
            v-model="inputvalue"
          ></v-select>
        </div>
      <!-- </v-col>

    </v-row>
  </v-container> -->
        <v-text-field
          style="padding-right: 70%"
          v-model="filename"
          label="FileName"
        ></v-text-field>
        <v-date-picker
          style="padding-right: 80%"
          v-model="dates"
          range
          color="orange"
        ></v-date-picker>
        
        <tr>
          <td style="padding-right:10px">
            <v-btn
              style="margin-bottom: 10px"
              v-on:click="getConversionByDate()"
              >Fetch Data</v-btn
            >
          </td>
          <td>
            <div>Status: {{ this.status }}</div>
          </td>
        </tr>
      </div>
      <v-btn style="margin-left: 5%" v-on:click="convertToCSV()"
        >Download CSV</v-btn
      >
    </div>
    
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import DatatricsService from "@/services/datatricsService";
import { VListItemTitle } from "vuetify/lib";
/* eslint-disable */
const { parse } = require("json2csv");
const fs = require("file-system");


  
@Component({
  components: {
    HelloWorld,
  },
     data: () => ({
      items: ['Conversie Data', 'Profiel Data', 'Content Data'],
      inputvalue:"",
    }),
    methods:{
        optselected(){
          
        }
    }
    

    
})

export default class Home extends Vue {
   
  private datatricsResponse = [];
  private projectId = 255924;
  private filename = "datatrics_data";
  private status = "";
  private dates = [];
  private inputvalue = "";

//CONVERT TO CSV
  async convertToCSV() {
    if (this.datatricsResponse) {
      const data = JSON.parse(JSON.stringify(this.datatricsResponse))["items"];
      const csv = parse(data);
      this.download(`${this.filename}.csv`, csv);
    }
  }

  async getConversionByDate() {
    // this.projectId.toString(),
    // this.dates[0],
    // this.dates[1],
    // this.inputvalue,
   if(this.inputvalue=="Conversie Data"){
      this.status="succes";
    DatatricsService.getConversionByDate(
      this.projectId.toString(),
      "2021-05-14",
      "2021-05-20",
    ).then((res) => {
      this.status=res!.data;
      if (res?.statusText) {
        this.status = res?.statusText;
      }
      return (this.datatricsResponse = res!.data);
    });
  }
  if(this.inputvalue=="Profiel Data"){

    DatatricsService.getProfileByDate(
          this.projectId.toString(),
          "2021-05-14",
          "2021-05-20",
        ).then((res) => {
          if (res?.statusText) {
            this.status = res?.statusText;
          }
          return (this.datatricsResponse = res!.data);
        });

      }

    if(this.inputvalue=="Content Data"){

    DatatricsService.getContentByDate(
          this.projectId.toString(),
          "2021-05-14",
          "2021-05-20",
        ).then((res) => {
          console.log(res);
          if (res?.statusText) {
            this.status = res?.statusText;
          }
          return (this.datatricsResponse = res!.data);
        });

      }

  }


      // DOWNLOAD AS CSV
  async download(filename: string, text: string) {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:csv/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
}

</script>
