import express from 'express';

import { ok, unauthorized, internalServerError } from './helper';

const router = express.Router();

router.post('/login', (req, res, next) => {
    let account = {
        userId: "test",
        userName: "Test"
    };

    /*
    internalServerError(res, {
        message: ""
    });

    unauthorized(res);
    */
    
    res.cookie('account',
        account,
        {signed: true, maxAge: 1000 * 60 * 60 * 24}
    );
    
    ok(res, account);
});

router.get('/logout', (req, res) => {
    res.clearCookie('account');
    ok(res);
});

export default router;