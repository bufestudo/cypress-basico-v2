/// <reference types="Cypress" />

//const { get } = require("cypress/types/lodash");


describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')


    })
    it('preenche os campos obrigatórios e envia o formulário', () => {
        const longText = 'Teste, Teste, Teste, Teste, Teste'

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        cy.get('#firstName').type('Bruno')
        cy.get('#lastName').type('Felipe')
        cy.get('#email').type('brunofelipegois@gmail.com')
        cy.get('#phone').type('99999999999')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

    });
    it('mensagem de erro ao submeter o formulário com um email com formatação inválidao', () => {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        cy.get('#firstName').type('Bruno')
        cy.get('#lastName').type('Felipe')
        cy.get('#email').type('brunofelipegois,gmail.com')
        cy.get('#phone').type('99999999999')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    });
    it('valor não-numérico', () => {

        cy.get('#phone')
            .type('mnd,mwbdwndw,b')
            .should('have.value', '')

    });
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        cy.get('#firstName').type('Bruno')
        cy.get('#lastName').type('Felipe')
        cy.get('#email').type('brunofelipegois,gmail.com')
        cy.get('#phone-checkbox').check()
        //cy.get('#phone').type('99999999999')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    });
    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {

        cy.get('#firstName').type('Bruno')
            .should('have.value', 'Bruno')
            .clear().should('have.value', '')
        cy.get('#lastName').type('Felipe')
            .should('have.value', 'Felipe')
            .clear().should('have.value', '')
        cy.get('#email').type('brunofelipegois@gmail.com')
            .should('have.value', 'brunofelipegois@gmail.com')
            .clear().should('have.value', '')
        cy.get('#phone').type('0000000000')
            .should('have.value', '0000000000')
            .clear().should('have.value', '')

    });
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {

        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')

    });
    it.only('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()

        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')


    });
    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    });
    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    });
    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('select')
            .select(1)
            .should('have.value', 'blog')
    });
    it('marca o tipo de atendimento "Feedback', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    });
    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check().should('be.checked')
        cy.get('input[type="radio"][value="feedback"]')
            .check().should('be.checked')
        cy.get('input[type="radio"][value="feedback"]')
            .check().should('be.checked')
        cy.get('input[type="radio"][value="feedback"]')
            .check().should('be.checked')

    });
    it('marca cada tipo de atendimento - EXTRA', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')

            })


    });
    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')


    })

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })


    });
    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: "drag-drop" })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })


    });
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })


    });

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    });

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')
    });

    it('testa a página da política de privacidade de forma independente', () => {
        
        
    });


});



