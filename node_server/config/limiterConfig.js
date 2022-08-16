const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 1000,
    max: 3,
    standardHeaders: true,
    legacyHeaders: false,
    message: '####$$$$$#### Firebase useage warning'
});

module.exports = limiter;