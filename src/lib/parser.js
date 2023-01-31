
export function parse(input) {
    if(typeof input !== 'string') {
        return [];
    }

    // Það er greinilega '\r\n' í windows en '\n' virkar á öðrum stýrikerfum??
    const split = input.split('\r\n');

    const mapped = split.map((i) => {
        return i.split(';');
    });

    return mapped;
}