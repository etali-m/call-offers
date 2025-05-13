<template>
      <HeaderPiece numero_piece="4" nom_piece="CAHIER DES CLAUSES ADMINISTRATIVES PARTICULIERES" numero_dossier="0089/AONO/MINEE/CIPM/2024" moe="Ministère de l'eau et de l'energie" description_travaux="TRAVAUX DE CONSTRUCTION DES CANIVEAUX BETONNES DANS LA COMMUNE DE YAOUNDE 4"/>

      <div class="form-container">  
      <form @submit.prevent="handleSubmit" style="padding-left:10px;">
        <StepperForm :totalSteps="12" v-slot="{ currentStep, nextStep, prevStep, isLastStep }">
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

          <div v-else-if="currentStep === 6">
                  <div class="mt-3"> 
                        <div class="row">
                              <h5 class="fw-bold mb-4">Article 20. Laboratoire de chantier et essais </h5>
                              <div class="col-md-12">   
                                    <RichTextarea v-model="labo_chantier" />
                              </div>
                        </div> 
                  </div> 
                  <div class="mt-3"> 
                        <h5 class="fw-bold mb-4">Article 21. Journal et Réunions de chantier </h5>
                        <div class="row">
                              <h6 class="fw-bold mb-4">21.2 Réunions de chantier</h6>
                              <div class="col-md-12">   
                                    <RichTextarea v-model="reunion_chantier" />
                              </div>
                        </div> 
                  </div>  
                  <div class="mt-3"> 
                        <h5 class="fw-bold mb-4">Article 21. Journal et Réunions de chantier </h5>
                        <div class="row">
                              <h6 class="fw-bold mb-4">21.2 Réunions de chantier</h6>
                              <div class="col-md-12">   
                                    <RichTextarea v-model="reunion_chantier" />
                              </div>
                        </div> 
                  </div>
                  <div class="mt-3"> 
                        <h5 class="fw-bold mb-4">Article 22. Utilisation des explosifs </h5>
                        <div class="row">
                              <span class="fw-bold mb-4">Utilisation des explosifs</span>
                              <div class="col-md-12">   
                                    <RichTextarea v-model="utilisation_explosifs" />
                              </div>
                        </div> 
                  </div>
          </div>

            <div v-else-if="currentStep === 7">
                  <div class="mt-3"> 
                        <h5 class="fw-bold mb-4">Article 24. Laboratoire de chantier et essais </h5>
                        <div class="row"> 
                              <h6 class="fw-bold mb-4">24.5 Début de la période de garantie </h6>
                              <div class="col-md-12">   
                                    <RichTextarea v-model="periode_garantie" />
                              </div>
                        </div> 
                  </div>
                  <div class="mt-3"> 
                        <h5 class="fw-bold mb-4">Article 25. Laboratoire de chantier et essais </h5>
                        <div class="row">  
                              <div class="col-md-12">   
                                    <RichTextarea v-model="documente_a_fournir" />
                              </div>
                        </div> 
                  </div>
                  <div class="mt-3"> 
                        <h5 class="fw-bold mb-4">Article 26. Garantie contractuelle / Entretien pendant la période de garantie</h5>
                        <div class="row">  
                              <h6 class="fw-bold mb-4">26.1 Délai de garantie</h6>
                              <div class="col-md-12">   
                                    <RichTextarea v-model="delai_garantie" />
                              </div>
                        </div> 
                  </div>
            </div>

            <div v-else-if="currentStep === 8">
                  <div class="mt-3"> 
                        <h5 class="fw-bold mb-4">Article 27. Réception définitive </h5>
                        <div class="row">  
                              <div class="col-md-12">   
                                    <RichTextarea v-model="art_27" />
                              </div>
                        </div> 
                  </div>
                  <div class="mt-3"> 
                        <h5 class="fw-bold mb-4">Article 37. Avances </h5>
                        <div class="row">  
                              <div class="col-md-12">   
                                    <RichTextarea v-model="art_37" />
                              </div>
                        </div> 
                  </div>
            </div>

            <div v-else-if="currentStep === 9">
                  <div class="mt-3"> 
                        <h5 class="fw-bold mb-4">Article 38. Règlement des travaux </h5>
                        <div class="row">  
                              <h6 class="fw-bold mb-4">Décompte provisoir</h6>
                              <div class="col-md-12">   
                                    <RichTextarea v-model="decompte_provisoir" />
                              </div>
                        </div> 
                  </div> 
                  <div class="mt-3">
                        <div class="row">  
                              <h6 class="fw-bold mb-4">Décompte final</h6>
                              <div class="col-md-12">   
                                    <RichTextarea v-model="decompte_final" />
                              </div>
                        </div> 
                  </div>
                  <div class="mt-3">
                        <div class="row">  
                              <h6 class="fw-bold mb-4">Décompte général et définitif</h6>
                              <div class="col-md-12">   
                                    <RichTextarea v-model="decompte_defintif" />
                              </div>
                        </div> 
                  </div>
            </div>


            <div v-else-if="currentStep === 10">
                  <div class="mt-3"> 
                        <h5 class="fw-bold mb-4">Article 42. Régime fiscal et douanier </h5>
                        <div class="row">   
                              <div class="col-md-12">   
                                    <RichTextarea v-model="art_42" />
                              </div>
                        </div> 
                  </div> 
            </div>

            <div v-else-if="currentStep === 11">
                  <div class="mt-3"> 
                        <h5 class="fw-bold mb-4">Article 45. Cas de force majeure </h5>
                        <div class="row">   
                              <div class="col-md-12">   
                                    <RichTextarea v-model="art_45" />
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

const labo_chantier = ref(`<p>
    Le cocontractant est tenu d’avoir sur le chantier son propre laboratoire permettant d’exécuter tous les essais
    d’identification et/ou d’étude des matériaux définis dans le CCTP. Le personnel et le matériel de ce laboratoire
    doivent recevoir l’agrément du Maître d’œuvre du marché ou de l’Ingénieur dans un délai de [à préciser].
  </p>

  <p><strong>20.1.</strong> Les essais, le cas échéant, prévus dans le cadre du présent marché comprennent : [à préciser].</p>

  <p><strong>20.2.</strong> Les équipements et matériels de laboratoire nécessaires sont : [à préciser].</p>

  <p><strong>20.3.</strong> Les modalités de mise en œuvre de ces essais sont : [à préciser].</p>

  <p>Les frais inhérents à ces essais et contrôles sont à la charge du Cocontractant.</p>`)


const reunion_chantier = ref(`<p>Outre les réunions régulières de chantier à l’initiative du maître d’œuvre, des réunions périodiques devront être
tenues en présence du Chef de service du marché et de l’Ingénieur du marché ou leur représentant. [Préciser
la fréquence].</p>
<p>Les réunions de chantier feront l’objet d’un procès-verbal signé par tous les participants.</p>
`)

const utilisation_explosifs = ref('')

const periode_garantie = ref('')

const documente_a_fournir = ref(`<p>Le Cocontractant remettra à la Maitrise d’Œuvre le cas échéant ou à l’ingénieur du marché dans les trente jours suivants la date de réception provisoire de l’ensemble des travaux, le plan de récolement.</p>
<p>25.1. [Indiquer la liste des autres documents à fournir dans un délai de 30 jours après la réception provisoire].</p>
<p>25.2. [Indiquer le montant à retenir sur la caution en termes de pénalité pour non-fourniture desdits documents].</p>
`)

const delai_garantie = ref(`<p>La durée de garantie est de [A préciser] à compter de la date de réception provisoire des travaux ou de la réception partielle le cas échéant (à préciser). 
Le Cocontractant garantit que les équipements livrés (le cas échéant) en exécution du marché sont neufs et que les travaux sont exécutés dans les règles de l’art et les normes requises.</p>`)

const art_27 = ref(`<p><strong>27.1.</strong> La réception définitive s’effectuera dans un délai maximal [de quinze (15) jours] à compter de l’expiration du délai de garantie.</p>

  <p><strong>27.2.</strong> Le Maître d’Œuvre [sera ou ne sera pas] membre de la commission.</p>

  <p><strong>27.3.</strong> La composition et la procédure de réception définitive sont la même que celles de la réception provisoire.</p>

  <p><strong>27.4.</strong> Le marché est clôturé définitivement dans les conditions fixées à l’article 38 alinéa 4 du présent CCAP concernant le Décompte général et définitif.</p>`)

const art_37 = ref(`<p><strong>37.1.</strong> Le Maître d’Ouvrage ou le Maître d’Ouvrage Délégué [accordera ou n’accordera pas] une avance de démarrage [n’excédant pas 20% du montant TTC du marché].</p>

  <p><strong>37.2.</strong> L’avance de démarrage peut être obtenue par le co-contractant de l’administration sur simple demande adressée au Maître d’Ouvrage ou au Maître d’Ouvrage Délégué sans justificatif. Cette avance commence à être remboursée par déduction d’un pourcentage : [A préciser] sur chaque décompte dès lors que le cumul des travaux atteint 40% du montant du marché. Le versement de l'avance de démarrage intervient postérieurement à la mise en place des cautions exigibles, conformément aux dispositions du code des marchés publics.</p>

  <p><strong>37.3.</strong> La totalité de l’avance doit être remboursée au plus tard dès le moment où la valeur en prix de base des prestations réalisées atteint quatre-vingt pour cent (80%) du montant du marché.</p>

  <p><strong>37.4.</strong> Au fur et à mesure du remboursement des avances, le Maître d’Ouvrage ou le Maître d’Ouvrage Délégué donnera la mainlevée de la partie de la caution correspondante, sur demande expresse du cocontractant de l’administration.</p>

  <p><strong>37.5.</strong> Le cocontractant de l’administration utilisera exclusivement l’avance de démarrage pour les acquisitions de Matériels, d’équipements, de matériaux et les dépenses de mobilisation spécialement nécessaires pour les besoins de l’exécution du Marché spécifiés dans sa demande..</p>`)

const decompte_provisoir =  ref(`<p>Les décomptes provisoires doivent être établis en sept exemplaires à une fréquence de : [À préciser comprise entre un (01) et trois (3) mois].</p>

  <p>Le Maître d’œuvre ou l’Ingénieur dispose d’un délai de : [À préciser (un délai de zéro (0) à sept (7) jours ouvrables maxi)] pour transmettre au Chef de service du marché, le projet de décompte qu’il a approuvé.</p>

  <p>Le Chef de service quant à lui dispose d’un délai de : [À préciser (de zéro (0) à vingt-et-un (21) jours ouvrables maxi)] pour procéder à la liquidation et à sa transmission au comptable chargé du paiement, avec copie à l’organisme chargé du contrôle externe.</p>

  <p>Les copies des décomptes provisoires doivent être transmises au Ministère en charge des marchés publics et à l’organisme chargé de la régulation des marchés publics.</p>

  <p>Le délai maximum accordé au comptable assignataire pour le règlement des acomptes est fixé à quatre-vingt-dix (90) jours à compter de la date de réception des décomptes transmis par le Chef de service du marché.</p>

  <p>Le montant HTVA de l’acompte à payer au cocontractant de l’administration sera mandaté comme suit :</p>
  <ul>
    <li>HTVA - [AIR ou TSR] versé directement au compte du cocontractant de l’administration ;</li>
    <li>TVA au taux en vigueur ;</li>
    <li>[AIR ou TSR] versé au Trésor public au titre de l’AIR ou de la TSR dû par le cocontractant.</li>
  </ul>
`)

const decompte_final = ref(`
<p>Après achèvement des travaux et dans un délai maximum de [A préciser] jours après la date de réception provisoire, le cocontractant établira à partir des constats contradictoires, le projet de décompte final des travaux effectivement réalisés qui récapitule le montant total des sommes auxquelles il peut prétendre du fait de l’exécution du marché dans son ensemble.</p>
<p>Ce projet de décompte final, une fois rectifié par le Maître d’œuvre ou l’ingénieur et accepté par le Chef de service du marché devient final. Il sert à l’établissement de l’acompte pour solde du marché, établi dans les mêmes conditions que celles définies pour l’établissement des décomptes mensuels.</p>

<p><strong>Article 38.3.2</strong> [Indiquer le délai dont dispose le Chef de service pour notifier le projet rectifié et accepté au Maître d’Œuvre, (1 mois maximum)]</p>

<p><strong>Article 38.3.4</strong> Le cocontractant de l’administration doit, dans un délai maximal d’un mois suivant la date de cette notification, renvoyer le décompte final revêtu de sa signature sans ou avec réserves, ou faire connaître les raisons pour lesquelles il refuse de signer.</p>

<p>Dans le cas où le cocontractant signe avec réserve ou ne signe pas le décompte final, les motifs de ce refus ou de ces réserves doivent être exposés par le cocontractant dans un mémoire récapitulatif de toutes les réclamations dont il revendique le paiement, accompagné des justificatifs nécessaires, et transmis au Maître d’œuvre dans le même délai que ci-dessus, sous peine de forclusion.</p>

<p>Le règlement du différend intervient alors selon les dispositions du code des marchés publics en vigueur et du CCAG applicable.</p>
`)

const decompte_defintif = ref(`
  <p>
    <strong>38.4.1</strong>
    [Indiquer le délai dont dispose le Chef de service ou le Maître d’Œuvre pour établir le décompte général
    et définitif au cocontractant de l’administration après la réception définitive (1 mois maximum)]
  </p>

  <p>
    À la fin de la période de garantie qui donne lieu à la réception définitive des travaux, le Chef de service dresse
    le décompte général et définitif du marché qu’il fait signer contradictoirement par le cocontractant et le Maître
    d’Ouvrage ou le Maître d’Ouvrage Délégué. Ce décompte comprend :
  </p>
  <ul>
    <li>Le décompte final ;</li>
    <li>Le solde ;</li>
    <li>La récapitulation des acomptes mensuels.</li>
  </ul>

  <strong>
    La signature du décompte général et définitif sans réserve par le cocontractant lie définitivement les
    parties et met fin au marché, et libère le cocontractant et le Maître d’Ouvrage ou le Maître d’Ouvrage
    Délégué de toutes leurs obligations, sauf en ce qui concerne les intérêts moratoires.
  </strong>

  <p>
    <strong>38.4.2</strong>
    [Indiquer le délai dont dispose le cocontractant pour renvoyer le décompte général et définitif revêtu de
    sa signature (1 mois maximum)]
  </p>

  <p>
    La transmission du décompte général et définitif à l’Organisme payeur en vue du paiement est subordonnée au
    visa préalable du MINMAP. Pour cela, une copie de l’attachement correspondant et tous les décomptes
    provisoires devront lui être antérieurement transmis ou remis à son représentant sur le site, le cas échéant.
  </p>

  <p>
    Les délais et les modalités de signature ainsi que de gestion des désaccords sont les mêmes que ceux du
    décompte final.
  </p>`)

const art_42 = ref(`
<p>Le marché est soumis au régime fiscal et douanier en vigueur en République du Cameroun. Le marché est conclu tout taxes comprises, conformément à la loi n°…………… du …. Portant loi de finances de la République du Cameroun pour l’exercice ……et au Code Général des Impôts qui définissent les modalités de mise en œuvre du régime fiscal des Marchés Publics</p>
<p>La fiscalité applicable au présent marché comporte notamment :</p>
<ul>
    <li>Des impôts et taxes relatifs aux bénéfices industriels et commerciaux, y compris l’AIR qui constitue un précompte sur l’impôt des sociétés ;</li>
    <li>Des droits d’enregistrement calculés conformément aux stipulations du code des impôts ;</li>
    <li>Des droits et taxes attachés à la réalisation des prestations prévues par le marché, notamment :</li>
    <ul>
      <li>Des droits et taxes d’entrée sur le territoire camerounais (droits de douane, TVA, taxe informatique) ;</li>
      <li>Des droits et taxes communaux ;</li>
      <li>Des droits et taxes relatifs aux prélèvements des matériaux et d’eau.</li>
    </ul>
  </ul>
<p>Ces éléments doivent être intégrés dans les charges que le cocontractant impute sur ses coûts d’intervention et constituer l’un des éléments des sous-détails des prix hors taxes. Le prix TTC s’entend TVA incluse. </p>
<p>Sauf mention spécifique contraire figurant au Marché, le cocontractant devra supporter et payer tous droits, taxes, impôts et charges lui incombant ainsi qu’à ses sous-traitants.</p>
`)

const art_45 = ref(` <p>
    Le titulaire du marché ne sera pas tenu responsable des retards imputables à un cas de force majeure.
    Dans un tel cas, il devra avertir par écrit le Maître d’Ouvrage ou le Maître d’Ouvrage Délégué dans un délai de 
    <strong>[à préciser, ex. : 5 jours]</strong> suivant l’apparition du cas de force majeure, en fournissant une estimation
    des retards susceptibles d’en résulter.
  </p>

  <p>
    Chaque fois qu’un cas de force majeure provoquera un retard, le titulaire du marché aura droit, si le Maître
    d’Ouvrage reconnaît la réalité du cas invoqué, à une prorogation des délais d’exécution.
  </p>

  <p>
    Aux fins du présent marché, la <strong>force majeure</strong> désigne les circonstances prévues par les dispositions du 
    <strong>CCAG</strong> en vigueur, ainsi que les situations particulières suivantes le cas échéant :
  </p>

  <ul>
    <li>Les catastrophes naturelles imprévisibles et irrésistibles (séismes, inondations majeures, etc.) ;</li>
    <li>Les conflits armés, guerres civiles ou insurrections ;</li>
    <li>Les pandémies et épidémies reconnues par les autorités compétentes ;</li>
    <li>Les décisions administratives ou juridiques de portée générale empêchant l’exécution du contrat.</li>
  </ul>

  <p>
    Les cas de force majeure seront constatés conformément aux dispositions du CCAG. Il appartient au Maître
    d’Ouvrage d’apprécier le caractère de force majeure ainsi que la pertinence des justificatifs fournis par le
    titulaire.
  </p>

  <h3>Seuils minimaux pour les conditions météorologiques</h3>

  <p>Lorsqu’un cas de force majeure est invoqué au titre des conditions météorologiques, aucune réclamation ne sera admise en deçà des seuils suivants :</p>

  <ul>
    <li><strong>Pluie :</strong> 200 millimètres en 24 heures ;</li>
    <li><strong>Vent :</strong> 40 mètres par seconde ;</li>
    <li><strong>Crue :</strong> Crue de fréquence décennale.</li>
  </ul>
`)

</script>