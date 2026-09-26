const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20').Strategy;
const config=require('../config/config')
const userModel=require('../models/users')


passport.use(new GoogleStrategy({
    clientID:config.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret:config.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL:config.PASSPORT_GOOGLE_CALLBACK_URL
},async(accessToken,refreshToken,profile,callback)=>{
    try{

        const findinguser=await userModel.findOne({googleId: profile.id})

        if (!findinguser){
            let user=await userModel.create({
                username:profile.displayName,
                email:profile.emails[0].value,
                googleId:profile.id,
                avatar:profile.photos[0].value
            })
            return callback(null,user)
        }

    }catch(error){
        console.log("error in login:",error)
        return callback(error,null)

    }

}

))


module.exports = passport;