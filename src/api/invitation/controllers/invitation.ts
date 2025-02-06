/**
 * invitation controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::invitation.invitation', ({ strapi }) => ({
  /**
   * GET /my-events
   *
   * Returns all events where the current user has an invitation.
   * For each event, includes:
   *  - event details (e.g. title, locale, etc.)
   *  - total number of accepted invitations for that event
   *  - the current user's invitation status
   *
   * Optionally filters by locale (if provided as a query parameter).
   */
  async myEvents(ctx) {
    const currentUserId = ctx.state.userId;
    if (!currentUserId) {
      return ctx.unauthorized('You must be logged in to view your events.');
    }

    // Retrieve locale from the query string (if provided)
    const { locale } = ctx.query;
    // Ensure locale is a string if provided
    const localeParam: string | undefined = typeof locale === 'string' ? locale : undefined;

    try {
      const invitations: any = await strapi
        .documents('api::invitation.invitation')
        .findMany({
          // Only filter invitations by the current user (invitations themselves are not localized)
          where: { lineUser: { userId: currentUserId } },
          populate: {
            event: {
              populate: { invitations: true },
            },
          },
        });

      const eventsData = await Promise.all(invitations
        .map(async (invitation: any) => {
          // Get the event data (which is localized) from the invitation
          const eventData = invitation.event;
          // Fetch the event translation in the requested locale using its documentId.
          const translatedEventData = await strapi.documents('api::event.event').findOne({
            documentId: invitation.event.documentId,
            locale: localeParam,
            populate: {
              styleAdvisor: true,
              backgroundImage: true,
            },
          });
          if (!translatedEventData) return null;

          // Compute the number of accepted invitations for this event.
          const acceptedCount = eventData.invitations
            ? eventData.invitations.filter(
                (invite: any) => invite.invitationStatus === 'ACCEPTED'
              ).length
            : 0;

          return {
            invitationId: invitation.documentId,
            // Spread the translated event data (e.g. title, locale, etc.)
            ...translatedEventData,
            acceptedCount,
            currentUserStatus: invitation.invitationStatus,
          };
        })
        .filter((item: any) => item !== null));

      ctx.body = eventsData;
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  /**
   * GET /invitations/:id
   *
   * Returns the detailed information for a single invitation.
   * The detail includes:
   *  - event information (populated with invitations)
   *  - total accepted invitations count for the event
   *  - the current user's invitation status
   *
   * Optionally, you can filter the event by locale via a query parameter.
   */
  async invitationDetail(ctx) {
    const { id } = ctx.params;
    const currentUserId = ctx.state.userId;
    if (!currentUserId) {
      return ctx.unauthorized('You must be logged in to view invitation detail.');
    }

    // Retrieve locale from the query string (if provided)
    const { locale } = ctx.query;
    const localeParam: string | undefined = typeof locale === 'string' ? locale : undefined;

    try {
      const invitation: any = await strapi
        .documents('api::invitation.invitation')
        .findOne({
          documentId: id,
          populate: {
            event: {
              populate: { invitations: true },
            },
            lineUser: true,
          },
        });

      if (!invitation) {
        return ctx.notFound('Invitation not found.');
      }

      if (invitation.lineUser?.userId !== currentUserId) {
        return ctx.forbidden('You are not allowed to view this invitation.');
      }

      const eventData = invitation.event;
      const translatedEventData = await strapi.documents('api::event.event').findOne({
        documentId: eventData.documentId,
        locale: localeParam,
        populate: {
          styleAdvisor: true,
          backgroundImage: true,
        },
      });
      if (!translatedEventData) {
        return ctx.notFound('Localized event not found.');
      }
      const acceptedCount =
      eventData && eventData.invitations
          ? eventData.invitations.filter(
              (invite: any) => invite.invitationStatus === 'ACCEPTED'
            ).length
          : 0;
      const constantDataArray = await strapi.documents('api::constant.constant').findMany({
        locale: localeParam,
        filters: { 
          brand: { brandId: 'tiffany' },
        },
        fields: [
          'acceptButtonText',
          'rejectButtonText',
          'acceptMessage',
          'rejectMessage',
          'goBackButtonText',
        ],
      });
      const { acceptButtonText, rejectButtonText, acceptMessage, rejectMessage, goBackButtonText } = constantDataArray[0];
      const invitationStatusMessages = {
        ACCEPTED: acceptMessage,
        REJECTED: rejectMessage
      }
      const detail = {
        invitationId: invitation.documentId,
        ...translatedEventData,
        acceptedCount,
        currentUserStatus: invitation.invitationStatus,
        invitationStatusMessage: invitationStatusMessages[invitation.invitationStatus],
        goBackButtonText,
        buttons: [
          {
            buttonText: rejectButtonText,
            type: 'button-secondary',
          },
          {
            buttonText: acceptButtonText,
            type: 'button-primary',
          },
        ],
      };

      ctx.body = detail;
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  /**
   * POST /invitations/:id/status
   *
   * Updates the specified invitation's status.
   * Expects a JSON body with a "status" property (either "ACCEPTED" or "REJECTED").
   */
  async updateInvitationStatus(ctx) {
    const { id } = ctx.params;
    // Expect the new status in the request body.
    const { status } = ctx.request.body;
    const allowedStatuses = ['ACCEPTED', 'REJECTED'];
    if (!allowedStatuses.includes(status)) {
      return ctx.badRequest('Invalid status provided. Allowed values are "ACCEPTED" and "REJECTED".');
    }

    const currentUserId = ctx.state.userId;
    if (!currentUserId) {
      return ctx.unauthorized('You must be logged in to update your invitation.');
    }
    try {
      const invitation: any = await strapi
        .documents('api::invitation.invitation')
        .findOne({
          documentId: id,
          populate: { lineUser: true },
        });

      if (!invitation) {
        return ctx.notFound('Invitation not found.');
      }
      if (invitation.lineUser?.userId !== currentUserId) {
        return ctx.forbidden('You are not allowed to update this invitation.');
      }

      const updatedInvitation = await strapi
        .documents('api::invitation.invitation')
        .update({
          documentId: id,
          data: { invitationStatus: status },
          status: 'published',
        });

      ctx.body = updatedInvitation;
    } catch (error) {
      ctx.throw(500, error);
    }
  },
}));
