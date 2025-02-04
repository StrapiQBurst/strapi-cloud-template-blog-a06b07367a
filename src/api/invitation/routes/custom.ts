'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/my-events',
      handler: 'invitation.myEvents',
      config: {
        auth: {
          scope: ['authenticated'],
        },
      },
    },
    {
      method: 'GET',
      path: '/invitations/:id',
      handler: 'invitation.invitationDetail',
      config: {
        auth: { scope: ['authenticated'] },
      },
    },
    {
      method: 'PATCH',
      path: '/invitations/:id/status',
      handler: 'invitation.updateInvitationStatus',
      config: {
        auth: {
          scope: ['authenticated'],
        },
      },
    }
  ],
};
