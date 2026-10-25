import { useAppState } from "@/lib/store";
import type { Listing } from "@/lib/types";

export type Language = "en" | "fr";

const FR: Record<string, string> = {
  "FindBack home": "Accueil FindBack",
  Home: "Accueil",
  "Browse Items": "Parcourir les objets",
  Browse: "Parcourir",
  "How It Works": "Comment ça marche",
  Help: "Aide",
  "Sign In": "Connexion",
  "Account menu for": "Menu du compte de",
  "Report an Item": "Signaler un objet",
  "Skip to main content": "Passer au contenu principal",
  Main: "Navigation principale",
  Mobile: "Navigation mobile",
  "Demo account": "Compte de démonstration",
  Profile: "Profil",
  "Saved items": "Objets enregistrés",
  Messages: "Messages",
  Matches: "Correspondances",
  Settings: "Paramètres",
  "Sign out": "Déconnexion",
  "Lost something? Let's bring it back.": "Vous avez perdu quelque chose ? Retrouvons-le.",
  "A community lost-and-found for the things that matter. Search recent reports or post what you lost or found.":
    "Un service communautaire d'objets perdus et trouvés. Consultez les signalements récents ou publiez un objet perdu ou trouvé.",
  "A little closer to home": "Tout près de chez vous",
  "Community board": "Tableau communautaire",
  "Still looking": "Toujours recherché",
  "open lost reports": "signalements d'objets perdus ouverts",
  "Found nearby": "Trouvés à proximité",
  "Lost something?": "Vous avez perdu quelque chose ?",
  "Let's bring it back.": "Retrouvons-le.",
  "St. John's, NL": "St. John's, T.-N.-L.",
  "Community listing activity": "Activité des signalements",
  "Reported around": "Signalé vers",
  "open found reports": "signalements d'objets trouvés ouverts",
  "See possible matches": "Voir les correspondances possibles",
  "Compare details and locations": "Comparez les détails et les lieux",
  "FindBack community board": "Tableau communautaire FindBack",
  "Recently reported": "Signalements récents",
  "A few recent reports from around St. John's. Keep identifying details private when you reach out.":
    "Quelques signalements récents de St. John's. Gardez les détails permettant d'identifier l'objet pour vos échanges privés.",
  "View all items": "Voir tous les objets",
  "Latest reports": "Derniers signalements",
  "Private contact": "Échanges privés",
  "Use FindBack": "Utiliser FindBack",
  "Browse items": "Parcourir les objets",
  "Contact us": "Nous contacter",
  About: "À propos",
  Privacy: "Confidentialité",
  "Admin demo": "Modération démo",
  "Lost something? Let's bring it back. Starting in St. John's, Newfoundland and Labrador.":
    "Vous avez perdu quelque chose ? Retrouvons-le. À St. John's, Terre-Neuve-et-Labrador.",
  "© 2026 FindBack · Prototype — listings, accounts and messages are demo data stored only in this browser.":
    "© 2026 FindBack · Prototype — les signalements, comptes et messages sont enregistrés uniquement dans ce navigateur.",
  Lost: "Perdu",
  Found: "Trouvé",
  Open: "Ouvert",
  Returned: "Retrouvé",
  Closed: "Fermé",
  "Under review": "En cours d'examen",
  "Save this item": "Enregistrer cet objet",
  "Remove from saved items": "Retirer des objets enregistrés",
  "Item saved": "Objet enregistré",
  "Removed from saved items": "Objet retiré des éléments enregistrés",
  "Save item": "Enregistrer l'objet",
  Saved: "Enregistré",
  "Search items": "Rechercher des objets",
  "Search and filter listings": "Rechercher et filtrer les signalements",
  Filters: "Filtres",
  "Report item": "Signaler un objet",
  "Lost and found": "Objets perdus et trouvés",
  "Lost items": "Objets perdus",
  "Found items": "Objets trouvés",
  Category: "Catégorie",
  "All categories": "Toutes les catégories",
  "General area": "Secteur général",
  Everywhere: "Tous les secteurs",
  "Reported within": "Signalé depuis",
  "Any time": "Toutes dates",
  "2 days": "2 jours",
  "7 days": "7 jours",
  "30 days": "30 jours",
  "Clear filters": "Effacer les filtres",
  report: "signalement",
  reports: "signalements",
  "Listings are demo data saved only in this browser. Share only general locations; keep identifying details private.":
    "Les signalements sont des données de démonstration enregistrées dans ce navigateur. Indiquez un secteur général et gardez les détails d'identification privés.",
  "Browse community reports": "Parcourir les signalements communautaires",
  "Search recent lost and found items across St. John's.":
    "Recherchez les objets perdus et trouvés récemment à St. John's.",
  "Try “blue keys” or “Bowring Park”": "Essayez « clés bleues » ou « Bowring Park »",
  "Possible match": "Correspondance possible",
  "Same type of item": "Même type d'objet",
  "Found within a couple of days": "Trouvé en quelques jours",
  "Found within two weeks": "Trouvé dans les deux semaines",
  "Possible matches": "Correspondances possibles",
  "My reports": "Mes signalements",
  "New report": "Nouveau signalement",
  "Report an item": "Signaler un objet",
  Item: "Objet",
  "When & where": "Quand et où",
  Details: "Détails",
  "When was it lost?": "Quand l'avez-vous perdu ?",
  "When was it found?": "Quand l'avez-vous trouvé ?",
  "Describe the item": "Décrivez l'objet",
  optional: "facultatif",
  "Private identifying detail": "Détail d'identification privé",
  "A detail only the true owner would know": "Un détail que seul le véritable propriétaire connaît",
  "e.g. Blue canvas tote bag": "ex. sac fourre-tout bleu en toile",
  "e.g. Silver keyring with two keys": "ex. anneau argenté avec deux clés",
  "e.g. Handed in to the library front desk": "ex. remis à l'accueil de la bibliothèque",
  "(optional, 8 MB max)": "(facultatif, 8 Mo max.)",
  "Preview of selected report photo": "Aperçu de la photo sélectionnée",
  "Where it's being kept?": "Où l'objet est-il gardé ?",
  match: "correspondance",
  posted: "publié",
  Review: "Examiner",
  "Report type": "Type de signalement",
  "Colour, shape, brand, or other visible details":
    "Couleur, forme, marque ou autres détails visibles",
  "This is not shown on the public report.": "Ce détail n'apparaît pas dans le signalement public.",
  "Add a photo": "Ajouter une photo",
  "Please choose a photo (JPG, PNG, WEBP or GIF).": "Choisissez une photo (JPG, PNG, WEBP ou GIF).",
  "That photo is too large. Please choose one under 8 MB.":
    "Cette photo est trop volumineuse. Choisissez-en une de moins de 8 Mo.",
  "Message in FindBack": "Message FindBack",
  "Safest — your details stay private": "Le plus sûr — vos coordonnées restent privées",
  "Email (shared only when I choose)": "Courriel (partagé uniquement avec votre accord)",
  "We never show your email publicly": "Votre courriel n'est jamais affiché publiquement",
  "Phone (shared only when I choose)": "Téléphone (partagé uniquement avec votre accord)",
  "We never show your number publicly": "Votre numéro n'est jamais affiché publiquement",
  Continue: "Continuer",
  Back: "Retour",
  "Post report": "Publier le signalement",
  Name: "Nom",
  "(optional)": "(facultatif)",
  Email: "Courriel",
  "Enter a valid email address.": "Saisissez une adresse courriel valide.",
  "you@example.com": "vous@exemple.ca",
  "Demo profile ready": "Profil démo prêt",
  Reset: "Réinitialiser",
  "Conversation list": "Liste des conversations",
  "reported by": "signalé par",
  "Where it's being kept": "Où l'objet est-il gardé",
  "Never share passwords, full ID numbers, or exact home addresses. Ask the reporter to verify an identifying detail privately.":
    "Ne partagez jamais de mot de passe, de numéro d'identité complet ou d'adresse personnelle exacte. Demandez à la personne de confirmer un détail d'identification en privé.",
  "This report isn't available": "Ce signalement n'est pas disponible",
  "What happened": "Description",
  "Back to reports": "Retour aux signalements",
  "This is one of your reports.": "Ce signalement vous appartient.",
  "Message reporter": "Écrire à la personne",
  "Report status": "État du signalement",
  "No reports match those filters": "Aucun signalement ne correspond à ces filtres",
  "Try a broader search or check another area.":
    "Essayez une recherche plus générale ou un autre secteur.",
  "Community connections": "Liens communautaires",
  "Reports are compared by item type, area, timing, colour, and description. A match is a lead, not a guarantee.":
    "Les signalements sont comparés selon le type d'objet, le secteur, la date, la couleur et la description. Une correspondance est une piste, pas une garantie.",
  "Matching happens in this browser using a transparent demo score. Verify ownership privately before arranging a return.":
    "La comparaison s'effectue dans ce navigateur à l'aide d'un score de démonstration. Vérifiez la propriété en privé avant d'organiser un retour.",
  "No likely matches yet": "Aucune correspondance probable pour le moment",
  "When reports share an item type, your strongest leads will show up here.":
    "Les meilleures pistes apparaîtront ici lorsque des signalements concernent le même type d'objet.",
  "Saved reports": "Signalements enregistrés",
  "Keep useful leads together while you search.":
    "Gardez vos pistes utiles au même endroit pendant vos recherches.",
  "No saved reports yet": "Aucun signalement enregistré",
  "Save a report from its card to find it here later.":
    "Enregistrez un signalement depuis sa fiche pour le retrouver ici.",
  "Review the reports you've posted and update their status when an item is returned.":
    "Consultez vos signalements et mettez leur état à jour lorsque l'objet est retrouvé.",
  "You haven't posted any reports": "Vous n'avez publié aucun signalement",
  "Your new reports will appear here.": "Vos nouveaux signalements apparaîtront ici.",
  "Update status": "Modifier l'état",
  "Report status updated": "État du signalement mis à jour",
  "Report restored to open": "Signalement rétabli à l'état ouvert",
  "No flagged reports": "Aucun signalement marqué",
  "Newly flagged demo reports will be listed here.":
    "Les signalements de démonstration marqués apparaîtront ici.",
  "Anyone using this local prototype can open this page. Do not use it to moderate real reports.":
    "Toute personne utilisant ce prototype peut ouvrir cette page. Ne l'utilisez pas pour modérer de vrais signalements.",
  "Restore report": "Rétablir le signalement",
  "Local prototype tools": "Outils du prototype local",
  "Review flagged sample reports in this browser. This screen does not provide real authentication or server-side moderation.":
    "Examinez les signalements de démonstration marqués dans ce navigateur. Cette page ne fournit ni authentification ni modération côté serveur.",
  "Moderation demo": "Modération démo",
  "Report a lost item": "Signaler un objet perdu",
  "Report a found item": "Signaler un objet trouvé",
  Strong: "Forte",
  Good: "Bonne",
  Possible: "Possible",
  "I lost something": "J'ai perdu quelque chose",
  "Help me find it": "Aidez-moi à le retrouver",
  "Describe it, where you last saw it, and what makes it yours.":
    "Décrivez l'objet, le dernier endroit où vous l'avez vu et les détails qui permettent de le reconnaître.",
  "Start a lost report": "Signaler un objet perdu",
  "I found something": "J'ai trouvé quelque chose",
  "Help it get home": "Aidez-le à retrouver son propriétaire",
  "Share a general area and how the owner can safely claim it.":
    "Indiquez un secteur général et la façon dont son propriétaire peut le récupérer en sécurité.",
  "Start a found report": "Signaler un objet trouvé",
  "Do not post exact addresses, serial numbers, full names on IDs, or other details someone could use to falsely claim an item.":
    "Ne publiez pas d'adresse exacte, de numéro de série, de nom complet figurant sur une pièce d'identité ni de détail permettant une fausse réclamation.",
  "A few details can help someone recognize a lost item or safely return one.":
    "Quelques détails peuvent aider à reconnaître un objet perdu ou à le rendre à son propriétaire en sécurité.",
  "Your report is saved in this browser. You can update its status later from My reports.":
    "Votre signalement est enregistré dans ce navigateur. Vous pourrez modifier son état dans Mes signalements.",
  "Change report type": "Changer le type de signalement",
  "Choose an area": "Choisir un secteur",
  "What are you reporting?": "Quel objet signalez-vous ?",
  "How was it lost?": "Comment a-t-il été perdu ?",
  "Where is it being kept?": "Où l'objet est-il gardé ?",
  "How can someone contact you?": "Comment peut-on vous contacter ?",
  "Steps in the report": "Étapes du signalement",
  "No photo": "Aucune photo",
  "Photo attached": "Photo ajoutée",
  "Preparing photo…": "Préparation de la photo…",
  "Choose a photo": "Choisir une photo",
  "Please choose how you'd like to be contacted.": "Choisissez votre mode de contact préféré.",
  "The date is approximate": "La date est approximative",
  "Choose a neighbourhood or public place, not an exact address.":
    "Choisissez un quartier ou un lieu public, pas une adresse exacte.",
  "Please choose a date.": "Choisissez une date.",
  "The date can't be in the future.": "La date ne peut pas être dans le futur.",
  "Please choose a general area.": "Choisissez un secteur général.",
  "Please describe the item in at least 3 characters.":
    "Décrivez l'objet en au moins 3 caractères.",
  "Please keep the name under 80 characters.": "Limitez le nom à 80 caractères.",
  "Please choose a category.": "Choisissez une catégorie.",
  "Please add a short description (at least 10 characters).":
    "Ajoutez une courte description (au moins 10 caractères).",
  "Please keep the description under 600 characters.": "Limitez la description à 600 caractères.",
  "That photo could not be read. Please try another.":
    "Impossible de lire cette photo. Essayez-en une autre.",
  "Never include full contact information or security details in your public description. You can coordinate privately through messages.":
    "N'incluez jamais vos coordonnées complètes ni des informations de sécurité dans la description publique. Vous pourrez échanger en privé par message.",
  "Your report has been posted": "Votre signalement a été publié",
  "Browse reports": "Parcourir les signalements",
  "Sign in to FindBack": "Connexion à FindBack",
  "Create a local demo profile to manage reports and messages.":
    "Créez un profil de démonstration local pour gérer vos signalements et vos messages.",
  "This prototype does not verify your identity or send credentials to a server. Use any email-shaped address for the local demo.":
    "Ce prototype ne vérifie pas votre identité et n'envoie aucun identifiant à un serveur. Pour la démo, utilisez une adresse au format courriel.",
  "How should we address you?": "Comment souhaitez-vous être appelé ?",
  "Continue with demo profile": "Continuer avec le profil démo",
  "You're signed in as": "Vous êtes connecté en tant que",
  "This is a local demo profile. It is saved only in this browser.":
    "Ce profil de démonstration est enregistré uniquement dans ce navigateur.",
  "View profile": "Voir le profil",
  "Your profile": "Votre profil",
  "Update the name and email used in this local demo.":
    "Modifiez le nom et le courriel utilisés dans cette démo locale.",
  "Save changes": "Enregistrer les modifications",
  "Profile updated": "Profil mis à jour",
  "Your activity": "Votre activité",
  Reports: "Signalements",
  Conversations: "Conversations",
  Joined: "Membre depuis",
  "View my reports": "Voir mes signalements",
  "Sign in to view your profile": "Connectez-vous pour voir votre profil",
  "Sign in to manage your reports and demo profile.":
    "Connectez-vous pour gérer vos signalements et votre profil démo.",
  "Create demo profile": "Créer un profil démo",
  "This prototype keeps profile information in this browser only.":
    "Ce prototype conserve les informations de profil uniquement dans ce navigateur.",
  "Choose how the local prototype behaves in this browser.":
    "Choisissez le comportement du prototype local dans ce navigateur.",
  "Email updates": "Mises à jour par courriel",
  "Allow the demo to show email update preferences.":
    "Afficher les préférences de mise à jour par courriel dans la démo.",
  "Possible match alerts": "Alertes de correspondance",
  "Keep match alerts enabled for this local prototype.":
    "Activer les alertes de correspondance dans ce prototype local.",
  "Larger text": "Texte plus grand",
  "Increase the text size across the app.":
    "Augmenter la taille du texte dans toute l'application.",
  "These settings are stored locally and do not control real email delivery or notifications.":
    "Ces paramètres sont stockés localement et ne contrôlent aucun courriel ni aucune notification réelle.",
  "Reset demo data": "Réinitialiser les données démo",
  "Restore the original sample reports and preferences.":
    "Restaurer les signalements et préférences d'origine.",
  "Demo data reset": "Données démo réinitialisées",
  "Read the demo privacy notes": "Lire les notes de confidentialité",
  "Coordinate a safe return without sharing personal details publicly.":
    "Organisez un retour en toute sécurité sans partager de renseignements personnels publiquement.",
  "Messages are stored only in this browser. This is not a private or server-backed messaging service.":
    "Les messages sont enregistrés uniquement dans ce navigateur. Ce service n'est ni privé ni relié à un serveur.",
  "Your conversations": "Vos conversations",
  "Report no longer available": "Signalement indisponible",
  "No messages yet": "Aucun message",
  Block: "Bloquer",
  Unblock: "Débloquer",
  "Conversation blocked": "Conversation bloquée",
  "Conversation unblocked": "Conversation débloquée",
  "Write a message": "Écrire un message",
  "This conversation is blocked": "Cette conversation est bloquée",
  "Send message": "Envoyer le message",
  "Start with a polite question about the report.":
    "Commencez par une question polie au sujet du signalement.",
  "No conversations yet": "Aucune conversation",
  "Open a report and choose “Message reporter” to start a conversation.":
    "Ouvrez un signalement et choisissez « Écrire à la personne » pour démarrer une conversation.",
  "Hi Sam, I think those might be my keys! I lost them yesterday near the harbour.":
    "Bonjour Sam, je pense que ce sont peut-être mes clés ! Je les ai perdues hier près du port.",
  "Hi! Could you tell me how many keys are on the ring and anything else about them?":
    "Bonjour ! Pouvez-vous me dire combien de clés il y a sur l'anneau et me donner un autre détail ?",
  "Hello, is the red backpack still with you?": "Bonjour, avez-vous toujours le sac à dos rouge ?",
  "Yes, it's dry and safe. What's inside the front pocket?":
    "Oui, il est au sec et en sécurité. Qu'y a-t-il dans la poche avant ?",
  "A blue water bottle and a library card.":
    "Une bouteille d'eau bleue et une carte de bibliothèque.",
  "About FindBack": "À propos de FindBack",
  "A community lost-and-found concept, starting in St. John's.":
    "Un service communautaire d'objets perdus et trouvés, lancé à St. John's.",
  "FindBack is a local lost-and-found prototype designed to help neighbours connect around missing belongings. The sample board is set in St. John's, NL and includes example reports, matches, and conversations.":
    "FindBack est un prototype local d'objets perdus et trouvés qui aide les voisins à se retrouver autour d'objets égarés. Les exemples proviennent de St. John's, T.-N.-L., et comprennent des signalements, des correspondances et des conversations.",
  "FindBack is a local lost-and-found prototype designed to help neighbours connect around missing belongings.":
    "FindBack est un prototype local d'objets perdus et trouvés qui aide les voisins à se retrouver autour d'objets égarés.",
  "The sample board is set in St. John's, NL and includes example reports, matches, and conversations.":
    "Le tableau de démonstration se situe à St. John's, T.-N.-L., et présente des signalements, des correspondances et des conversations d'exemple.",
  "The current version runs entirely in your browser. It demonstrates the user experience but does not publish reports to a shared service or connect people across devices.":
    "La version actuelle fonctionne entièrement dans votre navigateur. Elle présente l'expérience utilisateur, mais ne publie pas les signalements sur un service partagé et ne relie pas les personnes entre appareils.",
  "Useful reports share a clear description and a general area while keeping a private identifying detail for the real owner to confirm.":
    "Un signalement utile contient une description claire et un secteur général, tout en gardant un détail d'identification privé que le véritable propriétaire pourra confirmer.",
  "Browse recent reports by type, category, area, or keywords before creating a duplicate.":
    "Parcourez les signalements récents par type, catégorie, secteur ou mots-clés avant d'en créer un autre.",
  "Choose lost or found, add a date and general location, then describe visible details.":
    "Indiquez si l'objet est perdu ou trouvé, ajoutez une date et un secteur général, puis décrivez les détails visibles.",
  "FindBack scores reports using item category, area, dates, and shared description words.":
    "FindBack compare la catégorie, le secteur, les dates et les mots communs des descriptions.",
  "Message privately, ask the owner to describe a detail that is not public, and meet in a staffed public place.":
    "Échangez en privé, demandez au propriétaire de décrire un détail non publié et rencontrez-vous dans un lieu public avec du personnel.",
  "Matching suggestions are only leads. They cannot confirm that two reports describe the same item.":
    "Les suggestions de correspondance ne sont que des pistes. Elles ne confirment pas que deux signalements concernent le même objet.",
  "Writing a useful report": "Rédiger un signalement utile",
  "Use a clear item name and select the closest category.":
    "Donnez un nom clair à l'objet et choisissez la catégorie la plus proche.",
  "Share colour, shape, and visible features.":
    "Indiquez la couleur, la forme et les caractéristiques visibles.",
  "Keep a serial number, engraving, or other proof of ownership private.":
    "Gardez confidentiels le numéro de série, la gravure et toute autre preuve de propriété.",
  "Updating your report": "Mettre à jour votre signalement",
  "Sign in with a demo profile, open My reports, and change the status when the item has been returned or is no longer available.":
    "Connectez-vous avec un profil démo, ouvrez Mes signalements et modifiez l'état lorsque l'objet est rendu ou n'est plus disponible.",
  "Search reports": "Rechercher des signalements",
  "Are these reports visible to everyone?":
    "Ces signalements sont-ils visibles par tout le monde ?",
  "In this prototype, reports are stored in your browser only. They are not sent to a shared website or visible to other users.":
    "Dans ce prototype, les signalements sont enregistrés uniquement dans votre navigateur. Ils ne sont pas envoyés vers un site partagé ni visibles par d'autres personnes.",
  "How are possible matches chosen?": "Comment les correspondances possibles sont-elles choisies ?",
  "The demo compares category, general location, date proximity, colour words, and other shared description words. Scores are suggestions, not proof.":
    "La démo compare la catégorie, le secteur général, la proximité des dates, les couleurs et les mots communs des descriptions. Les scores sont des suggestions, pas des preuves.",
  "Can I post an exact address?": "Puis-je publier une adresse exacte ?",
  "No. Use a general neighbourhood or public place. Never put a home address, full ID number, password, or access code in a report.":
    "Non. Indiquez un quartier ou un lieu public. Ne publiez jamais une adresse personnelle, un numéro d'identité complet, un mot de passe ou un code d'accès.",
  "Can I use real contact details?": "Puis-je utiliser de vraies coordonnées ?",
  "Avoid entering sensitive personal information. The demo does not send messages or email, but local browser data can still be seen by someone with access to this device.":
    "Évitez de saisir des renseignements personnels sensibles. La démo n'envoie ni messages ni courriels, mais les données locales peuvent être consultées par les personnes ayant accès à cet appareil.",
  "Will my report appear on another device?":
    "Mon signalement apparaîtra-t-il sur un autre appareil ?",
  "No. This version has no shared backend. Its demo reports and profile remain in the current browser.":
    "Non. Cette version ne possède pas de serveur partagé. Les signalements et le profil démo restent dans le navigateur actuel.",
  "Do not post full names from IDs, account numbers, serial numbers, passwords, or exact addresses.":
    "Ne publiez pas les noms complets figurant sur les pièces d'identité, les numéros de compte ou de série, les mots de passe ni les adresses exactes.",
  "Use the in-app demo messages only for testing; they are saved on this device and are not a secure service.":
    "Utilisez les messages démo uniquement pour les essais ; ils sont enregistrés sur cet appareil et ne constituent pas un service sécurisé.",
  "Do not share verification codes, payment details, or personal documents with someone claiming an item.":
    "Ne communiquez aucun code de vérification, renseignement de paiement ou document personnel à une personne qui réclame un objet.",
  "Choose a busy, well-lit public place during open hours, such as a staffed service desk.":
    "Choisissez un lieu public fréquenté et bien éclairé pendant les heures d'ouverture, comme un comptoir avec du personnel.",
  "Bring someone with you if that feels safer, and tell a trusted person where you are going.":
    "Si cela vous rassure, faites-vous accompagner et informez une personne de confiance de votre destination.",
  "For valuable property, consider handing it to local police, campus security, or the venue's official lost-and-found.":
    "Pour un objet de valeur, remettez-le à la police locale, à la sécurité du campus ou au service officiel des objets trouvés du lieu concerné.",
  "Stop communicating if someone pressures you, asks for money, or insists on meeting somewhere isolated. Contact local emergency services if you feel in immediate danger.":
    "Cessez les échanges si quelqu'un vous met la pression, demande de l'argent ou insiste pour un rendez-vous isolé. En cas de danger immédiat, contactez les services d'urgence locaux.",
  "Start with a search across open reports. If you do not see the item, post a report with the closest date and a neighbourhood or public landmark.":
    "Commencez par rechercher parmi les signalements ouverts. Si l'objet n'y figure pas, publiez un signalement avec la date la plus proche et un quartier ou un lieu public.",
  "Share a serial number, engraving, or other proof of ownership privately.":
    "Communiquez en privé le numéro de série, la gravure ou toute autre preuve de propriété.",
  "Find a busy public place, verify the item, and avoid sharing sensitive details.":
    "Choisissez un lieu public fréquenté, vérifiez l'objet et évitez de divulguer des renseignements sensibles.",
  Contact: "Contact",
  "A clear note about how to reach the people behind this prototype.":
    "Comment joindre les responsables de ce prototype.",
  "Questions & answers": "Questions et réponses",
  "The basics of finding, reporting, and returning an item.":
    "L'essentiel pour retrouver, signaler et rendre un objet.",
  "FindBack help": "Aide FindBack",
  "Get from a report to a safe return, one step at a time.":
    "Du signalement au retour en toute sécurité, étape par étape.",
  "How FindBack works": "Comment fonctionne FindBack",
  "Post a useful report, compare possible matches, then coordinate carefully.":
    "Publiez un signalement utile, comparez les correspondances possibles et organisez le retour avec prudence.",
  "Privacy notes": "Notes de confidentialité",
  "What this local prototype stores, and what it does not do.":
    "Ce que ce prototype local enregistre et ce qu'il ne fait pas.",
  "Your safety comes first": "Votre sécurité avant tout",
  "Safety guidelines": "Conseils de sécurité",
  "Protect personal information and make returns in a safe way.":
    "Protégez vos renseignements personnels et rendez les objets en toute sécurité.",
  "This repository currently contains a frontend demo, not a connected account or listing service. The app stores demo profiles, reports, saved items, preferences, and messages in your browser's local storage.":
    "Ce dépôt contient une démo d'interface, pas un service de comptes ou de signalements connecté. L'application stocke les profils, signalements, objets enregistrés, préférences et messages démo dans le stockage local de votre navigateur.",
  "What that means": "Ce que cela signifie",
  "Nothing is sent to a FindBack backend by this prototype.":
    "Ce prototype n'envoie aucune donnée à un serveur FindBack.",
  "Local browser data may be visible to other people who use the same browser profile or device.":
    "Les données locales peuvent être visibles par les autres personnes qui utilisent ce profil de navigateur ou cet appareil.",
  "Clearing site data or using Reset demo data removes or replaces the local demo state.":
    "Effacer les données du site ou réinitialiser les données démo supprime ou remplace les données locales.",
  "Demo sign-in does not verify an email address or create a secure account.":
    "La connexion démo ne vérifie pas l'adresse courriel et ne crée pas de compte sécurisé.",
  "Before real launch": "Avant un lancement réel",
  "A production service would need a privacy notice describing its actual storage, retention, security, and deletion practices. Do not use this prototype for sensitive personal information.":
    "Un service en production devra expliquer ses pratiques réelles de stockage, conservation, sécurité et suppression. N'utilisez pas ce prototype pour des renseignements personnels sensibles.",
  "This prototype does not have a support inbox or send contact forms. No one will receive a message submitted here.":
    "Ce prototype ne possède pas de boîte de soutien et n'envoie aucun formulaire. Personne ne recevra les messages saisis ici.",
  "Need help with the demo?": "Besoin d'aide avec la démo ?",
  "Use the built-in help pages for reporting and safety guidance. If you are trying out the product, sample conversations and reports stay in this browser.":
    "Consultez les pages d'aide sur les signalements et la sécurité. Les conversations et signalements d'exemple restent dans ce navigateur.",
  "Help centre": "Centre d'aide",
  "A possible match is not proof of ownership.":
    "Une correspondance possible ne prouve pas la propriété.",
  "Keep one or two identifying details private and ask the claimant to describe them before arranging a return.":
    "Gardez un ou deux détails d'identification privés et demandez au réclamant de les décrire avant d'organiser le retour.",
  "Keep details private": "Gardez les détails privés",
  "Plan a safe handoff": "Organisez une remise sécuritaire",
  "Trust your instincts": "Faites confiance à votre instinct",
  "How does FindBack work?": "Comment fonctionne FindBack ?",
  "Search first": "Recherchez d'abord",
  "Post the essentials": "Publiez l'essentiel",
  "Compare possible matches": "Comparez les correspondances possibles",
  "Verify and arrange safely": "Vérifiez et organisez le retour en sécurité",
  STEP: "ÉTAPE",
  "Write a clear item title and choose the closest category.":
    "Donnez un titre clair à l'objet et choisissez la catégorie la plus adaptée.",
  "Include a general area, date, and helpful identifying details.":
    "Indiquez un secteur général, une date et des détails utiles pour l'identification.",
  "Review suggested matches and message the other reporter privately.":
    "Consultez les correspondances suggérées et écrivez à l'autre personne en privé.",
  "Meet in a safe public place and verify the item before handing it over.":
    "Rencontrez-vous dans un lieu public sûr et vérifiez l'objet avant la remise.",
  English: "English",
  "Switch to dark mode": "Activer le mode sombre",
  "Switch to light mode": "Activer le mode clair",
  "Dark mode": "Mode sombre",
  "Light mode": "Mode clair",
  new: "nouveau",
  Language: "Langue",
  Keys: "Clés",
  "Wallets & purses": "Portefeuilles et sacs à main",
  Phones: "Téléphones",
  Electronics: "Appareils électroniques",
  "Bags & backpacks": "Sacs et sacs à dos",
  "Clothing & accessories": "Vêtements et accessoires",
  Glasses: "Lunettes",
  "Jewellery & watches": "Bijoux et montres",
  "ID & documents": "Pièces d'identité et documents",
  Pets: "Animaux",
  "Something else": "Autre",
  "Downtown / Water Street": "Centre-ville / Water Street",
  "George Street": "Rue George",
  "Signal Hill": "Signal Hill",
  "Quidi Vidi": "Quidi Vidi",
  "Memorial University": "Université Memorial",
  "Avalon Mall area": "Secteur du centre commercial Avalon",
  "Bowring Park": "Parc Bowring",
  "Churchill Square": "Place Churchill",
  "Kenmount Road": "Route Kenmount",
  "Metrobus route": "Ligne Metrobus",
  "St. John's Airport": "Aéroport de St. John's",
  "Mount Pearl": "Mount Pearl",
  Paradise: "Paradise",
  "Other / not sure": "Autre / incertain",
  "Keys on lighthouse keyring": "Clés avec porte-clés phare",
  "House keys with blue lighthouse keychain": "Clés de maison avec porte-clés phare bleu",
  "Three silver keys on a ring with a small blue-and-white lighthouse keychain. Probably dropped walking along the harbourfront.":
    "Trois clés argentées avec un petit porte-clés phare bleu et blanc. Probablement perdues en marchant près du port.",
  "Found a set of keys with a lighthouse keychain near the boardwalk by the harbour. Describe the keys to claim.":
    "Trouvé un trousseau avec porte-clés phare près de la promenade du port. Décrivez les clés pour le réclamer.",
  "Brown leather wallet": "Portefeuille en cuir brun",
  "Worn brown bifold wallet. Lost somewhere around Bowring Park on Sunday afternoon.":
    "Portefeuille brun pliant et usé. Perdu près du parc Bowring dimanche après-midi.",
  "Leather wallet on park bench": "Portefeuille en cuir sur un banc du parc",
  "Brown leather wallet left on a bench near the duck pond. I have not opened it beyond checking for a name.":
    "Portefeuille en cuir brun oublié sur un banc près de l'étang aux canards. Je ne l'ai ouvert que pour vérifier s'il y avait un nom.",
  "Phone in dark green case": "Téléphone avec étui vert foncé",
  "Smartphone with a matte dark green case. Left at a café table on Water Street.":
    "Téléphone intelligent avec étui vert foncé mat. Oublié sur une table de café, rue Water.",
  "Green phone found at café": "Téléphone vert trouvé dans un café",
  "Staff found a phone in a green case after closing. It's locked. Owner can describe the lock screen to claim.":
    "Le personnel a trouvé un téléphone dans un étui vert après la fermeture. Il est verrouillé. Son propriétaire peut décrire l'écran de verrouillage pour le réclamer.",
  "Red hiking backpack": "Sac à dos de randonnée rouge",
  "Red daypack with grey straps. Left at a bus shelter on the Metrobus route 10.":
    "Sac à dos rouge avec bretelles grises. Oublié à un abribus de la ligne 10 du Metrobus.",
  "Red backpack at bus shelter": "Sac à dos rouge à un abribus",
  "Red backpack left at a bus shelter in the rain. Brought it inside to keep it dry.":
    "Sac à dos rouge oublié à un abribus sous la pluie. Mis à l'abri pour le garder au sec.",
  "Navy snowflake mittens": "Mitaines bleu marine à flocons",
  "Hand-knit navy mittens with white snowflakes. Sentimental — knit by my grandmother.":
    "Mitaines bleu marine tricotées à la main avec des flocons blancs. Valeur sentimentale : tricotées par ma grand-mère.",
  "Black over-ear headphones": "Casque audio noir circum-aural",
  "Black wireless headphones left on a study desk at the library.":
    "Casque audio sans fil noir oublié sur une table d'étude à la bibliothèque.",
  "Yellow umbrella with wooden handle": "Parapluie jaune à manche en bois",
  "Bright yellow umbrella with a curved wooden handle, leaning on a house near Signal Hill Road.":
    "Parapluie jaune vif à manche courbé en bois, appuyé contre une maison près de Signal Hill Road.",
  "Tortoiseshell glasses in teal case": "Lunettes écaille dans un étui turquoise",
  "Prescription glasses with tortoiseshell frames in a teal hard case. Possibly left at the Avalon Mall food court.":
    "Lunettes de vue à monture écaille dans un étui rigide turquoise. Peut-être oubliées dans l'aire de restauration du centre commercial Avalon.",
  "Glasses in a teal case": "Lunettes dans un étui turquoise",
  "Glasses in a teal case found under a table near the food court.":
    "Lunettes dans un étui turquoise trouvées sous une table près de l'aire de restauration.",
  "Silver ring": "Bague en argent",
  "Plain silver band. Might have slipped off while walking the trail at Quidi Vidi.":
    "Anneau en argent simple. Peut-être perdu en marchant sur le sentier de Quidi Vidi.",
  "Student ID card": "Carte étudiante",
  "A university student ID card. Name and photo hidden for privacy — the owner can confirm their details privately.":
    "Carte étudiante universitaire. Nom et photo masqués pour protéger la vie privée. Le propriétaire peut confirmer ses renseignements en privé.",
  "Small brown terrier named Biscuit": "Petit terrier brun nommé Biscuit",
  "Friendly small brown terrier with a red collar. Last seen near Churchill Square.":
    "Petit terrier brun amical avec un collier rouge. Vu pour la dernière fois près de la place Churchill.",
  "Grey wool scarf": "Écharpe en laine grise",
  "Long grey wool scarf found on a seat at the airport arrivals area.":
    "Longue écharpe en laine grise trouvée sur un siège dans la zone des arrivées de l'aéroport.",
  "Handed in to a local business — details shared privately":
    "Remis à un commerce local — détails communiqués en privé",
  "Kept safe at home — will meet in a public place":
    "Gardé en lieu sûr — remise prévue dans un lieu public",
  "Held by café staff": "Gardé par le personnel du café",
  "Kept safe at home": "Gardé en lieu sûr",
  "Given to the library front desk": "Remis à l'accueil de la bibliothèque",
  "Handed in to mall customer service": "Remis au service à la clientèle du centre commercial",
  "Will be returned to campus security if unclaimed":
    "Remis à la sécurité du campus sans réclamation",
  "Same area:": "Même secteur :",
  "Both in": "Les deux dans le secteur",
  "Shared words:": "Mots communs :",
  "Similar words:": "Mots similaires :",
  "Both described as": "Décrit dans les deux cas comme",
  keys: "clés",
  blue: "bleu",
  brown: "brun",
  wallet: "portefeuille",
  leather: "cuir",
  phone: "téléphone",
  green: "vert",
  red: "rouge",
  backpack: "sac à dos",
  glasses: "lunettes",
  teal: "turquoise",
  "Found Oct": "Trouvé le",
  "Lost Oct": "Perdu le",
  Posted: "Publié",
  ago: "plus tôt",
  "min ago": "min plus tôt",
  "h ago": "h plus tôt",
  "day ago": "jour plus tôt",
  "days ago": "jours plus tôt",
  "No photo —": "Aucune photo —",
  "Possible match score": "Score de correspondance possible",
  "Private contact only": "Contact privé uniquement",
  "Choose a category": "Choisir une catégorie",
  "Choose a general area": "Choisir un secteur général",
  "Upload a photo": "Téléverser une photo",
  Photo: "Photo",
  "Photo of": "Photo de",
  around: "vers le",
  Loading: "Chargement",
  "Page not found": "Page introuvable",
  "This page didn't load": "Cette page n'a pas pu être chargée",
  "Something went wrong on our end. You can try refreshing or head back home.":
    "Un problème est survenu. Actualisez la page ou retournez à l'accueil.",
  "Try again": "Réessayer",
  "Go home": "Retour à l'accueil",
  "The page you're looking for doesn't exist or has been moved.":
    "La page recherchée n'existe pas ou a été déplacée.",
  "How it works": "Comment ça marche",
  Report: "Signaler",
  "Lost & Found": "Objets perdus et trouvés",
  "Item details": "Détails de l'objet",
};

export function translate(text: string, language: Language): string {
  if (language !== "fr") return text;
  const bothIn = text.match(/^Both in (.+)$/);
  if (bothIn) return `${FR["Both in"]} ${translate(bothIn[1], language)}`;
  const similarWords = text.match(/^Similar words: (.+)$/);
  if (similarWords) {
    return `${FR["Similar words:"]} ${similarWords[1]
      .split(", ")
      .map((word) => translate(word, language))
      .join(", ")}`;
  }
  const bothDescribed = text.match(/^Both described as (.+)$/);
  if (bothDescribed) return `${FR["Both described as"]} ${translate(bothDescribed[1], language)}`;
  return FR[text] ?? text;
}

const LISTING_FIELDS_FR: Record<string, Partial<Listing>> = {
  "l-keys-1": {
    title: FR["House keys with blue lighthouse keychain"],
    description:
      FR[
        "Three silver keys on a ring with a small blue-and-white lighthouse keychain. Probably dropped walking along the harbourfront."
      ],
  },
  "f-keys-1": {
    title: FR["Keys on lighthouse keyring"],
    description:
      FR[
        "Found a set of keys with a lighthouse keychain near the boardwalk by the harbour. Describe the keys to claim."
      ],
    heldAt: FR["Handed in to a local business — details shared privately"],
  },
  "l-wallet-1": {
    title: FR["Brown leather wallet"],
    description:
      FR["Worn brown bifold wallet. Lost somewhere around Bowring Park on Sunday afternoon."],
  },
  "f-wallet-1": {
    title: FR["Leather wallet on park bench"],
    description:
      FR[
        "Brown leather wallet left on a bench near the duck pond. I have not opened it beyond checking for a name."
      ],
    heldAt: FR["Kept safe at home — will meet in a public place"],
  },
  "l-phone-1": {
    title: FR["Phone in dark green case"],
    description:
      FR["Smartphone with a matte dark green case. Left at a café table on Water Street."],
  },
  "f-phone-1": {
    title: FR["Green phone found at café"],
    description:
      FR[
        "Staff found a phone in a green case after closing. It's locked. Owner can describe the lock screen to claim."
      ],
    heldAt: FR["Held by café staff"],
  },
  "l-backpack-1": {
    title: FR["Red hiking backpack"],
    description:
      FR["Red daypack with grey straps. Left at a bus shelter on the Metrobus route 10."],
  },
  "f-backpack-1": {
    title: FR["Red backpack at bus shelter"],
    description:
      FR["Red backpack left at a bus shelter in the rain. Brought it inside to keep it dry."],
    heldAt: FR["Kept safe at home"],
  },
  "l-gloves-1": {
    title: FR["Navy snowflake mittens"],
    description:
      FR["Hand-knit navy mittens with white snowflakes. Sentimental — knit by my grandmother."],
  },
  "f-headphones-1": {
    title: FR["Black over-ear headphones"],
    description: FR["Black wireless headphones left on a study desk at the library."],
    heldAt: FR["Given to the library front desk"],
  },
  "f-umbrella-1": {
    title: FR["Yellow umbrella with wooden handle"],
    description:
      FR[
        "Bright yellow umbrella with a curved wooden handle, leaning on a house near Signal Hill Road."
      ],
  },
  "l-glasses-1": {
    title: FR["Tortoiseshell glasses in teal case"],
    description:
      FR[
        "Prescription glasses with tortoiseshell frames in a teal hard case. Possibly left at the Avalon Mall food court."
      ],
  },
  "f-glasses-1": {
    title: FR["Glasses in a teal case"],
    description: FR["Glasses in a teal case found under a table near the food court."],
    heldAt: FR["Handed in to mall customer service"],
  },
  "l-ring-1": {
    title: FR["Silver ring"],
    description:
      FR["Plain silver band. Might have slipped off while walking the trail at Quidi Vidi."],
  },
  "f-id-1": {
    title: FR["Student ID card"],
    description:
      FR[
        "A university student ID card. Name and photo hidden for privacy — the owner can confirm their details privately."
      ],
    heldAt: FR["Will be returned to campus security if unclaimed"],
  },
  "l-dog-1": {
    title: FR["Small brown terrier named Biscuit"],
    description:
      FR["Friendly small brown terrier with a red collar. Last seen near Churchill Square."],
  },
  "f-scarf-1": {
    title: FR["Grey wool scarf"],
    description: FR["Long grey wool scarf found on a seat at the airport arrivals area."],
  },
};

export function localizeListing(listing: Listing, language: Language): Listing {
  return language === "fr" ? { ...listing, ...LISTING_FIELDS_FR[listing.id] } : listing;
}

export function localizeDemoMessage(id: string, body: string, language: Language): string {
  return language === "fr" && /^m[1-5]$/.test(id) ? translate(body, language) : body;
}

export function useI18n() {
  const { preferences } = useAppState();
  return {
    language: preferences.language,
    t: (text: string) => translate(text, preferences.language),
  };
}
