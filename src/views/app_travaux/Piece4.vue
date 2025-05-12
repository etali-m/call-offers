<template>
      <HeaderPiece numero_piece="4" nom_piece="CAHIER DES CLAUSES ADMINISTRATIVES PARTICULIERES" numero_dossier="0089/AONO/MINEE/CIPM/2024" moe="Ministère de l'eau et de l'energie" description_travaux="TRAVAUX DE CONSTRUCTION DES CANIVEAUX BETONNES DANS LA COMMUNE DE YAOUNDE 4"/>

      <div class="form-container">  
      <form @submit.prevent="handleSubmit" style="padding-left:10px;">
        <StepperForm :totalSteps="13" v-slot="{ currentStep, nextStep, prevStep, isLastStep }">
          <div v-if="currentStep === 0">
            <div class="mt-3">
                  <h5 class="fw-bold mb-2">1. Objet du marché </h5>
                  <div class="col-md-12">    
                        <RichTextarea v-model="objet_marche"/>
                  </div>
            </div>  
            <div class="mt-3">
                  <h5 class="fw-bold mb-2">2. Procédure de passation du marché </h5>
                  <div class="col-md-12">    
                        <RichTextarea v-model="procedure_passation_marche"/>
                  </div>
            </div>
            <div class="mt-3">
                  <h5 class="fw-bold mb-2">3. Attribution et nantissement </h5>
                  <div class="col-md-12">    
                        <h6>3.1 Définitions générales</h6> 
                        <div class="row">
                              <div class="col-md-6">
                                    <label class="label-custom" for="dossier">Le maître d'ouvrage est :</label>
                                    <input type="text" v-model="moa" class="input-custom" placeholder="Le ministères de marchés publics" required>
                              </div> 
                              <div class="col-md-6">
                                    <label class="label-custom" for="dossier">Le Chef de service du marché est : </label>
                                    <input type="text" v-model="chef_service_marche" class="input-custom" placeholder="Le ministères de marchés publics" required>
                              </div> 
                              <div class="col-md-12">
                                    <label class="label-custom" for="dossier">L'ingénieur du marché est :</label>
                                    <input type="text" v-model="ing_marche" class="input-custom" placeholder="Le ministères de marchés publics" required>
                              </div> 
                              <div class="col-md-6">
                                    <label class="label-custom" for="dossier">L’organisme chargé du contrôle externe des marchés publics est: </label>
                                    <input type="text" v-model="control_externe" class="input-custom" placeholder="Le ministères de marchés publics" required>
                              </div>
                              <div class="col-md-6">
                                    <label class="label-custom" for="dossier">Le cocontractant de l'Administration ou le titulaire du marché : </label>
                                    <input type="text" v-model="cocontractant" class="input-custom" placeholder="Le ministères de marchés publics" required>
                              </div>
                        </div>
                        <br>
                        <h6>3.2 Nantissement</h6> 
                        <div class="row">
                              <div class="col-md-6">
                                    <label class="label-custom" for="dossier">L’autorité chargée de l’ordonnancement des paiements est :</label>
                                    <input type="text" v-model="autorite_ordonnancement" class="input-custom" placeholder="Le ministères de marchés publics" required>
                              </div> 
                              <div class="col-md-6">
                                    <label class="label-custom" for="dossier">L’autorité chargée de la liquidation des dépenses est : </label>
                                    <input type="text" v-model="auorite_liquidation" class="input-custom" placeholder="Le ministères de marchés publics" required>
                              </div>  
                              <div class="col-md-6">
                                    <label class="label-custom" for="dossier">L’organisme ou le responsable chargé du paiement est : </label>
                                    <input type="text" v-model="organisme_paiment" class="input-custom" placeholder="Le ministères de marchés publics" required>
                              </div>
                              <div class="col-md-6">
                                    <label class="label-custom" for="dossier">Le responsable compétent pour fournir les renseignements au titre de l’exécution du présent marché est : </label>
                                    <input type="text" v-model="responsable_renseignement" class="input-custom" placeholder="Le ministères de marchés publics" required>
                              </div>
                        </div>
                  </div>
            </div>
          </div>

          <div v-else-if="currentStep === 1">
            <div class="mt-3">
                  <h5 class="fw-bold mb-4">Article 5. Pièces constitutives du marché</h5>
                  <div class="row">
                        <div class="col-md-12">   
                        <label for="consistence_travaux">Les pièces contractuelles constitutives du présent marché sont complémentaires. Elles sont par ordre de priorité :</label>
                        <RichTextarea v-model="pieces_constitutive_marche" />
                        </div>
                  </div>
            </div>
            
            <div class="mt-5">
                  <h5 class="fw-bold mb-4">Article 6. Textes généraux applicables au marché </h5>
                  <div class="row">
                  <div class="col-md-12">   
                        <label for="consistence_travaux">Le présent marché est soumis aux textes généraux ci-après :</label>
                        <RichTextarea v-model="textes_applicables" />
                  </div>
                  </div>
            </div> 
          </div>

          <div v-else-if="currentStep === 2">
                  <div class="mt-3">
                        <h5 class="fw-bold mb-4">Article 8. Communication </h5>
                        <div class="row">
                              <div class="col-md-12">   
                              <RichTextarea v-model="communication" />
                              </div>
                        </div> 
                  </div>
                  <div class="mt-3">
                        <h5 class="fw-bold mb-4">Article 9. Consistance des prestations </h5>
                        <div class="row">
                              <div class="col-md-12">   
                              <RichTextarea v-model="consistance_prestation" />
                              </div>
                        </div> 
                  </div>
          </div>

          <div v-else-if="currentStep === 3">
                  <div class="mt-3">
                        <h5 class="fw-bold mb-4">Article 10. Délais d’exécution du marché </h5>
                        <div class="row">
                              <div class="col-md-12">   
                              <RichTextarea v-model="delai_execution" />
                              </div>
                        </div> 
                  </div> 
                  <div class="mt-3">
                        <h5 class="fw-bold mb-4">Article 14. Marchés à tranches conditionnelles </h5>
                        <div class="row">
                              <div class="col-md-12">   
                                    <RichTextarea v-model="marche_a_tranche" />
                              </div>
                        </div> 
                  </div> 
                  <div class="mt-3">
                        <h5 class="fw-bold mb-4">Article 15. Personnel et Matériel du cocontractant </h5>
                        <div class="row">
                              <div class="col-md-12">   
                                    <RichTextarea v-model="personnel_entreprise" />
                              </div>
                        </div> 
                  </div> 
          </div>

          <div v-else-if="currentStep === 4">
                  <h5 class="fw-bold mb-4">Article 15. Personnel et Matériel du cocontractant </h5>
                  <div class="mt-3"> 
                        <div class="row">
                              <h6 class="fw-bold mb-4">15.1 Personnel de l’entreprise </h6>
                              <div class="col-md-12">   
                                    <RichTextarea v-model="personnel_entreprise" />
                              </div>
                        </div> 
                  </div> 
                  <div class="mt-3"> 
                        <div class="row">
                              <h6 class="fw-bold mb-4">15.2 Remplacement du personnel clé</h6>
                              <div class="col-md-12">   
                                    <RichTextarea v-model="replacement_personnel" />
                              </div>
                        </div> 
                  </div>   
          </div>

          <div v-else-if="currentStep === 5">
                  <h5 class="fw-bold mb-4">Article 16. Personnel et Matériel du cocontractant </h5>
                  <div class="mt-3"> 
                        <div class="row">
                              <h6 class="fw-bold mb-4">16.1 Programme des travaux, Plan d’assurance qualité et autres</h6>
                              <div class="col-md-12">   
                                    <RichTextarea v-model="programme_travaux" />
                              </div>
                        </div> 
                  </div>  
                  <div class="mt-3"> 
                        <div class="row">
                              <h6 class="fw-bold mb-4">16.2 Projet d’exécution</h6>
                              <div class="col-md-12">   
                                    <RichTextarea v-model="projet_execution" />
                              </div>
                        </div> 
                  </div> 
          </div>


          <!-- Navigation -->
          <div class="buttons mt-4 text-center">
            <button type="button" class="btn-custom" @click="prevStep" :disabled="currentStep === 0"><i class="bi bi-arrow-left-circle"></i> Précédent</button> &nbsp;
            <button type="button" class="btn-custom" v-if="!isLastStep" @click="nextStep">Suivant <i class="bi bi-arrow-right-circle"></i></button>
            <button class="btn-custom" type="submit" v-else>Enregister</button>
          </div>
        </StepperForm>
      </form> 
  </div>
      
</template>

<script setup>
import { ref } from 'vue'
import RichTextarea from '@/components/RichTextarea.vue';
import HeaderPiece from '@/components/HeaderPiece.vue'
import StepperForm from '@/components/StepperForm.vue' 


const communication = ref(`<p>Toutes les communications au titre du présent marché sont écrites et les notifications faites aux adresses ci-après</p>
<p> a) Dans le cas où le cocontractant est le destinataire : 
Madame/Monsieur le : 
<ul>
     <li>BP :</li> 
     <li>Téléphone :</li>
     <li>Fax :</li>
</ul>
</p>
<p> b) Dans le cas où le Maître d’Ouvrage ou Maître d’Ouvrage Délégué en est le destinataire : 
Madame/Monsieur le : 
<ul>
     <li>BP :</li> 
     <li>Téléphone :</li>
     <li>Fax :</li>
</ul>
</p>
<p>avec copie adressée dans les mêmes délais au Chef de service, et à l’ingénieur.</p>
`) 

const consistance_prestation = ref(`<p>Les travaux à réaliser dans le cadre du présent marché comprennent :</p>`)

const delai_execution = ref(`
<p>10.1 Le délai d’exécution des travaux objet du présent marché est de trois (03) Mois.</p>
<p>10.2 Ce délai court à compter de la date de notification de l’ordre de service de commencer les travaux, sauf stipulation contraire [à préciser].</p>
<p>10.3 Pour les marchés à tranches conditionnelles, le délai de chaque tranche, qui court à compter de la date de notification de l’ordre de service de commencer les travaux de la tranche considérée est de: </p>
<table>
      <tr><th>Tranche</th><th>Délai(en mois)</th></tr>
      <tr><td></td><td></td></tr>
</table>

`)

const marche_a_tranche = ref(`<p><strong>14.1.</strong> [Préciser si le marché comporte une ou plusieurs tranches et les conditions de notification de chacune des tranches].  
  À la fin d’une tranche, le Maître d’Ouvrage ou le Maître d’Ouvrage Délégué procèdera à la réception des prestations de la tranche considérée et délivrera une attestation de bonne exécution au Cocontractant à l’année d’exécution du contrat. Cette réception conditionnera le début de la tranche conditionnelle suivante.</p>

  <p><strong>14.2.</strong> Le délai à compter de la date de réception provisoire de la tranche précédente pour la signature et la notification par le Maître d’Ouvrage ou le Maître d’Ouvrage Délégué de l’ordre de service de commencer une tranche conditionnelle est de : [nombre de jours à préciser le cas échéant].</p>

  <p><strong>14.3.</strong> Le délai de notification de cet ordre de service par le Chef de service du marché est de quinze (15) jours maximums. Ce délai est le même que celui de la tranche ferme.</p>`)

const personnel_entreprise = ref(`<p>L’entreprise est tenue d’utiliser le personnel proposé dans l’offre, dont l’équipe se compose comme suit : </p>
<p>Personnel clé pour l’exécution des travaux : </p>
<ul>
   <li>Chef de projet: </li> 
   <li>Conducteur des travaux: </li>
   <li>Autres personnels clés: </li>  
</ul>
<p>Indiquer par ailleurs le personnel à recruter dans le cas de l’approche HIMO le cas échéant, ainsi que le mode
de leur rémunération.</p>
`)

const replacement_personnel = ref(`<p>
    Toute modification, même partielle, apportée aux propositions de l’offre technique n’interviendra qu’après agrément écrit du Maître d’Ouvrage ou du Maître d’Ouvrage Délégué ou du Chef de service du marché.
    En cas de modification, le cocontractant le fera remplacer par un personnel de compétence (qualifications et expérience) au moins égale ou par un matériel de performance similaire et en bon état de marche.
  </p>

  <p>
    En tout état de cause, les listes du personnel d’encadrement à mettre en place seront préalablement soumises à l’agrément écrit du Maître d’Œuvre ou de l’ingénieur le cas échéant dans les jours 
    <strong>x_________________</strong> (jours à préciser) qui suivent la notification de l’ordre de service de commencer les travaux. Passé ce délai, les listes seront considérées comme approuvées.
  </p>

  <p>
    Le Maître d’Œuvre ou l’ingénieur le cas échéant disposera de <strong>x………</strong> jours (à préciser) pour notifier par écrit son avis au Chef de service du Marché.
    Le Maître d’Ouvrage se réserve la possibilité de refuser son agrément à une personne proposée par le cocontractant dont la qualification serait insuffisante.
  </p>

  <p>
    Toute modification unilatérale apportée aux propositions en personnel d’encadrement de l’offre technique, avant et pendant les travaux constitue un motif de résiliation du marché tel que visé à l’article 41 ci-dessous ou d’application de pénalités [A préciser].
  </p>

  <p>
    Toute modification apportée sera notifiée au Maître d’Ouvrage pour approbation préalable.
  </p>`)

const programme_travaux = ref(`</ul>

  <p>Ce programme sera exclusivement présenté selon les modèles fournis et comprendra notamment :</p>
  <ul>
    <li>Le PV de définition des tâches à exécuter, le cas échéant ;</li>
    <li>La liste des travaux à sous-traiter ;</li>
    <li>La description des modalités de maintien de la circulation, le cas échéant ;</li>
    <li>Etc.</li>
  </ul>

  <p>Deux (2) exemplaires de ces pièces lui seront retournés dans un délai de [A préciser] à partir de leur réception avec :</p>
  <ul>
    <li>Soit la mention d'approbation « BON POUR EXECUTION » ;</li>
    <li>Soit la mention de leur rejet accompagnée des motifs dudit rejet.</li>
  </ul>

  <p>Le cocontractant de l’administration disposera alors de [A préciser] pour présenter un nouveau projet. Le Chef de Service ou le Maître d’Œuvre disposera alors d’un délai de [A préciser] pour donner son approbation ou faire d’éventuelles remarques. Les délais d’approbation du projet d’exécution sont suspensifs du délai d’exécution.</p>

  <p>L'approbation donnée par le Chef de Service ou le Maître d’Œuvre n'atténuera en rien la responsabilité du cocontractant. Cependant, les travaux exécutés avant l'approbation du programme ne seront ni constatés ni rémunérés sauf s’ils ont été expressément ordonnés. Le planning actualisé et approuvé deviendra le planning contractuel.</p>

  <p>Le cocontractant de l’administration tiendra constamment à jour, sur le chantier, un planning des travaux qui tiendra compte de l'avancement réel du chantier. Des modifications importantes ne pourront être apportées au programme contractuel qu'après avoir reçu l'accord du Chef de service du Marché.</p>

  <p>Après approbation du programme d’exécution par le Chef de service du Marché, celui-ci le transmettra dans un délai de [A préciser] au Maître d’Ouvrage ou au Maître d’Ouvrage Délégué, sans effet suspensif de son exécution. Toutefois, s’il est constaté des modifications importantes dénaturant l’objectif du marché ou la consistance des travaux, le Maître d’Ouvrage ou le Maître d’Ouvrage Délégué retournera le programme d’exécution accompagné des réserves à lever dans un délai de quinze (15) jours à compter de sa date de réception.</p>

  <p><strong>b)</strong> Le Plan de Gestion Environnemental et Social fera ressortir notamment les conditions de choix des sites techniques et de base vie, les conditions d’emprunt de sites d’extraction et les conditions de remise en état des sites de travaux et d’installation.</p>

  <p><strong>c)</strong> Le cocontractant indiquera dans ce programme les matériels et méthodes qu’il compte utiliser ainsi que les effectifs du personnel qu’il compte employer.</p>

</body>`)

const projet_execution = ref(`<p><strong>a.</strong> Dans un délai maximum de [à préciser] jours, à compter de la date de notification de l’ordre de service de commencer les travaux, le Cocontractant soumettra à l’approbation de l’Ingénieur ou du Maître d’œuvre le cas échéant, un projet d’exécution en [à préciser] exemplaires comprenant notamment :</p>

  <ul>
    <li>Le procès-verbal de définition des tâches à exécuter ;</li>
    <li>Le relevé des dégradations, le cas échéant ;</li>
    <li>Le schéma itinéraire ou le linéaire des travaux à exécuter, le cas échéant ;</li>
    <li>La description des procédés et des méthodes d’exécution des travaux envisagés avec les prévisions d’emploi du personnel, du matériel et des matériaux ;</li>
    <li>Les plans d’exécution des ouvrages et les notes de calcul y afférentes ;</li>
    <li>Les plans d’approvisionnement ;</li>
    <li>Le planning graphique des travaux ;</li>
    <li>La liste des travaux que le cocontractant fera le cas échéant, exécuter par des sous-traitants.</li>
  </ul>

  <p>Le planning actualisé et approuvé deviendra le planning contractuel. Il doit faire apparaître les tâches critiques.</p>

  <p>Le cocontractant tiendra constamment à jour sur le chantier un planning actualisé des travaux qui tiendra compte de l’avancement réel du chantier.</p>

  <p>En cas d’inobservation des délais d’approbation des documents ci-dessus par l’Administration, ceux-ci sont réputés approuvés.</p>`)

</script>