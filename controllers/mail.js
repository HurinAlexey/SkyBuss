const nodemailer = require('nodemailer');
const errorHandler = require('../utils/errorHandler');


module.exports.send = (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'mail.adm.tools',
            port: 2525,
            secure: false,
            auth: {
                user: 'admin@skybuss.com.ua',
                pass: 'V79sb1cd2XRX'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: 'admin@skybuss.com.ua',
            to: 'tanatosvii@gmail.com',
            subject: 'Skybuss "Контактная форма"',
            text: `Имя: ${req.body.name}
        Телефон: ${req.body.phone}
        Сообщение: ${req.body.message}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                errorHandler(res, error)
            } else {
                console.log(info)
                res.status(200).json({
                    message: 'Письмо успешно отправлено!'
                });
            }
        });

    } catch (err) {
        errorHandler(res, err)
    }
};