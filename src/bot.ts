import GalaxaClient from "./Client";

new GalaxaClient().start({ token: "NTk0MzM3NTkxOTU3MTI3MTcz.XRa-BA.aOiMq_bLdQYxO0WFp2Url1oVChc", mongoURI: process.env.MONGODB_URI, prefix: process.env.PREFIX })