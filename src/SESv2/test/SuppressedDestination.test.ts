import SuppressedDestination from '../SuppressedDestination';


test('Adicionar e-mail na lista de suspensão do SES AWS', async function () {
  const email = 'test@test.com.br';
  const suppressedDestination = new SuppressedDestination();
  const emailSuppressed = await suppressedDestination.addEmailSuppressed({ EmailAddress: email, Reason: 'BOUNCE' });
  expect(emailSuppressed).toMatchObject({});
});

test('Consultar que e-mail está na lista de suspensão do SES AWS', async function () {
  const email = 'test@test.com.br';
  const suppressedDestination = new SuppressedDestination();
  const emailSuppressed = await suppressedDestination.getEmailSuppressed(email);
  expect(emailSuppressed.SuppressedDestination.EmailAddress).toBe(email);
});

test('Deletar e-mail existente na lista de suspensão do SES AWS', async function () {
  const email = 'test@test.com.br';
  const suppressedDestination = new SuppressedDestination();
  const emailSuppressed = await suppressedDestination.deleteEmailSuppressed(email);
  expect(emailSuppressed).toMatchObject({});
});

test('Listar e-mails que estão na lista de suspensão do SES AWS', async function () {
  const params = {
    StartDate: new Date('2018-01-01'),
    EndDate: new Date(),
    PageSize: 1000,
    Reasons: ['BOUNCE', 'COMPLAINT'],
  }
  const suppressedDestination = new SuppressedDestination();
  const listEmailSuppressed = await suppressedDestination.listEmailSuppressed(params);
  expect(listEmailSuppressed.SuppressedDestinationSummaries.length).toBeGreaterThan(0);
});

test('Consultar que não e-mail está na lista de suspensão do SES AWS', async function () {
  const email = 'test@test.com.br';
  const suppressedDestination = new SuppressedDestination();
  await expect(suppressedDestination.getEmailSuppressed(email)).rejects.toThrow(`Email address ${email} does not exist on your suppression list.`);
});

test('Deletar e-mail inexistente na lista de suspensão do SES AWS', async function () {
  const email = 'test@test.com.br';
  const suppressedDestination = new SuppressedDestination();
  await expect(suppressedDestination.deleteEmailSuppressed(email)).rejects.toThrow(`Email address ${email} does not exist on your suppression list.`);
});