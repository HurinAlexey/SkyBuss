const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');


module.exports.login = async (req, res) => {
    const candidateLogin = await User.findOne({login: req.body.login});
    const candidateEmail = await User.findOne({email: req.body.email});
    const candidate = candidateLogin || candidateEmail;

    if(candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if(passwordResult) {
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 3600});

            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            res.status(401).json({
                message: 'Пароли не свопадают. Попробуйте снова.'
            });
        }
    } else {
        res.status(404).json({
           message: 'Пользователь не найден.'
        });
    }
};

module.exports.register = async (req, res) => {
    const candidateLogin = await User.findOne({login: req.body.login});
    const candidateEmail = await User.findOne({email: req.body.email});

    if(candidateLogin) {
        res.status(409).json({
            message: 'Такой логин уже сущевствует. Попробуйте другой.'
        });
    } else if(candidateEmail) {
        res.status(409).json({
            message: 'Такой email уже сущевствует. Попробуйте другой.'
        });
    } else {
        const salt = bcrypt.genSaltSync(16);
        const password = req.body.password;
        const user = new User({
            login: req.body.login,
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });

        try {
            await user.save();
            res.status(201).json(user);
        } catch(e) {
            errorHandler(res, e);
        }

    }
};