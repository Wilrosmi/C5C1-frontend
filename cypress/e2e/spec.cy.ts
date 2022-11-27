import { createYield } from 'typescript';
import { frontEndUrl } from '../../src/utils/baseUrl';

// example test given on cypress website (should always pass)
describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })
})

describe('empty spec', () => {
    it('passes', () => {
      cy.visit(frontEndUrl);
    })
  })

describe('Visits site and does not find create resource button when not logged in', () => {
  it('finds the create resource button', () => {
    cy.visit(frontEndUrl);
    cy.get('#create_new_resource_button').should('not.exist');
  })
})

// describe('Resource list is open (rather than study list) on visit to site', () => {
//   it('finds which tab is open', () => {
//     cy.visit(frontEndUrl);
//     cy.get('#create_new_resource_button').should('not.exist');
//   })
// })

describe('Visits site, signs in as Beill, and clicks create resource button', () => {
  it('finds the login dropdown and selects Beill', () => {
    cy.visit(frontEndUrl);
    cy.get('#search-bar').get('#select-user').select('Beill Nogie');
  });
  it('logs in as Beill and clicks create resource button, which opens creat resource modal', () => {
    cy.visit(frontEndUrl);
    cy.get('#search-bar').get('#select-user').select('Beill Nogie');
    cy.contains('Create Resource').click();
    cy.contains('Add new tag');
  })
})

describe('Visits site, signs in as Beill, and creates a new resource', () => {
  it('logs in as Beill and clicks create resource button, which opens creat resource modal', () => {
    cy.visit(frontEndUrl);
    cy.get('#search-bar').get('#select-user').select('Beill Nogie');
    cy.contains('Create Resource').click();
    cy.get('#resource-name-input').click().type('fake title');
    cy.get('#author-name-input').click().type('fake author');
    cy.get('#url-input').click().type('fake url');
    cy.get('#content-type-input').click().type('fake content');
    cy.get('#description-input').click().type('fake description');
    cy.get('#opinion-select').select('Have not used, but looks promising');
    cy.get('#opinion-reason-input').click().type('fake opinion reason');
    cy.get('#buildStageName-select').select('0: Welcome to Academy Build');
    cy.get('.tags-to-select').contains('a').click();
    cy.contains('Submit').click();  
  })
  it('sees the new resource and is able to open it, add a comment, and like the resource', () => {
    cy.contains('fake title').click();
    cy.get('#comment-input').click().type('first fake comment');
    cy.contains('Add comment').click();
  })
  it('deletes the resource', () => {
    cy.wait(3000);
    cy.contains('Delete').click();
  })
})

//todo
//