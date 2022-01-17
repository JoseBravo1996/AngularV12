export const environment = {
  production: false,
  rootApi: 'https://localhost:5001',
  identity: {
    url: 'https://identity_dev.grupoasociart.net',
    applicationId: '' //TODO: reemplazar applicationId por el de la nueva app agregada la db del idm, según ambiente (tabla Applications)
  },
  graph: {
    clientId: '', //TODO: crear nueva app en el portal de Azure (https://portal.azure.com)
    scopes: ['user.read', 'openid', 'profile'],
    redirectUri: 'https://localhost:4200' //TODO: url de la web app
  }
};
