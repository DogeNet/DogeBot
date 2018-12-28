export const config = {
    prefix: '!',
    token: 'NDEwMTk0OTY0OTE2NDY5NzYw.DsQjuw.NKSyZ2t4t4PCOgN_DVpVz_zqCSI',
    baseUrl: 'https://dogebot-dev.azurewebsites.net/api',
    users: {
      get: '/users',
      post: '/users',
      patchUpdate: '/users/{0}/Update',
      patchAdd: '/users/{0}/Add'
    }
}