

<template>
   <nav class="navbar navbar-expand-lg" style="background-color: 	#45f7;" >
  <div class="container-fluid">
    <router-link class="navbar-brand text-light fw-bold " to="/" >CCM - Centro de Cadastro de Medicos</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        
        <li class="nav-item dropdown">
          <router-link class="nav-link dropdown-toggle text-light " to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Medicos
          </router-link>
          <ul class="dropdown-menu">
            <li><router-link class="dropdown-item" to="/people" >Listar</router-link></li>
            <li><router-link class="dropdown-item" to="/people/create">Cadastrar</router-link></li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <router-link class="nav-link dropdown-toggle text-light" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Especialização
          </router-link>
          <ul class="dropdown-menu">
            <li><router-link class="dropdown-item" to="/specialization">Listar</router-link></li>
            <li><router-link class="dropdown-item" to="/specialization/create">Cadastrar</router-link></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
  <div class="principal">
    
    <router-view/>
  </div>




</template>


<script setup>


</script>


<style>


</style>
