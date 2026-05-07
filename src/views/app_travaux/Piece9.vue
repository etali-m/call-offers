<template>
  <Loader v-if="isLoading" />

  <div v-else>
    <HeaderPiece numero_piece="1" :numero_dossier="dao.numero_appel_offre" :moe="dao.maitre_ouvrage" :description_travaux="dao.objet_appel"/>
      
    <PieceNavigator 
      :project-id="dao.id"
      :current-piece-name="$route.name"
      />


    <div class="form-container bg-white mt-3">   
      <div style="font-size: 12pt; color: #1a1a1a; line-height: 1.5; margin: 20px auto; padding: 15mm 20mm 15mm 20mm; box-sizing: border-box; height: 500px; overflow-y:auto;">
        

        <!-- EN-TÊTE BILINGUE -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
          <tr>
            <td style="width: 45%; vertical-align: top; font-size: 10pt; line-height: 1.7;">
              <strong>REPUBLIQUE DU CAMEROUN</strong><br>
              Paix &#8211; Travail &#8211; Patrie<br>
              &#8213;&#8213;&#8213;&#8213;&#8213;<br>
              <em>{{ dao.maitre_ouvrage }}</em><br>
              &#8213;&#8213;&#8213;&#8213;&#8213;
            </td>
            <td style="width: 10%; text-align: center; vertical-align: middle;">
              <img :src="dao.logo" width="80" height="100">
            </td>
            <td style="width: 45%; text-align: right; vertical-align: top; font-size: 10pt; line-height: 1.7;">
              <strong>REPUBLIC OF CAMEROON</strong><br>
              Peace &#8211; Work &#8211; Fatherland<br>
              &#8213;&#8213;&#8213;&#8213;&#8213;<br>
              <em>{{ dao.maitre_ouvrage }}</em><br>
              &#8213;&#8213;&#8213;&#8213;&#8213;
            </td>
          </tr>
        </table>
        <br><br>

        <!-- RÉFÉRENCES DU MARCHÉ -->
        <div style="margin-bottom: 6px; text-transform: uppercase; font-weight:bold">
          <span style="font-weight: bold; font-size: 11pt;">MARCHÉ N°</span>
          <span style="display: inline-block; border-bottom: 1px solid #1a1a1a; min-width: 120px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span style="font-size: 10pt;">/M </span>
        </div>

        <div style="margin-bottom: 4px; font-size: 10pt; text-transform: uppercase;">
          <span style="font-weight: bold;">
            Passé après Appel d'Offres &nbsp; {{ dao.type_dossier }} {{ dao.mode_passation }}
            &nbsp;N°
            {{ dao.numero_appel_offre }} DU ___________/{{ dao.exercice_budgetaire }}
          </span> POUR : <span style="font-weight: bold;">{{ dao.objet_appel }}</span>
        </div> 
        <br>
        <!-- PARTIES DU MARCHÉ -->
        <div style=" padding: 12px 16px; margin-bottom: 16px; font-size: 10pt; line-height: 1.9;">
          <div>
            <strong>Maître d'Ouvrage ou Maître d'Ouvrage Délégué :</strong>
            <span style="font-style: italic;">{{ dao.maitre_ouvrage }}</span>
          </div>
          <div style="margin-top: 6px;">
            <strong style="font-size: 11pt;">TITULAIRE :</strong>
            <span style="font-style: italic;">[indiquer le titulaire et son adresse complète]</span>
          </div>
          <div style="margin-top: 6px; padding-left: 24px; line-height: 2;">
            B.P : <span style="display: inline-block; border-bottom: 1px solid #888; min-width: 100px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;
            Tél : <span style="display: inline-block; border-bottom: 1px solid #888; min-width: 100px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;
            Fax : <span style="display: inline-block; border-bottom: 1px solid #888; min-width: 100px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><br>
            N° R.C : <span style="display: inline-block; border-bottom: 1px solid #888; min-width: 80px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;
            N° Contribuable : <span style="display: inline-block; border-bottom: 1px solid #888; min-width: 100px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;
            RIB : <span style="display: inline-block; border-bottom: 1px solid #888; min-width: 80px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </div>
        </div>

        <!-- OBJET DU MARCHÉ -->
        <div style="margin-bottom: 10px; font-size: 10.5pt;">
          <strong>OBJET :</strong>
          <span style="font-style: italic;">Exécution des travaux&nbsp; {{ dao.objet_appel }}</span>
        </div>

        <div style="margin-bottom: 14px; font-size: 10pt;">
          Lot n°&nbsp;<span style="display: inline-block; border-bottom: 1px solid #888; min-width: 160px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;; Réseau
        </div>

        <!-- Tableau tronçons -->
        <table style="border-collapse: collapse; width: 90%; margin: 0 auto 20px auto; font-size: 10pt;">
          <thead>
            <tr style="background: #e8e8e8;">
              <th style="border: 1px solid #888; padding: 6px 10px; text-align: center; width: 18%;">N° tronçon</th>
              <th style="border: 1px solid #888; padding: 6px 10px; text-align: center; width: 15%;">N° route</th>
              <th style="border: 1px solid #888; padding: 6px 10px; text-align: center; width: 50%;">Itinéraire</th>
              <th style="border: 1px solid #888; padding: 6px 10px; text-align: center; width: 17%;">Long. (km)</th>
            </tr>
          </thead>
          <tbody>
            <tr style="height: 22px;"><td style="border: 1px solid #888; padding: 4px;">&nbsp;</td><td style="border: 1px solid #888; padding: 4px;">&nbsp;</td><td style="border: 1px solid #888; padding: 4px;">&nbsp;</td><td style="border: 1px solid #888; padding: 4px;">&nbsp;</td></tr>
            <tr style="height: 22px;"><td style="border: 1px solid #888; padding: 4px;">&nbsp;</td><td style="border: 1px solid #888; padding: 4px;">&nbsp;</td><td style="border: 1px solid #888; padding: 4px;">&nbsp;</td><td style="border: 1px solid #888; padding: 4px;">&nbsp;</td></tr>
            <tr style="height: 22px;"><td style="border: 1px solid #888; padding: 4px;">&nbsp;</td><td style="border: 1px solid #888; padding: 4px;">&nbsp;</td><td style="border: 1px solid #888; padding: 4px;">&nbsp;</td><td style="border: 1px solid #888; padding: 4px;">&nbsp;</td></tr>
            <tr>
              <td colspan="3" style="border: 1px solid #888; padding: 6px 10px; font-weight: bold; background: #f0f0f0;">Total</td>
              <td style="border: 1px solid #888; padding: 4px;">&nbsp;</td>
            </tr>
          </tbody>
        </table>

        <!-- INFORMATIONS CONTRACTUELLES -->
        <div style="font-size: 10.5pt; line-height: 2; margin-bottom: 16px;">
          <div>
            <strong>LIEU :</strong>
            Région&nbsp; {{ dao.region }} département de {{ dao.departement }}
          </div>
          <div>
            <strong>DÉLAI D'EXÉCUTION :</strong>
            <span style="display: inline-block; border-bottom: 1px solid #888; min-width: 120px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            (&nbsp;<span style="display: inline-block; border-bottom: 1px solid #888; min-width: 30px;">&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;) mois
          </div>
          <div><strong>MONTANT EN FCFA :</strong></div>
        </div>

        <!-- Tableau montants -->
        <table style="border-collapse: collapse; margin: 0 auto 20px auto; font-size: 10pt; width: 60%;">
          <tbody>
            <tr>
              <td style="border: 1px solid #888; padding: 7px 16px; font-weight: bold; background: #f0f0f0; width: 45%;">TTC</td>
              <td style="border: 1px solid #888; padding: 7px 16px; min-width: 140px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
            </tr>
            <tr>
              <td style="border: 1px solid #888; padding: 7px 16px; font-weight: bold; background: #f0f0f0;">HTVA</td>
              <td style="border: 1px solid #888; padding: 7px 16px;">&nbsp;</td>
            </tr>
            <tr>
              <td style="border: 1px solid #888; padding: 7px 16px; font-weight: bold; background: #f0f0f0;">TVA</td>
              <td style="border: 1px solid #888; padding: 7px 16px;">&nbsp;</td>
            </tr>
            <tr>
              <td style="border: 1px solid #888; padding: 7px 16px; font-weight: bold; background: #f0f0f0;">AIR</td>
              <td style="border: 1px solid #888; padding: 7px 16px;">&nbsp;</td>
            </tr>
            <tr>
              <td style="border: 1px solid #888; padding: 7px 16px; font-weight: bold; background: #e0e0e0;">Net à mandater</td>
              <td style="border: 1px solid #888; padding: 7px 16px;">&nbsp;</td>
            </tr>
          </tbody>
        </table>

        <div style="font-size: 10.5pt; line-height: 2; margin-bottom: 24px;">
          <div>
            <strong>FINANCEMENT :</strong>
            <span style="font-style: italic;">{{ dao.financement }}</span>
          </div>
          <div>
            <strong>IMPUTATION :</strong>
            <span style="font-style: italic;">{{ dao.imputation }}</span>
          </div>
        </div>

        <!-- DATES -->
        <div style="text-align: right; font-size: 10pt; line-height: 2; margin-bottom: 30px;">
          <div>SOUSCRIT,&nbsp;&nbsp;&nbsp;LE&nbsp;<span style="display: inline-block; border-bottom: 1px solid #888; min-width: 100px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
          <div>SIGNÉ,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LE&nbsp;<span style="display: inline-block; border-bottom: 1px solid #888; min-width: 100px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
          <div>
            NOTIFIÉ,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LE&nbsp;<span style="display: inline-block; border-bottom: 1px solid #888; min-width: 100px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            &nbsp;&nbsp;&nbsp;&nbsp;ENREGISTRÉ,&nbsp;LE&nbsp;<span style="display: inline-block; border-bottom: 1px solid #888; min-width: 100px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </div>
        </div>

        <!-- PARTIES CONTRACTANTES -->
        <div style="font-size: 10.5pt; line-height: 1.9;">
          <h4 style="font-size: 11pt; margin: 0 0 6px 0;">Entre :</h4>

          <p style="margin: 0 0 4px 0;">
            L'administration camerounaise, représentée par&nbsp;
            <span style="display: inline-block; border-bottom: 1px solid #888; min-width: 200px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </p>
          <p style="margin: 0 0 4px 0;">Dénommée ci-après :</p>

          <div style="padding: 8px 16px; display: inline-block; margin: 6px 0 12px 0; font-style: italic; font-weight: bold;">
            « Le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué ou Autorité contractante »
          </div>

          <h4 style="font-size: 11pt; margin: 0 0 10px 0;">D'une part,</h4>
          <h4 style="font-size: 11pt; margin: 0 0 10px 0;">Et</h4>

          <div style="padding: 12px 16px; margin-bottom: 12px; line-height: 2;">
            <div>
              <h4 style="font-size: 11pt; margin: 0 0 4px 0;">
                La société&nbsp;
                <span style="display: inline-block; border-bottom: 1px solid #888; min-width: 200px; font-weight: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              </h4>
            </div>
            <div style="font-size: 10pt;">
              B.P :&nbsp;<span style="display: inline-block; border-bottom: 1px solid #888; min-width: 80px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;
              Tél :&nbsp;<span style="display: inline-block; border-bottom: 1px solid #888; min-width: 80px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;
              Fax :&nbsp;<span style="display: inline-block; border-bottom: 1px solid #888; min-width: 80px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </div>
            <div style="font-size: 10pt;">
              N° R.C :&nbsp;<span style="display: inline-block; border-bottom: 1px solid #888; min-width: 100px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;
              N° Contribuable :&nbsp;<span style="display: inline-block; border-bottom: 1px solid #888; min-width: 120px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </div>
          </div>

          <p style="margin: 0 0 4px 0; font-size: 10pt;">
            Représenté par Monsieur / Madame&nbsp;
            <span style="display: inline-block; border-bottom: 1px solid #888; min-width: 140px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>,
            son Directeur Général ou son représentant, ci-après désigné :
          </p>

          <div style="padding: 8px 16px; display: inline-block; margin: 6px 0 16px 0; font-style: italic; font-weight: bold;">
            « le Cocontractant »
          </div>

          <h4 style="font-size: 11pt; margin: 0 0 16px 0;">D'autre part,</h4>

          <p style="text-align: center; font-size: 10.5pt; font-style: italic; margin-bottom: 0;">
            Il a été convenu et arrêté ce qui suit :
          </p>
        </div>

        <div style="page-break-after: always;"></div>

        <!-- SOMMAIRE -->
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="font-size: 15pt; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 24px;">SOMMAIRE</h2>
        </div>

        <table style="width: 85%; margin: 0 auto; border-collapse: collapse; font-size: 10.5pt;">
          <tbody>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 10px 12px; font-weight: bold; color: #333; width: 12%;">Titre I</td>
              <td style="padding: 10px 12px;">Cahier des Clauses Administratives Particulières (CCAP)</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd; background: #f9f9f9;">
              <td style="padding: 10px 12px; font-weight: bold; color: #333;">Titre II</td>
              <td style="padding: 10px 12px;">Cahier des Clauses Techniques Particulières (CCTP)</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 10px 12px; font-weight: bold; color: #333;">Titre III</td>
              <td style="padding: 10px 12px;">Bordereau des Prix Unitaires (BPU)</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 10px 12px; font-weight: bold; color: #333;">Titre IV</td>
              <td style="padding: 10px 12px;">Détail Quantitatif et Estimatif (DQE)</td>
            </tr>
          </tbody>
        </table>

        <br><br>

        <!-- DERNIÈRE PAGE -->
        <div style="font-size: 10.5pt; line-height: 1.8; margin-bottom: 16px;">
          <div>
            Page&nbsp;<span style="display: inline-block; border-bottom: 1px solid #888; min-width: 40px;">&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;
            et Dernière du Marché N°&nbsp;
            <span style="display: inline-block; border-bottom: 1px solid #888; min-width: 100px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            /M  
          </div>
          <div style="margin-bottom: 4px; font-size: 10pt; text-transform: uppercase;">
            <span style="font-weight: bold;">
              Passé après Appel d'Offres &nbsp; {{ dao.type_dossier }} {{ dao.mode_passation }}
              &nbsp;N°
              {{ dao.numero_appel_offre }} DU ___________/{{ dao.exercice_budgetaire }}
            </span> POUR : <span style="font-weight: bold;">{{ dao.objet_appel }}</span>
          </div>  
        </div>

        <div style="font-size: 10.5pt; line-height: 1.8; margin-bottom: 14px;">
          <div>Pour l'exécution des travaux&nbsp;<span style="display: inline-block; border-bottom: 1px solid #888; min-width: 200px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
          <div>Lot n°&nbsp;<span style="display: inline-block; border-bottom: 1px solid #888; min-width: 160px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;; Réseau</div>
        </div>

        <!-- Tableau tronçons (dernière page) -->
        <table style="border-collapse: collapse; width: 90%; margin: 0 auto 20px auto; font-size: 10pt;">
          <thead>
            <tr style="background: #e8e8e8;">
              <th style="border: 1px solid #888; padding: 6px 10px; text-align: center; width: 18%;">N° tronçon</th>
              <th style="border: 1px solid #888; padding: 6px 10px; text-align: center; width: 15%;">N° route</th>
              <th style="border: 1px solid #888; padding: 6px 10px; text-align: center; width: 50%;">Itinéraire</th>
              <th style="border: 1px solid #888; padding: 6px 10px; text-align: center; width: 17%;">Longueur (km)</th>
            </tr>
          </thead>
          <tbody>
            <tr style="height: 24px;"><td style="border: 1px solid #888; padding: 4px;">&nbsp;</td><td style="border: 1px solid #888; padding: 4px;">&nbsp;</td><td style="border: 1px solid #888; padding: 4px;">&nbsp;</td><td style="border: 1px solid #888; padding: 4px;">&nbsp;</td></tr>
            <tr style="height: 24px;"><td style="border: 1px solid #888; padding: 4px;">&nbsp;</td><td style="border: 1px solid #888; padding: 4px;">&nbsp;</td><td style="border: 1px solid #888; padding: 4px;">&nbsp;</td><td style="border: 1px solid #888; padding: 4px;">&nbsp;</td></tr>
            <tr style="height: 24px;"><td style="border: 1px solid #888; padding: 4px;">&nbsp;</td><td style="border: 1px solid #888; padding: 4px;">&nbsp;</td><td style="border: 1px solid #888; padding: 4px;">&nbsp;</td><td style="border: 1px solid #888; padding: 4px;">&nbsp;</td></tr>
          </tbody>
        </table>

        <div style="font-size: 10.5pt; line-height: 2; margin-bottom: 16px;">
          <div>
            <strong>DÉLAI D'EXÉCUTION :</strong>
            <span style="display: inline-block; border-bottom: 1px solid #888; min-width: 120px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            (&nbsp;<span style="display: inline-block; border-bottom: 1px solid #888; min-width: 30px;">&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;) mois
          </div>
          <div><strong>Montant du marché ou Lettre commande en FCFA :</strong></div>
        </div>

        <!-- Tableau montants (dernière page) -->
        <table style="border-collapse: collapse; margin: 0 auto 24px auto; font-size: 10pt; width: 60%;">
          <tbody>
            <tr><td style="border: 1px solid #888; padding: 7px 16px; font-weight: bold; background: #f0f0f0; width: 45%;">TTC</td><td style="border: 1px solid #888; padding: 7px 16px; min-width: 140px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>
            <tr><td style="border: 1px solid #888; padding: 7px 16px; font-weight: bold; background: #f0f0f0;">HTVA</td><td style="border: 1px solid #888; padding: 7px 16px;">&nbsp;</td></tr>
            <tr><td style="border: 1px solid #888; padding: 7px 16px; font-weight: bold; background: #f0f0f0;">TVA</td><td style="border: 1px solid #888; padding: 7px 16px;">&nbsp;</td></tr>
            <tr><td style="border: 1px solid #888; padding: 7px 16px; font-weight: bold; background: #f0f0f0;">AIR</td><td style="border: 1px solid #888; padding: 7px 16px;">&nbsp;</td></tr>
            <tr><td style="border: 1px solid #888; padding: 7px 16px; font-weight: bold; background: #e0e0e0;">Net à mandater</td><td style="border: 1px solid #888; padding: 7px 16px;">&nbsp;</td></tr>
          </tbody>
        </table>

        <!-- SIGNATURES -->
        <div style="margin-top: 30px;">

          <div style="text-align: center; margin-bottom: 30px;">
            <div style="display: inline-block; padding: 16px 40px; min-width: 280px;">
              <h4 style="font-size: 11pt; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 0.5px;">Lu et accepté par le prestataire</h4>
              <div style="font-size: 10pt; font-style: italic; margin-bottom: 20px;">
                [Lieu], le&nbsp;<span style="display: inline-block; border-bottom: 1px solid #888; min-width: 120px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              </div>
              <div style="margin-top: 40px; font-size: 10pt; color: #555;">Signature</div>
            </div>
          </div>

          <div style="text-align: center; margin-bottom: 30px;">
            <div style="display: inline-block;  padding: 16px 40px; min-width: 280px;">
              <h4 style="font-size: 11pt; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 0.5px;">
                Signé par&nbsp;<span style="display: inline-block; border-bottom: 1px solid #888; min-width: 120px; font-weight: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              </h4>
              <div style="font-size: 10pt; font-style: italic; margin-bottom: 4px;">[Maître d'Ouvrage ou Maître d'Ouvrage Délégué]</div>
              <div style="font-size: 10pt; font-style: italic; margin-bottom: 20px;">
                [Lieu], le&nbsp;<span style="display: inline-block; border-bottom: 1px solid #888; min-width: 120px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              </div>
              <div style="margin-top: 40px; font-size: 10pt; color: #555;">Signature</div>
            </div>
          </div>

          <div style="text-align: center;">
            <div style="display: inline-block; padding: 16px 40px; min-width: 280px;">
              <h4 style="font-size: 11pt; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 0.5px;">Enregistrement</h4>
              <div style="font-size: 10pt; font-style: italic;">
                [Lieu], le&nbsp;<span style="display: inline-block; border-bottom: 1px solid #888; min-width: 120px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import HeaderPiece from '@/components/HeaderPiece.vue'
import StepperForm from '@/components/StepperForm.vue'

import { useRoute, useRouter } from 'vue-router';
import PieceNavigator from "@/components/PieceNavigator.vue";
import Loader from "@/components/Loader.vue";
import { toast } from 'vue3-toastify'; 
import { useAppelOffre } from '@/composables/useAppelOffre';
import { usePiece } from '@/composables/usePiece';
import { useTravaux } from '@/composables/useTravaux';
import { utils } from '@/composables/utils';

const route = useRoute();
const router = useRouter();
const dossier = route.params.project_id      //recuperation de l'identifiant du projet
const dao = ref({}); 
const isLoading = ref(true);
const pieces = ref([])  
const current_piece = route.name
const id_piece = ref()
const trouve = ref(false) 
const message = ref(''); //message d'enregistrement reussi
const errors = ref({});

const { previewUrl, getImageUrl } = utils()
const { getDAO } = useAppelOffre() 
const { get_pieces, update_piece } =  usePiece()
const { get_modele_marche, create_modele_marche, update_modele_marche } = useTravaux()

const region = ref('')
const departement = ref('')
const service = ref('')
const logo = ref(null)

onMounted(async () => {
    try {
        isLoading.value = true;
        const responseDAO = await getDAO(dossier)
        const responsePiece = await get_pieces(dossier)
        pieces.value = responsePiece 
        //récuperer les informations sur le dossier d'appel d'offre.
        dao.value = responseDAO[0];  

        const responseModele = await get_modele_marche(dossier)

        // Une fois les pièces chargées, on met à jour l’index courant
        const index = pieces.value.findIndex(p => p.piece.nom_composant === current_piece);
        id_piece.value = pieces.value[index].id;   

        if(responseModele && responseModele.length > 0){
          trouve.value = true
          region.value = responseModele[0].region
          departement.value = responseModele[0].departement
          service.value = responseModele[0].service
          logo.value = responseModele[0].logo
        }   
 
    } catch (error) {
        console.error("Erreur lors de la récupération du DAO :", error) 
    } finally{
        isLoading.value = false;
    }
})

const handleFileChange = (event) => {
  logo.value = event.target.files[0]
}

const handleSubmit = async () => {
  errors.value = {}
  isLoading.value = true; 

  try {
      const modeleData = {  
        region : region.value,
        departement : departement.value,
        service : service.value,
        logo : logo.value
      };

      if(trouve.value){
          const response = await update_modele_marche(dossier, modeleData)
          message.value = response.message
      }else {
          const response = await create_modele_marche(dossier, modeleData)
          //mise à jour du statut de la piece
          const update = await update_piece(id_piece.value, true);

          //Définition du message
          message.value = response.message 
      }
      console.log(message);  
      //toast pour informer l'utilisateur
      toast.success(message, {
          theme: 'colored',
          autoClose: 5000,
      });
      
  } catch (err) { 
      toast.error(err, {
          theme: 'colored',
          autoClose: 2000,
      });
      errors.value = err;
      console.log(err)
  }finally {
      isLoading.value = false; 
  }
}
</script>
