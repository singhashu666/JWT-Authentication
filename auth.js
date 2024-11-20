const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('./models/User');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret' 
};

passport.use(
  new JwtStrategy(options, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.id);
      if (user) return done(null, user);
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);



module.exports = passport;
