
Feature - Português

  Feature: Validação das Funcionalidades do Jogo CPS Gaming

  Scenario: Iniciar o jogo corretamente
    Dado que o usuário acessa a página inicial do jogo
    Quando o usuário digitar "JogadorTeste" no campo de nome
    E selecionar o modo "Normal (10s)"
    E clicar no botão "Iniciar"
    Então o botão "Iniciar" deve estar desativado
    E a contagem regressiva deve ser exibida
    E a contagem regressiva deve começar em "3"
    E após 1 segundo, a contagem deve mostrar "2"
    E após mais 1 segundo, a contagem deve mostrar "1"

  Scenario: Registrar cliques corretamente
    Dado que o usuário acessa a página inicial do jogo
    Quando o usuário digitar "JogadorTeste" no campo de nome
    E selecionar o modo "Difícil (5s)"
    E clicar no botão "Iniciar"
    E aguardar o início do jogo
    E clicar 6 vezes na área de jogo
    Então o contador de cliques deve mostrar "6"

  Scenario: Exibir o ranking corretamente após salvar
    Dado que o usuário acessa a página inicial do jogo
    Quando o usuário digitar "JogadorTeste" no campo de nome
    E selecionar o modo "Impossível (1s)"
    E clicar no botão "Iniciar"
    E clicar 4 vezes na área de jogo
    E clicar no botão "Salvar"
    Então o ranking deve conter 1 item
    E o ranking deve exibir o nome "JogadorTeste"
    E o ranking deve exibir "CPS: 4"

  Scenario: Reiniciar o jogo corretamente
    Dado que o usuário acessa a página inicial do jogo
    Quando o usuário digitar "JogadorTeste" no campo de nome
    E clicar no botão "Iniciar"
    E aguardar o início do jogo
    E clicar no botão "Reiniciar"
    Então o contador de cliques deve ser "0"
    E o contador de CPS deve ser "0"
    E o tempo deve ser "0"
    E o botão "Iniciar" deve estar ativado
    E o botão "Salvar" deve estar desativado

  Scenario: Exibir a mensagem correta dos respectivos CPS
    Dado que o usuário acessa a página inicial do jogo
    E que os ranks e mensagens são definidos como:
      | CPS | Mensagem                                      |
      | 3   | Nada mal, mas dá pra melhorar... 😐           |
      | 5   | Bom trabalho! Você é decente! 👍              |
      | 7   | Ótimo! Você é um jogador acima da média! 🌟   |
      | 9   | Incrível! Você é um jogador bom! 🔥           |
    Quando o usuário digitar um "JogadorAlpha" no campo de nome
    E selecionar o modo "Impossível (1s)"
    E clicar na área de jogo o número de vezes correspondente ao CPS
    Então a mensagem exibida deve corresponder ao desempenho do jogador
    E o jogo deve ser reiniciado para o próximo teste

  Scenario: Salvar no ranking os resultados na ordem do maior CPS para o menor
    Dado que os ranks e mensagens são definidos como:
      | CPS | Mensagem                                      |
      | 3   | Nada mal, mas dá pra melhorar... 😐           |
      | 5   | Bom trabalho! Você é decente! 👍              |
      | 7   | Ótimo! Você é um jogador acima da média! 🌟   |
      | 9   | Incrível! Você é um jogador bom! 🔥           |
    Quando o usuário digitar um nome da lista de jogadores
    E clicar na área de jogo o número de vezes correspondente ao CPS
    E clicar no botão "Salvar"
    Então o ranking deve exibir os resultados em ordem decrescente de CPS

Feature - Parcialmente Em Inglês 

  Feature: Validação das Funcionalidades do Jogo CPS Gaming
 
  Background:
    Given que o usuário acessa a página inicial do jogo

  Scenario: Iniciar o jogo corretamente
    When o usuário digitar "JogadorTeste" no campo de nome
    And selecionar o modo "Normal (10s)"
    And clicar no botão "Iniciar"
    Then o botão "Iniciar" deve estar desativado
    And a contagem regressiva deve ser exibida
    And a contagem regressiva deve começar em "3"
    And após 1 segundo, a contagem deve mostrar "2"
    And após mais 1 segundo, a contagem deve mostrar "1"

  Scenario: Registrar cliques corretamente
    When o usuário digitar "JogadorTeste" no campo de nome
    And selecionar o modo "Difícil (5s)"
    And clicar no botão "Iniciar"
    And aguardar o início do jogo
    And clicar 6 vezes na área de jogo
    Then o contador de cliques deve mostrar "6"

  Scenario: Exibir o ranking corretamente após salvar
    When o usuário digitar "JogadorTeste" no campo de nome
    And selecionar o modo "Impossível (1s)"
    And clicar no botão "Iniciar"
    And clicar 4 vezes na área de jogo
    And clicar no botão "Salvar"
    Then o ranking deve conter 1 item
    And o ranking deve exibir o nome "JogadorTeste"
    And o ranking deve exibir "CPS: 4"

  Scenario: Reiniciar o jogo corretamente
    When o usuário digitar "JogadorTeste" no campo de nome
    And clicar no botão "Iniciar"
    And aguardar o início do jogo
    And clicar no botão "Reiniciar"
    Then o contador de cliques deve ser "0"
    And o contador de CPS deve ser "0"
    And o tempo deve ser "0"
    And o botão "Iniciar" deve estar ativado
    And o botão "Salvar" deve estar desativado

  Scenario: Exibir a mensagem correta dos respectivos CPS
    Given que os ranks e mensagens são definidos como:
      | CPS | Mensagem                                      |
      | 3   | Nada mal, mas dá pra melhorar... 😐           |
      | 5   | Bom trabalho! Você é decente! 👍              |
      | 7   | Ótimo! Você é um jogador acima da média! 🌟   |
      | 9   | Incrível! Você é um jogador bom! 🔥           |
    When o usuário digitar um nome da lista de jogadores
    And selecionar o modo "Impossível (1s)"
    And clicar na área de jogo o número de vezes correspondente ao CPS
    Then a mensagem exibida deve corresponder ao desempenho do jogador
    And o jogo deve ser reiniciado para o próximo teste

  Scenario: Salvar no ranking os resultados na ordem do maior CPS para o menor
    Given que os ranks e mensagens são definidos como:
      | CPS | Mensagem                                      |
      | 3   | Nada mal, mas dá pra melhorar... 😐           |
      | 5   | Bom trabalho! Você é decente! 👍              |
      | 7   | Ótimo! Você é um jogador acima da média! 🌟   |
      | 9   | Incrível! Você é um jogador bom! 🔥           |
    When o usuário digitar um nome da lista de jogadores
    And clicar na área de jogo o número de vezes correspondente ao CPS
    And clicar no botão "Salvar"
    Then o ranking deve exibir os resultados em ordem decrescente de CPS

Feature - Inglês

 Feature: Validation of CPS Gaming Game Features
  

  Background:
    Given the user accesses the game's homepage

  Scenario: Start the game correctly
    When the user types "PlayerTest" in the name field
    And selects the mode "Normal (10s)"
    And clicks the "Start" button
    Then the "Start" button should be disabled
    And the countdown should be displayed
    And the countdown should start at "3"
    And after 1 second, the countdown should show "2"
    And after another second, the countdown should show "1"

  Scenario: Register clicks correctly
    When the user types "PlayerTest" in the name field
    And selects the mode "Hard (5s)"
    And clicks the "Start" button
    And waits for the game to start
    And clicks 6 times in the game area
    Then the click counter should display "6"

  Scenario: Display the ranking correctly after saving
    When the user types "PlayerTest" in the name field
    And selects the mode "Impossible (1s)"
    And clicks the "Start" button
    And clicks 4 times in the game area
    And clicks the "Save" button
    Then the ranking should contain 1 item
    And the ranking should display the name "PlayerTest"
    And the ranking should display "CPS: 4"

  Scenario: Restart the game correctly
    When the user types "PlayerTest" in the name field
    And clicks the "Start" button
    And waits for the game to start
    And clicks the "Restart" button
    Then the click counter should be "0"
    And the CPS counter should be "0"
    And the time should be "0"
    And the "Start" button should be enabled
    And the "Save" button should be disabled

  Scenario: Display the correct message for respective CPS
    Given the ranks and messages are defined as:
      | CPS | Message                                      |
      | 3   | Not bad, but you can do better... 😐         |
      | 5   | Good job! You are decent! 👍                 |
      | 7   | Great! You are an above-average player! 🌟   |
      | 9   | Incredible! You are a good player! 🔥        |
    When the user types a name from the player list
    And selects the mode "Impossible (1s)"
    And clicks in the game area the number of times corresponding to the CPS
    Then the displayed message should match the player's performance
    And the game should restart for the next test

  Scenario: Save the ranking results in descending order of CPS
    Given the ranks and messages are defined as:
      | CPS | Message                                      |
      | 3   | Not bad, but you can do better... 😐         |
      | 5   | Good job! You are decent! 👍                 |
      | 7   | Great! You are an above-average player! 🌟   |
      | 9   | Incredible! You are a good player! 🔥        |
    When the user types a name from the player list
    And clicks in the game area the number of times corresponding to the CPS
    And clicks the "Save" button
    Then the ranking should display the results in descending order of CPS