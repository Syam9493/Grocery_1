// utilities/logRoutes.js
export default function logRoutes(app) {
   console.log("===== DEBUG: logRoutes START =====");
    if (!app || !app._router || !app._router.stack) {
        console.log("⚠ No Express app._router found or no routes registered yet.");
        console.log("===== DEBUG: logRoutes END =====");
        return;
    }

  const routes = [];

  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // Direct routes on app
      const methods = Object.keys(middleware.route.methods)
        .map((m) => m.toUpperCase())
        .join(', ');
      routes.push(`${methods} ${middleware.route.path}`);
    } else if (middleware.name === 'router' && middleware.handle.stack) {
      // Routes inside routers
      middleware.handle.stack.forEach((handler) => {
        const route = handler.route;
        if (route) {
          const methods = Object.keys(route.methods)
            .map((m) => m.toUpperCase())
            .join(', ');
          routes.push(`${methods} ${route.path}`);
        }
      });
    }
  });

  if (routes.length === 0) {
    console.log('⚠ No routes found yet.');
  } else {
    console.log('\n=== Registered Routes ===');
    routes.forEach((r) => console.log(r));
    console.log('=========================');
  }

  console.log('===== DEBUG: logRoutes END =====\n');
}
