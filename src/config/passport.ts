import passport from "passport";
import { Strategy, VerifiedCallback } from "passport-jwt"; 
import { Request } from "express"; 
import USER from "../db/entity/user.entity";
import { AppDataSource } from "../db/dataService";

function cookieExtractor(req: Request) {
    return req.cookies["jwt"];
}

const jwtKey = process.env.JWT_KEY || "";

const opts = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: jwtKey,
    issuer: "",
    audience: "",
};

passport.use(
    new Strategy(opts, async function (payload: any, done: VerifiedCallback) {
        try {
            if (payload.type === "CIU") {
                return done(null, {
                    id: payload.sub,
                    sn: payload.sn,
                    curp: payload.sub,
                    type: "CIU",
                });
            } else {
                const user = await AppDataSource
                    .getRepository(USER)
                    .findOne(
                        {
                            where: {id: payload.sub},
                        }
                    );
                if (!user) return done(null, false);
                return done(null, {
                    idUser:"sd"
                });
            }
        } catch (err) {
            return done(err, false);
        }
    })
);

export default passport;
