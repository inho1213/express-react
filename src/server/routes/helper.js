export function ok(res, data) {
    res.json({
        status: 200,
        message: null,
        data
    });
}

export function unauthorized(res) {
    res.status(401).json({
        status: 401,
        message: 'Unauthorized',
        data: null
    });
}
    
export function internalServerError(res, err) {
    res.status(500).json({
        status: 500,
        message: err.message,
        data: null
    });
}