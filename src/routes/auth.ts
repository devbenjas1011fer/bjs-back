import { Router } from "express";
import { AppDataSource } from "../db/dataService";
import USER from "../db/entity/user.entity";
import { comparePasswords, hashPassword } from "../utils/password";
import { generateJwt } from "../utils/jwt";
import PERFIL from "../db/entity/perfil.entity";
import RECIDENTE from "../db/entity/recidente.entity";
// import RECIDENTE from '../db/entity/recidente.entity';

const router = Router();
router.get("/", function (_req, res, _next) {
  res.send("login");
});
router.post("/register", async function (req, res, _next) {
  let pass = await hashPassword(req.body.pass);
  try {
    const userExist = AppDataSource.getRepository(USER).create({
      nombres: req.body.nombre,
      apellidos: req.body.apellidos,
      sexo: req.body.sexo,
      // idRol:req.body.idRol,
      numero: req.body.numero,
      correo: req.body.correo,
      password: pass,
    });
    //Crear rol
    const profile = await AppDataSource.getRepository(PERFIL).create({
      id_rol: req.body.idRol,
      id_usuario: userExist.id,
      nombre: req.body.nombre,
      apodo: req.body.apodo,
      rfc: req.body.rfc,
      numero: req.body.numero,
      foto: req.body.foto,
      correo: req.body.correo,
    });
    const user = await AppDataSource.getRepository(USER).save(userExist);
    const perfil = await AppDataSource.getRepository(USER).save(profile);
    const token = generateJwt(userExist.id!, req.body.type);
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 1000,
    });
    return res.json({
      token: token,
      nombre: user.nombres + " " + user.apellidos,
      rol: perfil.id_rol,
    });
  } catch (err) {
    console.log(err);
    _next(err);
  }
  // res.cookie()
});
router.post("/login", async function (req, res, next) {
  try {
    let usuario;
    let recidente;
    let perfil;
    usuario = await AppDataSource.getRepository(USER).findOne({
      where: {
        correo: req.body.user,
      },
    });
    perfil = await AppDataSource.getRepository(PERFIL).findOne({
      where: {
        usuario: {
          correo: req.body.user,
        },
      },
      relations: {
        usuario: true,
        rol: true,
      },
    });
    let token;
    if (req.body.query === "RECIDENTE") {
      recidente = await AppDataSource.getRepository(RECIDENTE).findOne({
        where: {
          id_usuario: usuario!.id,
        },
        relations: {
          usuario: true,
        },
      });
      token = generateJwt(recidente!.usuario?.id!, "RECIDENTE");
      let pass = await comparePasswords(
        req.body.pass,
        recidente!.usuario?.password!
      );
      if (!pass) {
        return res.status(404).send("Datos incorrectos");
      }
      res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 1000,
      });

      return res.json({
        recidente: recidente,
        token: token,
        nombre:
          recidente!.usuario?.nombres + " " + recidente!.usuario?.apellidos,
        rol: "RECIDENTE",
      });
    } else {
      token = generateJwt(perfil!.usuario?.id!, perfil?.rol?.descripcion!);
      let pass = await comparePasswords(
        req.body.pass,
        perfil!.usuario?.password!
      );
      if (!pass) {
        return res.status(404).send("Datos incorrectos");
      }
      res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 1000,
      });

      return res.json({
        perfil: perfil,
        token: token,
        nombre: perfil!.usuario?.nombres + " " + perfil!.usuario?.apellidos,
        rol: perfil?.rol?.descripcion,
        rolId: perfil?.rol?.id,
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/login-recident", async function (req, res, next) {
  try {
    let  usuario;
    let recidente;
    usuario = await AppDataSource.getRepository(USER).findOne({
      where: {
        correo: req.body.user,
      },
    });
     
    let token;
    if (req.query.type === "RECIDENTE") {
      recidente = await AppDataSource.getRepository(RECIDENTE).findOne({
        where: {
          id_usuario: usuario!.id,
          rol:true
        },
        relations: {
          usuario: true,
        },
      });
      token = generateJwt(recidente!.usuario?.id!, "RECIDENTE");
      let pass = await comparePasswords(
        req.body.pass,
        recidente!.usuario?.password!
      );
      if (!pass) {
        return res.status(404).send("Datos incorrectos");
      }
      res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 1000,
      });

      return res.json({
        recidente: recidente,
        token: token,
        nombre:
          recidente!.usuario?.nombres + " " + recidente!.usuario?.apellidos,
        rol: "RECIDENTE",
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});
router.post("/register-recidential", async function (req, res, _next) {
  let pass = await hashPassword(req.body.pass);
  try {
    const us = AppDataSource.getRepository(USER).create({
      nombres: req.body.nombre,
      apellidos: req.body.apellidos,
      sexo: req.body.sexo,
      // idRol:req.body.idRol,
      numero: req.body.numero,
      correo: req.body.correo,
      password: pass,
    });
    await AppDataSource.getRepository(USER).save(us);
    //Crear rol
    const recident = await AppDataSource.getRepository(RECIDENTE).create({
      id_usuario: us.id,
      alta: new Date(),
    });
    await AppDataSource.getRepository(RECIDENTE).save(recident);
    const token = generateJwt(us.id!, req.body.type);
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 1000,
    });
    return res.json({
      token: token,
      nombre: us.nombres + " " + us.apellidos,
      rol: "RECIDENTE",
    });
  } catch (err) {
    console.log(err);
    _next(err);
  }
  // res.cookie()
});

router.post("/register-recident", async function (req, res, _next) {
  let pass = await hashPassword(req.body.pass);
  try {
    const data = AppDataSource.getRepository(USER).create({
      nombres: req.body.nombre,
      apellidos: req.body.apellidos,
      sexo: req.body.sexo,
      // idRol:req.body.idRol,
      numero: req.body.numero,
      correo: req.body.correo,
      password: pass,
    });
    //Crear rol
    const profile = await AppDataSource.getRepository(PERFIL).create({
      id_rol: req.body.idRol,
      id_usuario: data.id,
      nombre: req.body.nombre,
      apodo: req.body.apodo,
      rfc: req.body.rfc,
      numero: req.body.numero,
      foto: req.body.foto,
      correo: req.body.correo,
    });
    const user = await AppDataSource.getRepository(USER).save(data);
    const perfil = await AppDataSource.getRepository(USER).save(profile);
    const token = generateJwt(data.id!, req.body.type);
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 1000,
    });
    return res.json({
      token: token,
      nombre: user.nombres + " " + user.apellidos,
      rol: perfil.id_rol,
    });
  } catch (err) {
    console.log(err);
    _next(err);
  }
  // res.cookie()
});
export default router;
