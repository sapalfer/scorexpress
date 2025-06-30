# Configuration de l'envoi de PDF par email dans ScoreXpress

Ce document explique comment configurer et utiliser la fonctionnalité d'envoi de résultats par email dans ScoreXpress.

## Prérequis

Pour utiliser cette fonctionnalité, vous devez disposer d'un compte EmailJS. EmailJS est un service qui permet d'envoyer des emails directement depuis le frontend, sans nécessiter de backend.

1. Créez un compte sur [EmailJS](https://www.emailjs.com/) (un plan gratuit est disponible)
2. Créez un service email (par exemple via Gmail, Outlook, etc.)
3. Créez un modèle d'email pour les PDFs de résultats de score

## Configuration du modèle EmailJS

Créez un nouveau modèle d'email dans EmailJS avec les variables suivantes :
- `{{to_email}}` - L'adresse email du destinataire
- `{{score_name}}` - Le nom du score médical
- `{{score_value}}` - La valeur numérique du résultat
- `{{interpretation}}` - L'interprétation textuelle du résultat
- `{{pdf_data}}` - Les données du PDF (générées automatiquement par l'application)

Exemple de modèle HTML :
```html
<!DOCTYPE html>
<html>
<head>
    <title>Résultat de score médical - ScoreXpress</title>
</head>
<body>
    <h1>Résultat de votre score médical</h1>
    <p>Bonjour,</p>
    <p>Voici votre résultat pour le score <strong>{{score_name}}</strong> :</p>
    
    <div style="margin: 20px 0; padding: 15px; border: 1px solid #ccc; border-radius: 5px;">
        <p><strong>Valeur :</strong> {{score_value}}</p>
        <p><strong>Interprétation :</strong> {{interpretation}}</p>
    </div>
    
    <p>Vous trouverez le détail complet de ce résultat dans le PDF en pièce jointe.</p>
    <p>Cordialement,<br>L'équipe ScoreXpress</p>
</body>
</html>
```

## Configuration des variables d'environnement

1. Dupliquez le fichier `.env.example` en `.env` (si ce n'est pas déjà fait)
2. Mettez à jour les variables suivantes dans votre fichier `.env` :

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_USER_ID=your_public_key
```

Vous pouvez trouver ces informations dans votre tableau de bord EmailJS :
- Service ID : Dans l'onglet "Services"
- Template ID : Dans l'onglet "Email Templates"
- User ID (Public Key) : Dans l'onglet "Account" > "API Keys"

## Utilisation

Une fois la configuration terminée :

1. Calculez un score médical normalement
2. Lorsque le résultat s'affiche, cliquez sur le bouton "Envoyer par email"
3. Entrez l'adresse email du destinataire
4. Cliquez sur "Envoyer le PDF"

Le résultat sera converti en PDF et envoyé par email à l'adresse indiquée.

## Dépannage

Si vous rencontrez des problèmes lors de l'envoi d'emails :

1. Vérifiez que vos variables d'environnement sont correctement configurées
2. Assurez-vous que votre modèle EmailJS contient les variables nécessaires
3. Vérifiez les limites de votre plan EmailJS (nombre d'emails par mois)
4. Consultez la console du navigateur pour les messages d'erreur détaillés
