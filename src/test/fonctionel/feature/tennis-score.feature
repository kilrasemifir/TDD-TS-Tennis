Feature: Creation d'un partie

    Scenario: Quand on creer une partie, les points des joueurs sont initialement a 0
        Given une nouvelle partie
        When je demande les scores
        Then les points sont a 0