const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
function initialize(passport, getUserByUsername, getUserById) {
    //middleware for passport.use() method.
    //this is the function that is called to check to see if the credentials are correct.
    const authenticateUser = async (username, password, done) => {
        const user = getUserByUsername(username);
        if (user == null) {
            //user not found
            return done(null, false, { message: "No user with that username" });
        }
        try {
            console.log("user: ", user);
            //compare password
            if (await bcrypt.compare(password, user.password)) {
                //correct password
                return done(null, user);
            } else {
                //incorrect password
                return done(null, false, { message: "Password incorrect" });
            }
        } catch (e) {
            //internal application error
            return done(e);
        }
    };
    // by default, the local strategy uses username as the username field
    // it also defaults the password field as password, which is fine for this case
    // the second argument is a middleware that we use to authenticate the user. We name this authenticateUser.
    // this is the middleware that we use in the post route of login and register, or any other route that we want to authenticate the user in.
    passport.use(new LocalStrategy({ usernameField: "username" }, authenticateUser));
    //setup passport for serializing the user.
    //serialization is the process of taking the data object of a user and transforming it into an id.
    //this is going to serialize the user to store it in an express session.
    passport.serializeUser((user, done) => done(null, user.id));
    //passport needs a way for deserializing the user
    //this is going to turn the serialized form of the user, which is an id, back into the data structure form of the user.
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    });
}
//when we require(passport-config.js) in app.js, we want to be able to use the initialize function.
//this next line enables us to do that.
module.exports = initialize;