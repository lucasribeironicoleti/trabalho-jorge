<template>

<div class="d-flex justify-content-center">
    <h1>Cadastrar Especialização</h1>
    </div>


    <div class="form-group">
        Especialização:
        <input class="form-control" type="text" name="specializationType" id="specializationType" v-model="specialization.name"/>
        
        <button class="btn btn-success" @click="save()"> Salvar </button>
    </div>
</template>

<script setup>
import axios from 'axios';
import { reactive } from 'vue';
import env from "/env.json";
const apiURL = env.apiURL;

const specializations = reactive({
    id: "",
    name : ""
})

const save = () => {
    axios.post(apiURL + "/specialization", specializations)
        .then(() => {
            alert("Dados cadastrados com sucesso!")
        })
        .catch((error) => {
            alert("Erro: " + error.response.data)
        })
}


</script>