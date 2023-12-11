describe('Modal open', () => {

  it('Opens modal, check data< close modal', () => {
    cy.visit('/');
    cy.get('[data-cy=ingredients]').contains('Соус фирменный Space Sauce').click();
    cy.get('[data-cy=modal-ingredients]').contains('Соус фирменный Space Sauce').click();
    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=modal-ingredients]').should('not.exist')
  });
});
