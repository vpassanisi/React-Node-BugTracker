const passport = require("koa-passport");

exports.customPassport = (ctx, next) =>
  passport.authenticate("jwt", (err, user, info, status) => {
    if (user === false) {
      ctx.body = { success: false };
      ctx.throw(401, "You must be logged in to get this data");
    } else {
      ctx.login(user, { session: false });
      return next();
    }
  })(ctx, next);
