import { JoueurDeTennis } from "../../app/entities/JoueurDeTennis";
import { TennisCompteurDeScore } from "../../app/services/TennisCompteurDeScore"
import { Score } from "../../app/valuesObjects/Score";
describe("Creation d'une partie", ()=>{
    let tennisCompteurDeScore = new TennisCompteurDeScore();
    let premierJoueur = new JoueurDeTennis();
    let secondJoueur = new JoueurDeTennis();
    let partieDeTennis = tennisCompteurDeScore.creerUneNouvellePartie(premierJoueur, secondJoueur);
    let scorePremierJoueur  = partieDeTennis.scoreDuPremierJoueur;
    let scoreDuSecondJoueur = partieDeTennis.scoreDuSecondJoueur;

    beforeEach(()=>{
        partieDeTennis = tennisCompteurDeScore.creerUneNouvellePartie(premierJoueur, secondJoueur);
        scorePremierJoueur  = partieDeTennis.scoreDuPremierJoueur;
        scoreDuSecondJoueur = partieDeTennis.scoreDuSecondJoueur;
    })

    it("Un utilisateur peut créer une nouvelle partie, en affectant deux joueurs", ()=>{
        let partieDeTennis = tennisCompteurDeScore.creerUneNouvellePartie(premierJoueur, secondJoueur);
        expect(partieDeTennis.premierJoueur).toBe(premierJoueur);
        expect(partieDeTennis.secondJoueur).toBe(secondJoueur);
    })
    describe("Au debut de la partie, les scores sont initialement a 0", ()=>{
        let partieDeTennis = tennisCompteurDeScore.creerUneNouvellePartie(premierJoueur, secondJoueur);
        let scorePremierJoueur = partieDeTennis.scoreDuPremierJoueur;
        let scoreSecondJoueur = partieDeTennis.scoreDuSecondJoueur;
        it("Le nombre de points du premier joueur est de 0", ()=>{
            expect(scorePremierJoueur.points).toBe(0);
        })

        it("Le nombre de points du second joueur est de 0", ()=>{
            expect(scoreSecondJoueur.points).toBe(0);
        })
    })
})

describe("Quand un joueur gagne un point", ()=>{
    let tennisCompteurDeScore = new TennisCompteurDeScore();
    let premierJoueur = new JoueurDeTennis();
    let secondJoueur = new JoueurDeTennis();
    let partieDeTennis = tennisCompteurDeScore.creerUneNouvellePartie(premierJoueur, secondJoueur);
    let scorePremierJoueur  = partieDeTennis.scoreDuPremierJoueur;
    let scoreDuSecondJoueur = partieDeTennis.scoreDuSecondJoueur;

    beforeEach(()=>{
        partieDeTennis = tennisCompteurDeScore.creerUneNouvellePartie(premierJoueur, secondJoueur);
        scorePremierJoueur  = partieDeTennis.scoreDuPremierJoueur;
        scoreDuSecondJoueur = partieDeTennis.scoreDuSecondJoueur;
    })
    it("S'il a 0 points, il passe a 15, sans changer le score du perdant", ()=>{
        tennisCompteurDeScore.joueurGagneLePoint(partieDeTennis, premierJoueur);
        expect(scorePremierJoueur.points).toBe(15);
        expect(scoreDuSecondJoueur.points).toBe(0);
    })

    it("Quand le second joueur gagne un point, s'il a 0 points, il passe a 15, sans changer le score du perdant", ()=>{
        tennisCompteurDeScore.joueurGagneLePoint(partieDeTennis, secondJoueur);
        expect(scorePremierJoueur.points).toBe(0);
        expect(scoreDuSecondJoueur.points).toBe(15);
    })

    it("Quand le nombre de points d'un joueur passe de 0 à15, puis à 30 puis à 40", ()=>{
        tennisCompteurDeScore.joueurGagneLePoint(partieDeTennis, premierJoueur);
        expect(scorePremierJoueur.points).toBe(15);
        tennisCompteurDeScore.joueurGagneLePoint(partieDeTennis, premierJoueur);
        expect(scorePremierJoueur.points).toBe(30);
        tennisCompteurDeScore.joueurGagneLePoint(partieDeTennis, premierJoueur);
        expect(scorePremierJoueur.points).toBe(40);
    })

    it("Si le gagnant a 40 points et le perdant moins de 40, alors il gagne le jeu", ()=>{
        tennisCompteurDeScore.definitionDesScores(partieDeTennis, new Score(40), new Score(30));
        tennisCompteurDeScore.joueurGagneLePoint(partieDeTennis, premierJoueur);
        scorePremierJoueur = partieDeTennis.scoreDuPremierJoueur;
        scoreDuSecondJoueur = partieDeTennis.scoreDuSecondJoueur;
        expect(scorePremierJoueur.jeuGagne).toBe(1);
    })

    describe("Quand les deux joueurs sont a 40 points", ()=>{
        it("Si aucun joueurs ne posséde d'avantage, alors le joueur gagnant gagne un avantage",()=>{
            tennisCompteurDeScore.definitionDesScores(partieDeTennis, new Score(40), new Score(40));
            tennisCompteurDeScore.joueurGagneLePoint(partieDeTennis, premierJoueur);
            scorePremierJoueur = partieDeTennis.scoreDuPremierJoueur;
            scoreDuSecondJoueur = partieDeTennis.scoreDuSecondJoueur;
            expect(scorePremierJoueur.avantage).toBeTruthy();
            expect(scoreDuSecondJoueur.avantage).toBeFalsy();
        })

        it("Si le perdant posséde deja un avantage, alors le perdant le perd son avantage", ()=>{
            tennisCompteurDeScore.definitionDesScores(partieDeTennis, new Score(40), new Score(40, 0, true));
            tennisCompteurDeScore.joueurGagneLePoint(partieDeTennis, premierJoueur);
            scorePremierJoueur = partieDeTennis.scoreDuPremierJoueur;
            scoreDuSecondJoueur = partieDeTennis.scoreDuSecondJoueur;
            expect(scorePremierJoueur.avantage).toBeFalsy();
            expect(scoreDuSecondJoueur.avantage).toBeFalsy();
        })

        it("Si le gagnant posséde deja un avantage, alors il gagne un jeu", ()=>{
            tennisCompteurDeScore.definitionDesScores(partieDeTennis, new Score(40, 0, true), new Score(40));
            tennisCompteurDeScore.joueurGagneLePoint(partieDeTennis, premierJoueur);
            scorePremierJoueur = partieDeTennis.scoreDuPremierJoueur;
            scoreDuSecondJoueur = partieDeTennis.scoreDuSecondJoueur;
            expect(scorePremierJoueur.jeuGagne).toBe(1);
        })

        it("Si le gagnant posséde deja un avantage, alors les deux joueurs retournent à 0 points", ()=>{
            tennisCompteurDeScore.definitionDesScores(partieDeTennis, new Score(40, 0, true), new Score(40));
            tennisCompteurDeScore.joueurGagneLePoint(partieDeTennis, premierJoueur);
            scorePremierJoueur = partieDeTennis.scoreDuPremierJoueur;
            scoreDuSecondJoueur = partieDeTennis.scoreDuSecondJoueur;
            expect(scorePremierJoueur.points).toBe(0);
            expect(scoreDuSecondJoueur.points).toBe(0);
        })
    })
})