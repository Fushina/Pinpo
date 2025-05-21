import express from 'express';
import { readFileSync } from 'fs';
import fs from 'fs';
import { sendLead } from './APIrequestPinpo';
import {sendSMS} from './sendSMS';
import { send } from 'process';

const config ="./config.json";
const app = express();
app.use(express.json());
const port = 3000;
const configData = JSON.parse(readFileSync(config, 'utf8'));

//console.log('configData', configData);

app.get('/', (req, res) => {
    let hasNull = Object.values(configData.env).some(value => value === null);
    if(hasNull){
        res.redirect('/config');
    }
  res.send(`<html>
        <body>
            <h1>Pinpo Integration</h1>
            <a href="/config">Configurer l'intégration</a>
            <a href="/salesPersonn">Checker la liste des commerciaux</a>
            <form action="/sendLead" method="post">
                <label for="externalIDContact">External ID Contact :</label><br>
                <input type="text" id="externalIDContact" name="externalIDContact"><br><br>
                <label for="prenom">Prénom :</label><br>
                <input type="text" id="prenom" name="prenom"><br><br>
                <label for="nom">Nom :</label><br>
                <input type="text" id="nom" name="nom"><br><br>
                <label for="telephone">Numéro de téléphone (obligatoire) :</label><br>
                <input type="tel" id="telephone" name="telephone" required><br><br>
                <label for="email">Email :</label><br>
                <input type="email" id="email" name="email"><br><br>
                <label for="provider">provider :</label><br>
                <input type="text" id="provider" name="provider"><br><br>
                <label for="product">Product Name :</label><br>
                <input type="text" id="product" name="product"><br><br>
                <label for="product_id">product id:</label><br>
                <input type="text" id="product_id" name="product_id"><br><br>
                <label for="product_city">product city:</label><br>
                <input type="text" id="product_city" name="product_city"><br><br>
                <label for="prdoduct_dep">product department:</label><br>
                <input type="text" id="product_dep" name="product_dep"><br><br>
                <label for"product_cp">product code postal:</label><br>
                <input type="number" id="product_cp" name="product_cp"><br><br>

                <label for="product_region">Product Région :</label><br>
                <select id="product_region" name="region">
                    <option value="">-- Choisissez une option --</option>
                    <option value="metropole">Métropole</option>
                    <option value="outre-mer">Outre-mer</option>
                </select><br><br>

                <input type="submit" value="Envoyer">
            </form>
        </body>
    </html>`);
});

app.get('/config', express.urlencoded({ extended: true }), (req, res) => {
    res.send(`<html>
        <body>
            <h1>Bienvenue dans votre Intégration Pinpo:</h1>
            <h2>Pour configurer votre intégration, veuillez remplir le formulaire ci-dessous :</h2>
            <form action="/configsetup" method="post">
                <label for="apikey">Votre clé API fournit par PINPO: (obligatoire) :</label><br>
                <input type="text" id="apikey" name="apikey" value="`+ configData.env.apikey +`" required><br><br>
                <label for="scenario">Votre identifiant de scénario fournit par PINPO: (obligatoire) :</label><br>
                <input type="text" id="scenario" name="scenario" value="`+ configData.env.scenario +`" required><br><br>
                <label for="endpoint">Votre endpoint fournit à PINPO pour le webhook: (obligatoire) :</label><br>
                <input type="text" id="endpoint" name="endpoint" value="`+ configData.env.endpoint +`" required><br><br>
                <input type="submit" value="Envoyer">
            </form>
        </body>
    </html>`);
});

app.post('/configsetup', express.urlencoded({ extended: true }), (req, res) => {
    const { apiKey, scenario, endpoint } = req.body;
    configData.env.apiKey = apiKey;
    configData.env.scenario = scenario;
    configData.env.endpoint = endpoint;
    const jsonString = JSON.stringify(configData, null, 2); // indenté pour lisibilité

    // Écrire dans config.json (dans le même dossier)
    fs.writeFile('config.json', jsonString, 'utf8', (err) => {
        if (err) {
            res.send(`<html>
                <body>
                    <h1>Les informations n'ont pas pu être sauvegardé:</h1>
                    <a href="/">Reeasyer</a>
                </body>
            </html>`);
            console.error('Erreur lors de l’écriture du fichier', err);
            return;
        }
        res.send(`<html>
            <body>
                <h1>Les informations sont bien sauvegardés:</h1>
                <a href="/">Retour à l'accueil</a>
            </body>
        </html>`);
    });    
    
});

app.get('/salesPersonn', (req, res) => {
    let list_commerciaux ="";
    for (const commercial of configData.salesPersonn) {
        //console.log("commercial",commercial);
        list_commerciaux += `<li>${commercial.firstname}</li>`;
    }

    res.send(`<html>
        <body>
            <h1>Liste des commerciaux:</h1>
            <ul>
                ${list_commerciaux}
            </ul>
            <a href="/">Retour à l'accueil</a>
        </body>
    </html>`);
});

app.post('/sendLead', express.urlencoded({ extended: true }), (req, res) => {
    const { externalIDContact, prenom, nom, telephone, email, region, provider,product, product_id, product_city,product_cp, product_dep } = req.body;
    sendLead(prenom, nom, telephone.replace(/\+/g, ""), email, region, provider,product, product_id, externalIDContact, product_city,product_cp, product_dep)
    .then(() => {
    res.redirect('/?result=success')})
    .catch((error) => {
        console.error('Erreur lors de l\'envoi du lead:', error);
        res.redirect('/?zresult=error');
    });
    
});
app.post('/webhook', (req, res) => {
    console.log('Webhook reçu !');
    console.log(req.body);
    res.status(200).send('Webhook reçu !');
});
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
