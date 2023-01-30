
export function parse(input) {
    if(typeof input !== 'string') {
        return [];
    }

    const split = input.split('\n');

    const mapped = split.map((i) => {
        return i.split(';');
    });

    return mapped;
}