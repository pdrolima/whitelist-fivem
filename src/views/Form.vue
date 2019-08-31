<template>
  <div class="card mt-4">
    <div class="card-header text-center">
      <h3>{{ serverName }} RolePlay - Formulário de Whitelist</h3>
    </div>
    <div class="card-body">
      <b-form @submit.prevent="onSubmit">
        <div class="row">
          <!-- Nome -->
          <div class="col-md-6">
            <b-form-group id="input-group-1" label="Nome:" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="form.name"
                type="text"
                placeholder="Qual seu nome?"
                :class="invalidFeedback('name')"
              ></b-form-input>
              <has-error :form="form" field="name"></has-error>
            </b-form-group>
          </div>
          <div class="col-md-2">
            <b-form-group id="input-group-1" label="ID:" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="form.queueId"
                type="text"
                placeholder="ID"
                :class="invalidFeedback('queueId')"
              ></b-form-input>
              <has-error :form="form" field="queueId"></has-error>
            </b-form-group>
          </div>
          <!-- Age -->
          <div class="col-md-3">
            <b-form-group id="input-group-1" label="Idade:" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="form.age"
                type="number"
                placeholder="Quantos anos você tem?"
                :class="invalidFeedback('age')"
              ></b-form-input>
              <has-error :form="form" field="age"></has-error>
            </b-form-group>
          </div>
          <!-- Discord -->
          <div class="col-md-12">
            <b-form-group id="input-group-1" label="Discord:" label-for="input-1" disabled>
              <b-form-input
                id="input-1"
                v-model="form.discordUser"
                type="text"
                placeholder="Discord"
                disabled
                readonly
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-md-12 mt-3 mb-3">
            <h4>Personagem</h4>
          </div>
          <!-- Nome Personagem -->
          <div class="col-md-3">
            <b-form-group id="input-group-1" label="Nome:" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="form.characterFirstName"
                type="text"
                :class="invalidFeedback('characterFirstName')"
              ></b-form-input>
              <has-error :form="form" field="characterFirstName"></has-error>
            </b-form-group>
          </div>
          <div class="col-md-3">
            <b-form-group id="input-group-1" label="Sobrenome:" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="form.characterLastName"
                type="text"
                :class="invalidFeedback('characterLastName')"
              ></b-form-input>
              <has-error :form="form" field="characterLastName"></has-error>
            </b-form-group>
          </div>
          <!-- Age -->
          <div class="col-md-2">
            <b-form-group id="input-group-1" label="Idade:" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="form.characterAge"
                type="number"
                :class="invalidFeedback('characterAge')"
              ></b-form-input>
              <has-error :form="form" field="characterAge"></has-error>
            </b-form-group>
          </div>
          <!-- Job -->
          <div class="col-md-4">
            <b-form-group id="input-group-1" label="Emprego:" label-for="input-1">
              <b-form-select
                v-model="form.characterJob"
                :options="jobs"
                :class="`form-control ${invalidFeedback('characterJob')}`"
              ></b-form-select>
              <has-error :form="form" field="characterJob"></has-error>
            </b-form-group>
          </div>
          <!-- História do personagem -->
          <div class="col-md-12">
            <b-form-group id="input-group-1" label="História do personagem" label-for="input-1">
              <b-form-textarea
                id="textarea"
                v-model="form.characterAbout"
                placeholder="Conte-nos um pouco mais sobre seu personagem (seja criativo)"
                rows="3"
                max-rows="6"
                :class="invalidFeedback('characterAbout')"
              >></b-form-textarea>
              <has-error :form="form" field="characterAbout"></has-error>
            </b-form-group>
          </div>
          <div class="col-md-12 mt-3 mb-3">
            <h4>RolePlay</h4>
          </div>
          <div class="col-md-12">
            <vue-form-generator :schema="schema" :model="form" />
          </div>
        </div>
        <div class="mt-3">
          <b-button type="submit" variant="discord" class="btn-lg" :disabled="form.busy">
            <b-spinner small v-if="form.busy"></b-spinner>
            {{ form.busy ? "Enviando..." : "Enviar" }}
          </b-button>
          <b-button type="button" variant="outline-danger" class="ml-2 btn-lg" @click="logout">Sair</b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import { fields, jobs } from '../../roleplay.fields'
import { Form, HasError } from 'vform';
import axios from "axios";

export default {
    
    name: 'WhitelistForm',

    data: () => ({
      form: new Form({
        name: "",
        age: null,
        queueId: null,
        discordUser: "",
        discord: {},
        characterFirstName: "",
        characterLastName: "",
        characterAge: null,
        characterJob: "",
        characterAbout: "",
      }),
      serverName: process.env.VUE_APP_SERVER_NAME,
      jobs: jobs,
      schema: { fields: fields }
    }),

    components: {
      HasError
    },

    created () {
      this.discordUser()
    },

    methods: {
      discordUser () {
            axios.get("https://discordapp.com/api/users/@me", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("discordToken")}`
              }
            })
          .then(response => {
            const { status, username, discriminator } = response.data;

            this.form.discordUser = `${username}#${discriminator}`;
            this.form.discord = response.data;
          })
          .catch(error => {
            const { status, data } = error.response;
            if (status === 401) {
              localStorage.removeItem("discordToken");
              this.$router.push({ name: "home" });
            }
          });
      },

    logout () {
      localStorage.removeItem('discordToken');
      window.location.href = '/'
    },

    async onSubmit() {
      await this.form.post(`${process.env.VUE_APP_API_URI}/receive_whitelist`, this.form)
      .then((res) => {
        const { data } = response;
        this.$bvToast.toast(data.message, {
          title: "Tudo certo...",
          variant: data.type,
          solid: true
        });
      })
      .catch((error) => {
        const { status, data } = error.response;
        if (status === 400) {
          this.$bvToast.toast(data.message, {
            title: "Oops! Algo está errado.",
            variant: data.type,
            solid: true
          });
        }
      })
    },

    invalidFeedback (field) {
      return this.form.errors.has(field) ? 'is-invalid' : '';
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/sass/whitelist.scss";
</style>