import GalaxaClient from "./Client";

new GalaxaClient().start({ token: process.env.TOKEN, mongoURI: process.env.MONGODB_URI, prefix: process.env.PREFIX })