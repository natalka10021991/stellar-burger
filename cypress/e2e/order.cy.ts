describe('Order', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
      fixture: 'order.json',
    }).as('postOrder');
    // Устанавливаем токены:
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify(
        '3610b3ecd608f600586fed92dbaa783351b6ded41c1fc4335360b0f4b04f36a49013bed6e3cc20cf'
      )
    );
    window.localStorage.setItem(
      'accessToken',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzY0YzY4NTJiNGNmMDAxZDg2Y2E0ZSIsImlhdCI6MTcwMjI4NDAwMSwiZXhwIjoxNzAyMjg1MjAxfQ.G2MKboO3XVuIyQJwfYRzGGcIsynIQu6n_2Zrdqg5Aog'
    );
  });

  it('Opens modal, check data< close modal', () => {
    cy.visit('/');
    cy.get('[data-cy=ingredients').contains('Краторная булка').trigger('dragstart');
    cy.get('[data-cy=constructor]').trigger('drop', { force: true });
    cy.get('[data-cy=dropped-bun]').contains('Краторная булка');

    cy.get('[data-cy=ingredients]').contains('Соус фирменный Space Sauce').trigger('dragstart');
    cy.get('[data-cy=constructor]').trigger('drop', { force: true });
    cy.get('[data-cy=dropped-el]').contains('Соус фирменный Space Sauce');

    cy.get('[data-cy=ingredients]')
      .contains('Биокотлета из марсианской Магнолии')
      .trigger('dragstart');
    cy.get('[data-cy=constructor]').trigger('drop', { force: true });
    cy.get('[data-cy=dropped-el]').contains('Биокотлета из марсианской Магнолии');

    cy.get('[data-cy=order-button]').click();
    cy.get('[data-cy=order-button]').click();
    cy.wait('@postOrder')
    cy.get('[data-cy=order-modal]').contains('28841');

  });
});
