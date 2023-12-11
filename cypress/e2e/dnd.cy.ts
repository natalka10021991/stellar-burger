describe('DND', () => {
  //  cy.visit('/')

  it('dragged and dropped', () => {
    cy.visit('/');
    cy.get('[data-cy=ingredients]').contains('Соус фирменный Space Sauce').trigger('dragstart');
    cy.get('[data-cy=constructor]').trigger('drop', { force: true });
    cy.get('[data-cy=dropped-el]').contains('Соус фирменный Space Sauce');

  });
});
