# Guide Complet: Configuration Webhook (Google Sheets & Google Calendar)

Ce guide explique pas à pas comment configurer un script Google Apps Script pour recevoir de manière sécurisée les données de **3 formulaires différents** de votre site web :
1. **Le Formulaire de Contact** (Sogni Digitali Form)
2. **Le Formulaire d'Affiliation** (Affiliate Application)
3. **Le Formulaire de Réservation / Calendrier** (Meeting Request)

---

## ÉTAPE 1 : Préparer votre base de données (Google Sheet)

Le script web envoie les données dans un seul endroit pour une meilleure gestion.
1. Créez un nouveau **Google Sheet**.
2. Nommez les colonnes exactement dans cet ordre (de A à M) sur la toute première ligne :
   * **A:** Date de soumission (Date et Heure)
   * **B:** Source
   * **C:** Type de Formulaire (pageSubject)
   * **D:** Nom
   * **E:** Email
   * **F:** Téléphone
   * **G:** Entreprise / Secteur (business/company)
   * **H:** Message / Objectifs (message/goals)
   * **I:** Site Web
   * **J:** Adresse (pour l'affiliation)
   * **K:** Budget (pour la réservation)
   * **L:** Format de Réunion & Date de Réunion (meetingType / date / time)
   * **M:** ID d'Affilié (affiliateId)

---

## ÉTAPE 2 : Créer le Webhook (Apps Script)

1. Dans votre Google Sheet, cliquez sur **Extensions > Apps Script**.
2. Supprimez tout ce qui s'y trouve et collez le script ci-dessous :

```javascript
// ====== GOOGLE SHEETS & CALENDAR WEBHOOK ======
function doPost(e) {
  try {
    var rawPostData = e.postData.contents;
    var data;
    try {
      data = JSON.parse(rawPostData);
    } catch(err) {
      data = e.parameter;
    }
    
    // --- 1. CONFIGURATION DU GOOGLE SHEET ---
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Extraction des champs de base
    var timestamp = data.timestamp || new Date().toISOString();
    var source = data.source || "Website";
    var formType = data.pageSubject || "Unknown Form"; // Permet de séparer les formulaires
    var affiliateId = data.affiliateId || "";
    
    var name = data.name || "";
    var email = data.email || "";
    var phone = data.phone || "";
    var company = data.company || data.business || "";
    var message = data.message || data.goals || "";
    
    // Champs spécifiques au formulaire de contact et d'affiliation
    var website = data.website || "";
    var address = data.address || "";
    
    // Champs spécifiques au formulaire de réservation
    var budget = data.budget || "";
    var meetingFormat = data.meetingType || "";
    var meetingDateInfo = "";
    if (data.date && data.time) {
      meetingDateInfo = data.meetingType + " | " + data.date + " à " + data.time;
    }

    // Ajout de la ligne dans la feuille de calcul
    sheet.appendRow([
      timestamp, 
      source, 
      formType, 
      name, 
      email, 
      phone, 
      company, 
      message, 
      website, 
      address, 
      budget, 
      meetingDateInfo, 
      affiliateId
    ]);
    
    // --- 2. CONFIGURATION DU CALENDRIER (UNIQUEMENT POUR RÉSERVATION) ---
    // Le calendrier se déclenche SEULEMENT si le formulaire est "Meeting Request"
    if (formType === "Meeting Request" && data.date && data.time) {
      
      var calendar = CalendarApp.getDefaultCalendar(); // Votre calendrier par défaut
      var dateParts = data.date.split("-");
      var timeParts = data.time.split(":");
      
      // Attention: en Javascript, les mois vont de 0 (Janvier) à 11 (Décembre)
      var eventStart = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], timeParts[0], timeParts[1]);
      var eventEnd = new Date(eventStart.getTime() + (45 * 60 * 1000)); // Réunion de 45 minutes
      
      var title = "Sogni Digitali Discovery: " + name;
      var description = "Réservation via Sogni Digitali.\n\n" +
                        "Nom: " + name + "\n" +
                        "Email: " + email + "\n" +
                        "Entreprise: " + company + "\n" +
                        "Budget estimé: " + budget + "\n" +
                        "Format souhaité: " + meetingFormat + "\n" +
                        "Programme / Objectifs:\n" + message + "\n\n" +
                        "Affilié (réf): " + affiliateId;
                        
      // Crée l'événement sur votre calendrier
      calendar.createEvent(title, eventStart, eventEnd, {
        description: description,
        guests: email,        // L'utilisateur sera invité via Google Meet
        sendInvites: true     // Envoie l'invitation par e-mail
      });
    }

    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Si une erreur survient, on la renvoie proprement
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Fonction de test nécessaire pour éviter une erreur CORS (ne pas modifier)
function doGet(e) {
  return ContentService.createTextOutput("Le fonctionnement du Webhook est OK.");
}
```

---

## ÉTAPE 3 : Déployer et obtenir l'URL du Webhook

1. Sur Apps Script, cliquez sur le bouton bleu **Déployer** (en haut à droite).
2. Choisissez **Nouvelle validation** (New deployment).
3. Cliquez sur la **roue crantée** à côté de "Sélectionner le type" et choisissez **Application Web** (Web app).
4. Paramètres OBLIGATOIRES :
   - Exécuter en tant que : **Moi** (votre e-mail)
   - Qui a accès : **Tout le monde** (Anyone)
5. Cliquez sur **Déployer**. *(Si Google demande des autorisations, cliquez sur "Examiner les autorisations" > Choisissez votre compte > Cliquez sur "Paramètres avancés" en bas > "Aller au projet (non sécurisé)").*
6. Copiez l'**URL de l'application Web** (`https://script.google.com/macros/s/.../exec`).

---

## ÉTAPE 4 : Intégrer votre URL dans votre application

Une fois que vous avez votre URL (qui commence par `https://script.google.com/macros/s/`), vous devez mettre à jour DEUX fichiers dans le tableau de bord AI Studio.

1. Allez dans `src/App.tsx` (Si présent) ou `src/pages/Booking.tsx` ou via les réglages des secrets si prévu, mais de manière générale c'est ce fichier backend :
   Sur Sogni Digitali, **Ouvrez le fichier `server.ts`** à la ligne 10.
   ```typescript
   const DEFAULT_WEBHOOK_URL = "VOTRE_TRÈS_LONGUE_URL_ICI";
   ```
2. **C'est Terminé.** Redémarrez le serveur ou rechargez pour que l'App le prenne en compte.

---

## Fonctionnement Détaillé, Par Formulaire (Audit)

Voici comment chacune de vos 3 parties interagit. Vous n'avez plus rien à programmer, le script ci-dessus gère tout !

### 1. Le Formulaire de Contact (App.tsx)
* **Emplacement** : Section de contact en bas de page sur l'accueil.
* **Déclencheur**: L'utilisateur clique sur Envoyer un message.
* **Résultat (Dans le fichier Google Sheet)**:
  * **Type de Formulaire (C)** affichera **"Sogni Digitali Form"**
  * **Téléphone (F)**, **Entreprise (G)**, **Site Web (I)** seront remplis.
  * **Objectifs (H)** contiendra le texte du message.

### 2. Le Formulaire d'Affiliation (Pricing.tsx)
* **Emplacement** : Sur la page Tarifs (Devenir Ambassadeur/Affilié).
* **Déclencheur**: L'utilisateur postule pour intégrer votre programme.
* **Résultat (Dans le Google Sheet)**:
  * **Type de Formulaire (C)** affichera **"Affiliate Application"**
  * **Nom (D)**, **Email (E)**, **Téléphone (F)**
  * **Adresse (J)** sera remplie.
  * *Important :* Aucun événement calendrier n'est créé pour une inscription d'affilié.

### 3. Le Formulaire de Calendrier / Réservation (Booking.tsx)
* **Emplacement** : Sur la page de demande de rendez-vous (/book).
* **Déclencheur**: L'utilisateur sélectionne son mode (en présentiel/Meet), un jour, une heure, et saisit ses informations de projet.
* **Résultat (Dans le Google Sheet)**:
  * **Type de Formulaire (C)** affichera **"Meeting Request"**
  * **Budget (K)** et **Date & Heure (L)** seront enregistrés.
* **Résultat (Google Calendar)**:
  * Un événement Google Calendar de 45 minutes est **immédiatement créé** dans le calendrier lié à l'adresse email ayant déployé le Script (Vous).
  * Le titre sera **"Sogni Digitali Discovery: {Nom du client}"**.
  * Le client final reçoit une invitation e-mail automatique de la part de Google avec le lien Google Meet (si votre calendrier est défini pour intégrer des liens vidéo).
