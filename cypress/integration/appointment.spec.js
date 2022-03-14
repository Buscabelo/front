/// <reference types="cypress" />

const userExample = require('../fixtures/user');

describe('Testes de Agendamentos', () => {
  beforeEach(() => {
    cy.viewport('iphone-se2');
    cy.visit(`${Cypress.env('host')}/`);
    cy.fixture('user.json').as('user');
  });

  it.only('Deve agendar um horário', () => {
    cy.get('[href="/acesso"]').click();
    cy.get(':nth-child(1) > input').as('login:email');
    cy.get(':nth-child(2) > input').as('login:password');

    // Cadastro de usuário
    cy.get('p > a').click();
    cy.get(':nth-child(2) > input').as('register:first_name')
      .should('be.empty').type(userExample.first_name);
    cy.get(':nth-child(3) > input').as('register:last_name')
      .should('be.empty').type(userExample.last_name);
    cy.get(':nth-child(4) > input').as('register:email')
      .should('be.empty').type(userExample.email);
    cy.get(':nth-child(5) > input').as('register:password')
      .should('be.empty').type(userExample.password);
    cy.intercept('POST', '**/customers').as('customer_create');
    cy.get('[type="submit"]').click();
    cy.wait('@customer_create').then(({ response }) => {
      expect(response.statusCode).be.eq(200);
      expect(response.body).has.property('success');
      expect(response.body.success).is.not.null;
      expect(response.body.success).be.eq(true);
    });

    // Login
    cy.get('@login:email').should('be.empty').type(userExample.email);
    cy.get('@login:password').should('be.empty').type(userExample.password);
    cy.intercept('POST', '**/sessions').as('session_create');
    cy.get('[type="submit"]').click();
    cy.wait('@session_create').then(({ response }) => {
      expect(response.statusCode).be.eq(200);
      expect(response.body).has.property('success');
      expect(response.body.success).is.not.null;
      expect(response.body.success).be.eq(true);
    });

    // Busca por estabelecimento
    cy.wait(400);
    cy.get('[href="/pesquisa"]').click();
    cy.get('#react-tabs-2').click();
    cy.get('input').type('Barbearia do Cubano');
    cy.get('.providers > li > header > h3').should('have.text', 'Barbearia do Cubano');
    cy.get('.providers > li').click();

    // Seleção de Serviço
    cy.wait(300);
    cy.get('.services > ul > :nth-child(1) > main > b').should('have.text', 'Barba + Bigode');
    cy.get('.services > ul > :nth-child(1)').click();

    // Agendamento
    cy.wait(300);
    cy.get('.calendar-container > header > :nth-child(2)').click();
    cy.get('tbody > tr > :nth-child(5)').click();
    cy.get('.schedules > :nth-child(2)').click();
    cy.get('footer > button').click();
    cy.intercept('POST', '**/appointments').as('appointment_create');
    cy.get('footer > :nth-child(1)').click();
    cy.wait('@appointment_create').then(({ response }) => {
      expect(response.statusCode).be.eq(200);
      expect(response.body).has.property('success');
      expect(response.body.success).is.not.null;
      expect(response.body.success).be.eq(true);
    });
    cy.get('#swal2-title').should('have.text', 'Sucesso!');
    cy.screenshot({
      capture: 'runner',
    });
  });
});
