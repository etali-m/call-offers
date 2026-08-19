<template>
  <Loader v-if="isLoading" />

  <div v-else>
    <HeaderPiece numero_piece="10" :numero_dossier="dao.numero_appel_offre" :moe="dao.maitre_ouvrage" :description_travaux="dao.objet_appel"/>

    <PieceNavigator
      :project-id="dao.id"
      :current-piece-name="$route.name"
      />

    <div class="form-container bg-white mt-3 mx-4">
      <div style="font-size: 12pt; color: #1a1a1a; line-height: 1.5; margin: 20px auto; padding: 15mm 20mm 15mm 20mm; box-sizing: border-box; height: 500px; overflow-y:auto;">

        <!-- ============ PAGE 1 : PAGE DE GARDE DU MARCHE ============ -->

        <!-- EN-TÊTE BILINGUE -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
          <tr>
            <td style="width: 45%; vertical-align: top; text-align: center; font-size: 10pt; line-height: 1.7;">
              <strong>REPUBLIQUE DU CAMEROUN</strong><br>
              Paix &#8211; Travail &#8211; Patrie<br>
              &#8213;&#8213;&#8213;&#8213;&#8213;<br>
              <em>[Indiquer le Maître d'Ouvrage ou Maître d'Ouvrage Délégué]</em><br>
              &#8213;&#8213;&#8213;&#8213;&#8213;
            </td>
            <td style="width: 10%; text-align: center; vertical-align: middle;">
              <img :src="dao.logo" width="80" height="100">
            </td>
            <td style="width: 45%; text-align: center; vertical-align: top; font-size: 10pt; line-height: 1.7;">
              <strong>REPUBLIC OF CAMEROON</strong><br>
              Peace &#8211; Work &#8211; Fatherland<br>
              &#8213;&#8213;&#8213;&#8213;&#8213;<br>
              <em>[Indicate the Contracting Authority]</em><br>
              &#8213;&#8213;&#8213;&#8213;&#8213;
            </td>
          </tr>
        </table>
        <br>

        <!-- REFERENCE DU MARCHE -->
        <p style="font-size: 10.5pt; text-align: center; margin-bottom: 20px;">
          <strong>MARCHE ou LETTRE COMMANDE N°</strong> _________/M /AC/MO/CPM/ 00 du ..........
          Passé après Appel d'Offres <em>[National ou International]</em> ou Ouvert avec Concours
          n°&nbsp;{{ dao.numero_appel_offre }}&nbsp;/AO ___/MO/CPM /00 du .......................
          pour la conception et la réalisation&nbsp;<em>{{ dao.objet_appel }}</em>.............
        </p>

        <!-- MAITRE D'OUVRAGE / TITULAIRE -->
        <div style="font-size: 10.5pt; line-height: 1.9; margin-bottom: 14px;">
          <div>
            <strong>MAITRE D'OUVRAGE</strong> :
            <span style="font-style: italic;">{{ dao.maitre_ouvrage }}</span>
          </div>
          <div style="margin-top: 8px;">
            <strong>TITULAIRE</strong> :
            <span style="font-style: italic;">[Indiquer le titulaire et son adresse complète]</span>
          </div>
          <div style="margin-top: 4px; padding-left: 24px; line-height: 2;">
            B.P : <span style="display: inline-block; border-bottom: 1px solid #888; min-width: 100px;">&nbsp;</span>&nbsp;&nbsp;
            Tél : <span style="display: inline-block; border-bottom: 1px solid #888; min-width: 100px;">&nbsp;</span>&nbsp;&nbsp;
            Fax : <span style="display: inline-block; border-bottom: 1px solid #888; min-width: 100px;">&nbsp;</span><br>
            N° R.C : <span style="display: inline-block; border-bottom: 1px solid #888; min-width: 80px;">&nbsp;</span>&nbsp;&nbsp;
            N° Contribuable : <span style="display: inline-block; border-bottom: 1px solid #888; min-width: 100px;">&nbsp;</span>&nbsp;&nbsp;
            RIB : <span style="display: inline-block; border-bottom: 1px solid #888; min-width: 80px;">&nbsp;</span>
          </div>
        </div>

        <!-- OBJET / LIEU -->
        <div style="font-size: 10.5pt; line-height: 2; margin-bottom: 14px;">
          <div><strong>OBJET</strong> : conception et réalisation&nbsp;<em>{{ dao.objet_appel }}</em>......</div>
          <div><strong>LIEU</strong> : Région&nbsp;{{ dao.region }}<span v-if="dao.departement">, département de {{ dao.departement }}</span></div>
        </div>

        <!-- DELAI D'EXECUTION -->
        <div style="font-size: 10.5pt; font-weight: bold; margin-bottom: 6px;">DELAI D'EXECUTION :</div>
        <table style="border-collapse: collapse; width: 100%; margin-bottom: 16px; font-size: 9.5pt;">
          <thead>
            <tr style="background: #f2f2f2;">
              <th style="border: 1px solid #888; padding: 6px 10px; text-align: left;">Phases</th>
              <th style="border: 1px solid #888; padding: 6px 10px; text-align: center;">Délais d'exécution (en mois)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #888; padding: 6px 10px;">Phase 1 : Conception ou Etudes</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
            </tr>
            <tr>
              <td style="border: 1px solid #888; padding: 6px 10px;">Phase 2 : Réalisation des travaux</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
            </tr>
            <tr>
              <td style="border: 1px solid #888; padding: 6px 10px; font-weight: bold;">Délai global (Phase 1 + Phase 2)</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
            </tr>
          </tbody>
        </table>

        <!-- MONTANT EN FCFA -->
        <div style="font-size: 10.5pt; font-weight: bold; margin-bottom: 6px;">MONTANT EN FCFA :</div>
        <table style="border-collapse: collapse; width: 100%; margin-bottom: 16px; font-size: 9.5pt;">
          <thead>
            <tr style="background: #f2f2f2;">
              <th style="border: 1px solid #888; padding: 6px 10px;"></th>
              <th style="border: 1px solid #888; padding: 6px 10px; text-align: center;">Coûts de la Phase 1<br>(conception ou études)</th>
              <th style="border: 1px solid #888; padding: 6px 10px; text-align: center;">Coûts de la Phase 2<br>(réalisation des travaux)</th>
              <th style="border: 1px solid #888; padding: 6px 10px; text-align: center;">Coûts Globaux du Marché<br>(Phase 1 et Phase 2)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #888; padding: 6px 10px; font-weight: bold;">Montant HTVA (francs CFA)</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
            </tr>
            <tr>
              <td style="border: 1px solid #888; padding: 6px 10px; font-weight: bold;">Montant de la TVA (francs CFA)</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
            </tr>
            <tr>
              <td style="border: 1px solid #888; padding: 6px 10px; font-weight: bold;">Montant TTC (francs CFA)</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
            </tr>
            <tr>
              <td style="border: 1px solid #888; padding: 6px 10px; font-weight: bold;">Montant de l'AIR<sup>(1)</sup> ou de TSR<sup>(2)</sup> (francs CFA), le cas échéant</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
            </tr>
            <tr>
              <td style="border: 1px solid #888; padding: 6px 10px; font-weight: bold; background: #f2f2f2;">Net à percevoir</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
            </tr>
          </tbody>
        </table>

        <!-- FINANCEMENT / IMPUTATION -->
        <div style="font-size: 10.5pt; line-height: 2; margin-bottom: 20px;">
          <div><strong>FINANCEMENT</strong> : <span style="font-style: italic;">{{ dao.financement || "[Indiquer source de financement]" }}</span></div>
          <div><strong>IMPUTATION</strong> : <span style="font-style: italic;">{{ dao.imputation || "[A compléter]" }}</span></div>
        </div>

        <!-- DATES -->
        <div style="text-align: right; font-size: 10pt; line-height: 2; margin-bottom: 20px;">
          <div>SOUSCRIT,&nbsp;&nbsp;&nbsp;LE&nbsp;<span style="display: inline-block; border-bottom: 1px solid #888; min-width: 100px;">&nbsp;</span></div>
          <div>SIGNE,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LE&nbsp;<span style="display: inline-block; border-bottom: 1px solid #888; min-width: 100px;">&nbsp;</span></div>
          <div>NOTIFIE,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LE&nbsp;<span style="display: inline-block; border-bottom: 1px solid #888; min-width: 100px;">&nbsp;</span></div>
          <div>ENREGISTRE,&nbsp;LE&nbsp;<span style="display: inline-block; border-bottom: 1px solid #888; min-width: 100px;">&nbsp;</span></div>
        </div>

        <div style="page-break-after: always;"></div>

        <!-- ============ PAGE 2 : ENTRE ============ -->

        <div style="font-size: 10.5pt; line-height: 2;">
          <h4 style="font-size: 11pt; margin: 0 0 20px 0;">Entre :</h4>

          <p style="margin: 0 0 20px 0;">
            L'administration camerounaise, représentée par&nbsp;
            <span style="display: inline-block; border-bottom: 1px solid #888; min-width: 220px;">&nbsp;</span>
            dénommée ci-après «&nbsp;L Maître d'Ouvrage ou Maître d'Ouvrage Délégué&nbsp;»
          </p>

          <h4 style="font-size: 11pt; margin: 0 0 20px 0;">Et</h4>

          <p style="margin: 0 0 4px 0; font-weight: bold;">L'Entreprise</p>
          <p style="margin: 0 0 20px 0;">
            B.P : <span style="display: inline-block; border-bottom: 1px solid #888; min-width: 100px;">&nbsp;</span>&nbsp;&nbsp;
            Tél : <span style="display: inline-block; border-bottom: 1px solid #888; min-width: 100px;">&nbsp;</span>&nbsp;&nbsp;
            Fax : <span style="display: inline-block; border-bottom: 1px solid #888; min-width: 100px;">&nbsp;</span><br>
            N° R.C : <span style="display: inline-block; border-bottom: 1px solid #888; min-width: 100px;">&nbsp;</span>&nbsp;&nbsp;
            N° Contribuable : <span style="display: inline-block; border-bottom: 1px solid #888; min-width: 120px;">&nbsp;</span>
          </p>

          <p style="margin: 0 0 20px 0;">
            Représentée par Monsieur&nbsp;
            <span style="display: inline-block; border-bottom: 1px solid #888; min-width: 200px;">&nbsp;</span>,
            son Directeur Général, dénommée ci-après «&nbsp;l'entrepreneur&nbsp;»
          </p>

          <h4 style="font-size: 11pt; margin: 0 0 20px 0;">D'autre part,</h4>

          <p style="text-align: center; font-style: italic;">Il a été convenu et arrêté ce qui suit :</p>
        </div>

        <div style="page-break-after: always;"></div>

        <!-- ============ PAGE 3 : SOMMAIRE ============ -->

        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="font-size: 15pt; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Sommaire</h2>
        </div>

        <table style="width: 85%; margin: 0 auto; border-collapse: collapse; font-size: 10.5pt;">
          <tbody>
            <tr>
              <td style="padding: 10px 12px; font-weight: bold; width: 12%;">Titre I</td>
              <td style="padding: 10px 12px;">: Cahier des Clauses Administratives Particulières (CCAP)</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; font-weight: bold;">Titre II</td>
              <td style="padding: 10px 12px;">: Cahier des Clauses Techniques Particulières (CCTP)</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; font-weight: bold;">Titre III</td>
              <td style="padding: 10px 12px;">: Bordereau des Prix Unitaires (BPU)</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; font-weight: bold;">Titre IV</td>
              <td style="padding: 10px 12px;">: Détail ou Devis Estimatif (DE)</td>
            </tr>
          </tbody>
        </table>

        <div style="page-break-after: always;"></div>

        <!-- ============ PAGE 4 : DERNIERE PAGE ============ -->

        <p style="font-size: 10.5pt; text-align: center; margin-bottom: 20px;">
          Page&nbsp;<span style="display: inline-block; border-bottom: 1px solid #888; min-width: 40px;">&nbsp;</span>&nbsp;
          et Dernière du Marché N°&nbsp;
          <span style="display: inline-block; border-bottom: 1px solid #888; min-width: 100px;">&nbsp;</span>
          /MAC/MO/CPM/ .......
          Passé après Appel d'Offres n°&nbsp;{{ dao.numero_appel_offre }}&nbsp;/AO ___/MO/CPM /00 du .......................
          pour la conception et la réalisation&nbsp;<em>{{ dao.objet_appel }}</em>....... Avec................
        </p>

        <!-- MAITRE D'OUVRAGE / TITULAIRE (répété) -->
        <div style="font-size: 10.5pt; line-height: 1.9; margin-bottom: 14px;">
          <div>
            <strong>MAITRE D'OUVRAGE</strong> :
            <span style="font-style: italic;">{{ dao.maitre_ouvrage }}</span>
          </div>
          <div style="margin-top: 8px;">
            <strong>TITULAIRE</strong> :
            <span style="font-style: italic;">[Indiquer le titulaire et son adresse complète]</span>
          </div>
          <div style="margin-top: 4px; padding-left: 24px; line-height: 2;">
            B.P : <span style="display: inline-block; border-bottom: 1px solid #888; min-width: 100px;">&nbsp;</span>&nbsp;&nbsp;
            Tél : <span style="display: inline-block; border-bottom: 1px solid #888; min-width: 100px;">&nbsp;</span>&nbsp;&nbsp;
            Fax : <span style="display: inline-block; border-bottom: 1px solid #888; min-width: 100px;">&nbsp;</span><br>
            N° R.C : <span style="display: inline-block; border-bottom: 1px solid #888; min-width: 80px;">&nbsp;</span>&nbsp;&nbsp;
            N° Contribuable : <span style="display: inline-block; border-bottom: 1px solid #888; min-width: 100px;">&nbsp;</span>&nbsp;&nbsp;
            RIB : <span style="display: inline-block; border-bottom: 1px solid #888; min-width: 80px;">&nbsp;</span>
          </div>
        </div>

        <!-- OBJET / LIEU (répété) -->
        <div style="font-size: 10.5pt; line-height: 2; margin-bottom: 14px;">
          <div><strong>OBJET</strong> : conception et réalisation&nbsp;<em>{{ dao.objet_appel }}</em>......</div>
          <div><strong>LIEU</strong> : Région&nbsp;{{ dao.region }}<span v-if="dao.departement">, département de {{ dao.departement }}</span></div>
        </div>

        <!-- DELAI D'EXECUTION (répété) -->
        <div style="font-size: 10.5pt; font-weight: bold; margin-bottom: 6px;">DELAI D'EXECUTION :</div>
        <table style="border-collapse: collapse; width: 100%; margin-bottom: 16px; font-size: 9.5pt;">
          <thead>
            <tr style="background: #f2f2f2;">
              <th style="border: 1px solid #888; padding: 6px 10px; text-align: left;">Phases</th>
              <th style="border: 1px solid #888; padding: 6px 10px; text-align: center;">Délais d'exécution (en mois)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #888; padding: 6px 10px;">Phase 1 : Conception ou Etudes</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
            </tr>
            <tr>
              <td style="border: 1px solid #888; padding: 6px 10px;">Phase 2 : Réalisation des travaux</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
            </tr>
            <tr>
              <td style="border: 1px solid #888; padding: 6px 10px; font-weight: bold;">Délai global (Phase 1 + Phase 2)</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
            </tr>
          </tbody>
        </table>

        <!-- MONTANT EN FCFA (répété) -->
        <div style="font-size: 10.5pt; font-weight: bold; margin-bottom: 6px;">MONTANT EN FCFA :</div>
        <table style="border-collapse: collapse; width: 100%; margin-bottom: 24px; font-size: 9.5pt;">
          <thead>
            <tr style="background: #f2f2f2;">
              <th style="border: 1px solid #888; padding: 6px 10px;"></th>
              <th style="border: 1px solid #888; padding: 6px 10px; text-align: center;">Coûts de la Phase 1<br>(conception ou études)</th>
              <th style="border: 1px solid #888; padding: 6px 10px; text-align: center;">Coûts de la Phase 2<br>(réalisation des travaux)</th>
              <th style="border: 1px solid #888; padding: 6px 10px; text-align: center;">Coûts Globaux du Marché<br>(Phase 1 et Phase 2)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #888; padding: 6px 10px; font-weight: bold;">Montant HTVA (francs CFA)</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
            </tr>
            <tr>
              <td style="border: 1px solid #888; padding: 6px 10px; font-weight: bold;">Montant de la TVA (francs CFA)</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
            </tr>
            <tr>
              <td style="border: 1px solid #888; padding: 6px 10px; font-weight: bold;">Montant TTC (francs CFA)</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
            </tr>
            <tr>
              <td style="border: 1px solid #888; padding: 6px 10px; font-weight: bold;">Montant de l'AIR<sup>(1)</sup> ou de TSR<sup>(2)</sup> (francs CFA), le cas échéant</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
            </tr>
            <tr>
              <td style="border: 1px solid #888; padding: 6px 10px; font-weight: bold; background: #f2f2f2;">Net à percevoir</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
              <td style="border: 1px solid #888; padding: 6px 10px; text-align: center; font-style: italic;">[A préciser en lettres et en chiffres]</td>
            </tr>
          </tbody>
        </table>

        <!-- SIGNATURES (2 colonnes) -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="width: 50%; text-align: center; vertical-align: top; font-size: 10.5pt; padding: 0 10px;">
              <div style="font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 30px;">Lu et accepté par l'Entrepreneur</div>
              <div style="font-style: italic;">
                [Lieu], le&nbsp;<span style="display: inline-block; border-bottom: 1px solid #888; min-width: 120px;">&nbsp;</span>
              </div>
            </td>
            <td style="width: 50%; text-align: center; vertical-align: top; font-size: 10.5pt; padding: 0 10px;">
              <div style="font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 30px;">Signé par le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué</div>
              <div style="font-style: italic;">
                [Lieu], le&nbsp;<span style="display: inline-block; border-bottom: 1px solid #888; min-width: 120px;">&nbsp;</span>
              </div>
            </td>
          </tr>
        </table>

        <div style="text-align: center; font-size: 10.5pt;">
          <div style="font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">Enregistrement</div>
          <div style="font-style: italic;">
            [Lieu], le&nbsp;<span style="display: inline-block; border-bottom: 1px solid #888; min-width: 120px;">&nbsp;</span>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HeaderPiece from '@/components/HeaderPiece.vue'
import { useRoute, useRouter } from 'vue-router';
import PieceNavigator from "@/components/PieceNavigator.vue";
import Loader from "@/components/Loader.vue";
import { useAppelOffre } from '@/composables/useAppelOffre';
import { useConceptionRealisation } from '@/composables/useConceptionRealisation';

const route = useRoute();
const router = useRouter();
const dossier = route.params.project_id
const dao = ref({});
const isLoading = ref(true);

const { getDAO } = useAppelOffre()

onMounted(async () => {
    try {
        isLoading.value = true;
        const responseDAO = await getDAO(dossier)
        dao.value = responseDAO[0];
    } catch (error) {
        console.error("Erreur lors de la récupération du DAO :", error)
    } finally{
        isLoading.value = false;
    }
})
</script>
