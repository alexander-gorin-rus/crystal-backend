const admin = require('../firebase');
const User = require('../models/User');

exports.authCheck = async (req, res, next) => {
    try {
        const firebaseUser = await admin
            .auth()
            .verifyIdToken(req.headers.authtoken);
        //console.log("firebase user in authcheck", firebaseUser);
        req.user = firebaseUser;
        next();
    } catch (err) {
        res.status(401).json({
            err: "Такая цифровая идентификационная запись не сушествует, либо срок её действия истек"
        });
    }
};

exports.adminCheck = async (req, res, next) => {
    const { email } = req.user;

    const adminUser = await User.findOne({ email }).exec();

    if (adminUser.role !== 'admin') {
        res.status(403).json({
            err: 'Ресурс администротора, вход запрещен'
        });
    } else {
        next();
    }
}

exports.managerCheck = async (req, res, next) => {
    const { email } = req.user;

    const managerUser = await User.findOne({ email }).exec();

    if (managerUser.role !== 'manager') {
        res.status(403).json({
            err: 'Ресурс менеджера, вход запрещен'
        });
    } else {
        next();
    }
}