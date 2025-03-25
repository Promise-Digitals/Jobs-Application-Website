// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node";

Sentry.init({
    dsn: "https://305102203384c2d34fd19f071122f4d5@o4509014309076992.ingest.us.sentry.io/4509014312812544",
    integrations: [
        Sentry.mongooseIntegration()
    ]
});
