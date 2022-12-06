<template>
  <div class="d-flex justify-content-center">
    <h1>Editar Especialização</h1>
  </div>
  <div class="form-group">
    Gênero:
    <input
      class="form-control"
      type="text"
      name="specializationType"
      id="specializationType"
      v-model="specialization.specializationType"
    />
    <button class="btn btn-success" @click="update">Alterar</button>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import env from "/env.json";
import { useRoute } from "vue-router";
import axios from "axios";

const apiURL = env.apiURL;

const route = useRoute();

const specialization = ref({ id: null, specializationType: "" });

const load = () => {
  let id = route.params.id;
  axios
    .get(apiURL + "/specialization/" + id)
    .then((response) => {
      specialization.value.id = response.data.id;
      specialization.value.specializationType = response.data.specializationType;
    })
    .catch((error) => {
      alert("Erro: " + error.response.status);
    });
};

const update = () => {
  axios
    .put(apiURL + "/specialization", specialization.value)
    .then((response) => {
      if (response.data != "") {
        alert("Dados atualizados com sucesso!");
        load();
      }
    })
    .catch((error) => {
      alert("Erro: " + error.response.status);
    });
};

onMounted(() => {
  load();
});
</script>