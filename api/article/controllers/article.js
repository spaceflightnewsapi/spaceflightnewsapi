"use strict";
const NodeCache = require("node-cache");
const ObjectID = require("mongodb").ObjectID

const cache = new NodeCache({
  stdTTL: 1800,
});

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async findOne(ctx) {
    const { id } = ctx.params;

    if (id === "launch" || !ObjectID.isValid(id)) {
      ctx.throw(400);
    }

    let entity = await strapi.services.article.findOne({ id });

    // Create the launch and event objects
    // Using Promise.all since it's an async map (async to wait for the result)
    const launches = await Promise.all(
      entity.launches.map(async (launch) => {
        const lp = await strapi.services.provider.findOne({
          _id: launch.provider,
        });
        return { id: launch.launchId, provider: lp.name };
      })
    );

    const events = await Promise.all(
      entity.events.map(async (event) => {
        const ep = await strapi.services.provider.findOne({
          _id: event.provider,
        });
        return { id: event.eventId, provider: ep.name };
      })
    );

    // Finally, return the response
    return (entity = {
      title: entity.title,
      url: entity.url,
      imageUrl: entity.imageUrl,
      newsSite: entity.newsSite.name,
      summary: entity.summary,
      publishedAt: entity.publishedAt,
      updatedAt: entity.updatedAt,
      featured: entity.featured,
      launches: launches,
      events: events,
    });
  },

  /**
   * Retrieve records.
   *
   * @return {Array}
   */

  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      // search for an article if a search query was given
      entities = await strapi.services.article.search(ctx.query);
    } else {
      // just find everything
      entities = await strapi.services.article.find({
        ...ctx.query,
        _limit: ctx.query._limit || 10,
        _sort: ctx.query._sort || "publishedAt:DESC",
      });
    }

    // Build the response we want to return
    // Use Promise.all to since it's an async map (async for the inner Promise)
    entities = await Promise.all(
      entities.map(async (entity) => {
        // Create the launch and event objects
        // Using Promise.all since it's an async map (async to wait for the result)
        const launches = await Promise.all(
          entity.launches.map(async (launch) => {
            const lp = await strapi.services.provider.findOne({
              _id: launch.provider,
            });
            return { id: launch.launchId, provider: lp.name };
          })
        );

        const events = await Promise.all(
          entity.events.map(async (event) => {
            const ep = await strapi.services.provider.findOne({
              _id: event.provider,
            });
            return { id: event.eventId, provider: ep.name };
          })
        );

        return {
          id: entity._id,
          title: entity.title,
          url: entity.url,
          imageUrl: entity.imageUrl,
          newsSite: entity.newsSite.name,
          summary: entity.summary,
          publishedAt: entity.publishedAt,
          updatedAt: entity.updatedAt,
          featured: entity.featured,
          launches: launches,
          events: events,
        };
      })
    );

    // Finally, return the response
    return entities;
  },

  findPerLaunch: async (ctx) => {
    const launchId = ctx.params.id;
    let entities;

    const cachedLaunch = cache.get(launchId);

    // Check if we have the launch in-memory and return it
    if (cachedLaunch !== undefined) {
      if (cachedLaunch.length === 0) {
        return ctx.notFound();
      }
      return cachedLaunch;
    }

    // This call is _extremely_ slow
    entities = await strapi.services.article.find({
      "launches.launchId": launchId,
    });

    // The above query will always return. Handle empty array as 404
    if (entities.length === 0) {
      cache.set(launchId, entities, 3600);
      return ctx.notFound();
    }

    // Build the response we want to return
    // Use Promise.all to since it's an async map (async for the inner Promise)
    entities = await Promise.all(
      entities.map(async (entity) => {
        // Create the launch and event objects
        // Using Promise.all since it's an async map (async to wait for the result)
        const launches = await Promise.all(
          entity.launches.map(async (launch) => {
            const lp = await strapi.services.provider.findOne({
              _id: launch.provider,
            });
            return { id: launch.launchId, provider: lp.name };
          })
        );

        const events = await Promise.all(
          entity.events.map(async (event) => {
            const ep = await strapi.services.provider.findOne({
              _id: event.provider,
            });
            return { id: event.eventId, provider: ep.name };
          })
        );

        return {
          id: entity._id,
          title: entity.title,
          url: entity.url,
          imageUrl: entity.imageUrl,
          newsSite: entity.newsSite.name,
          summary: entity.summary,
          publishedAt: entity.publishedAt,
          updatedAt: entity.updatedAt,
          featured: entity.featured,
          launches: launches,
          events: events,
        };
      })
    );

    // Set it in cache
    cache.set(launchId, entities, 3600);

    // Finally, return the response
    return entities;
  },

  findPerEvent: async (ctx) => {
    const eventId = ctx.params.id;
    let entities;

    const cachedEvent = cache.get(eventId);

    // Check if we have the launch in-memory and return it
    if (cachedEvent !== undefined) {
      if (cachedEvent.length === 0) {
        return ctx.notFound();
      }
      return cachedEvent;
    }

    // This call is _extremely_ slow
    entities = await strapi.services.article.find({
      "events.eventId": eventId,
    });

    // The above query will always return. Handle empty array as 404
    if (entities.length === 0) {
      cache.set(eventId, entities, 3600);
      return ctx.notFound();
    }

    // Build the response we want to return
    // Use Promise.all to since it's an async map (async for the inner Promise)
    entities = await Promise.all(
      entities.map(async (entity) => {
        // Create the launch and event objects
        // Using Promise.all since it's an async map (async to wait for the result)
        const launches = await Promise.all(
          entity.launches.map(async (launch) => {
            const lp = await strapi.services.provider.findOne({
              _id: launch.provider,
            });
            return { id: launch.launchId, provider: lp.name };
          })
        );

        const events = await Promise.all(
          entity.events.map(async (event) => {
            const ep = await strapi.services.provider.findOne({
              _id: event.provider,
            });
            return { id: event.eventId, provider: ep.name };
          })
        );

        return {
          id: entity._id,
          title: entity.title,
          url: entity.url,
          imageUrl: entity.imageUrl,
          newsSite: entity.newsSite.name,
          summary: entity.summary,
          publishedAt: entity.publishedAt,
          updatedAt: entity.updatedAt,
          featured: entity.featured,
          launches: launches,
          events: events,
        };
      })
    );

    // Set it in cache
    cache.set(eventId, entities, 3600);

    // Finally, return the response
    return entities;
  },
};
