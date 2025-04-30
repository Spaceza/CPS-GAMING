describe('Testes De Funcioanmento Do CPS Gaming', () => {
  beforeEach(() => {
    cy.visit('index.html');
  });

  it('Deve iniciar o jogo corretamente', () => {
    cy.get('#nome').type('JogadorTeste');
    cy.get('#modo').select('0');  // Seleciona o modo de jogo "Normal" (10s)
    cy.get('#botao_iniciar_jogo').click()
    cy.get('#botao_iniciar_jogo').should('be.disabled');
    cy.get('#contagem-regressiva').should('be.visible'); 
    cy.get('#contagem-regressiva').should('contain.text', '3'); 
    cy.wait(1000) 
    cy.get('#contagem-regressiva').should('contain.text', '2'); 
    cy.wait(1000)
    cy.get('#contagem-regressiva').should('contain.text', '1');
  });

  it('Deve registrar cliques corretamente', () => {
    cy.get('#nome').type('JogadorTeste'); 
    cy.get('#modo').select('5'); 
    cy.get('#botao_iniciar_jogo').click();
    cy.wait(3000);
    cy.get('#area-jogo').click().click().click().click().click().click();
    cy.get('#cliques').should('have.text', '6'); 
  });

  it('Deve exibir o ranking corretamente após salvar', () => {
    cy.get('#nome').type('JogadorTeste'); 
    cy.get('#modo').select('1'); 
    cy.get('#botao_iniciar_jogo').click(); 
    cy.get('#area-jogo').click().click().click().click(); 
    cy.get('#botao_salvar').click(); 
    cy.get('#lista-ranking li').should('have.length', 1); 
    cy.get('#lista-ranking li').first().should('contain.text', 'JogadorTeste'); 
    cy.get('#lista-ranking li').first().should('contain.text', 'CPS: 4');
  });

  it('Deve reiniciar o jogo corretamente', () => {
    cy.get('#nome').type('JogadorTeste');
    cy.get('#botao_iniciar_jogo').click(); 
    cy.wait(4000)
    cy.get('#botao_reiniciar').click();
    cy.get('#cliques').should('have.text', '0'); 
    cy.get('#cps').should('have.text', '0'); 
    cy.get('#tempo').should('have.text', '0');
    cy.get('#botao_iniciar_jogo').should('be.enabled'); 
    cy.get('#botao_salvar').should('be.disabled');
  });

  it('Deve exibir a mensagem correta dos respectivos CPS', () => {
    const ranks = [ // Array de Objetos salvando os cps necessesários e suas respectivas mensagens
      { cps: 4, mensagem: 'Nada mal, mas dá pra melhorar... 😐' },
      { cps: 6, mensagem: 'Bom trabalho! Você é decente! 👍' },
      { cps: 8, mensagem: 'Ótimo! Você é um jogador acima da média! 🌟' },
      { cps: 10, mensagem: 'Incrível! Você é um jogador bom! 🔥' },
    ];

    let contador = 0; // Variável para controlar o índice 
  
    // Parametro do Each(Objeto, indice, arrayCompleto)
    ranks.forEach((RankSelecionado, contador) => {

      cy.get('#nome').type('JogadorAlpha'); 
      cy.get('#modo').select('1');
      cy.get('#botao_iniciar_jogo').click(); 
      cy.wait(3000); 

      const cliquesNecessarios = RankSelecionado.cps; 

      
      for (let i = 0; i < cliquesNecessarios; i++) { 
        cy.get('#area-jogo').click();
      }


      cy.get('#resultado').should('contain.text', RankSelecionado.mensagem); 
      cy.get('#botao_reiniciar').click();

      contador++; 
    });
    
  });

  it('Deve salvar no ranking os resultados na ordem do maior CPS para o menor', () => {
    const ranks = [ 
      { cps: 3, mensagem: 'Nada mal, mas dá pra melhorar... 😐' },
      { cps: 5, mensagem: 'Bom trabalho! Você é decente! 👍' },
      { cps: 7, mensagem: 'Ótimo! Você é um jogador acima da média! 🌟' },
      { cps: 9, mensagem: 'Incrível! Você é um jogador bom! 🔥' },
    ];

    let contador2 = 0; // Variável para controlar o índice do "forEach" e o nome da lista de nomes

    const ListaDeNomes = ['JogadorAlpha', 'JogadorBeta', 'JogadorCharlie', 'JogadorDelta'];

    // Parametro do Each(ObjetoAtual, indice, arrayCompleto)
    ranks.forEach((RankSelecionado, contador2) => {
    
      const NomeDaLista = ListaDeNomes[contador2]; 

      cy.get('#nome').type(NomeDaLista); 
      cy.get('#modo').select('1');
      cy.get('#botao_iniciar_jogo').click(); 
      cy.wait(3000); 

      const cliquesNecessarios = RankSelecionado.cps; 
      
      for (let i = 0; i < cliquesNecessarios; i++) { 
        cy.get('#area-jogo').click();
      }

      cy.get('#botao_salvar').click();
      cy.get('#botao_reiniciar').click();
    

      contador2++;
    });

    // Verifica se os resultados estão salvos na ordem correta
    cy.get('#lista-ranking li').should('have.length', 4);
    cy.get('#lista-ranking li').eq(0).should('contain.text', 'JogadorDelta'); 
    cy.get('#lista-ranking li').eq(3).should('contain.text', 'JogadorAlpha'); 
  });
});