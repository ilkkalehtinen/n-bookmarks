describe('Editing bookmarks', () => {
  before(() => {
    cy.login('admin', 'admin')
  })

  after(() => {
    cy.get('.nav-link').contains('log out').click()
  })

  it('Add and remove', () => {
    cy.get('.nav-link').contains('edit').click()

    cy.get('[data-cy="add-bookmark-url"]').type('http://www.test.com')
    cy.get('[data-cy="add-bookmark-name"]').type('Test')
    cy.get('[data-cy="add-bookmark-category"]').select("Sample")
    cy.get('[data-cy="add-bookmark-add"]').click()

    cy.get('[data-cy="http://www.test.com"]').click()
  })
})
