export function serializeForm(form) {
    const params = {};
    
    for (const [key, value] of new FormData(form).entries()) {
        const prev = params[key];

        if (prev) {
            if (Array.isArray(prev)) {
                prev.push(value);
            } else {
                params[key] = [prev, value];
            }
        } else {
            params[key] = value;
        }
    }
    
    return params;
}