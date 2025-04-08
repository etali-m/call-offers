<template>
  <h3>Bonjour, John</h3>
  <p>Créez un nouveau dossier d'appel d'offre</p>

  <div class="row mt-3">
      <!-- Debut de la boucle -->
          <div class="col-md-3 template-box">
              <div class="template-card">
                  <a href="">
                      <img src="" alt="DAO Marché de travaux">
                      <p class="template-title">Marché de travaux</p>
                  </a>
              </div>
          </div>
      <!-- fin de la boucle -->
      <div class="d-flex justify-content-end">
          <span class="text-primary" id="more_template" style="cursor:pointer;">Plus de modèle <i class="bi bi-arrow-down-short"></i></span>
      </div>
  </div>
  <div id="template_list">
      <div class="row mt-3">
          <!-- Debut de la boucle -->
              <div class="col-md-3 template-box">
                  <div class="template-card">
                      <a href="">
                          <img src="" alt="DAO Marché de travaux">
                          <p class="template-title">Marché de Fourniture</p>
                      </a>
                  </div>
              </div>
        <!-- Fin de la boucle -->
      </div> 
  </div>
  <br><br>

  <h4 class="mt-4">Projet recent</h4>
  <table class="table mb-4">
      <thead>
          <tr>
              <th>Nom</th>
              <th>Type de marché</th>
              <th>Dernière modification</th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td>
                  <span class="text-primary" style="cursor:pointer;">Construction de la route AYOS - AWAE</span> <br>
                  <small>descirption du dossier d'appel d'offre</small>
              </td>
              <td>Travaux</td>
              <td>13-08-2024</td>
          </tr>
      </tbody>
  </table>
  <br>
</template>

<script>
// @ is an alias to /src 
export default {
  name: 'HomeView',
   
}
</script>
