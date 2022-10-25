const plainTile = (color) => {
    return {
        _tag: 'Plain',
        color
    }    
};

const clockwise = (tile) => {
    return {
        _tag: 'clockwise',
        tile
    }
};

const counterClockwise = (tile) => {
    return clockwise(clockwise(clockwise(tile)));
};

const flipH = (tile) => {
    return {
        _tag: 'fliph',
        tile
    }
};

const beside = (tileLeft, tileRight) => {
    return {
        _tag: 'beside',
        tileLeft,
        tileRight
    }
};

const x = beside(plainTile('red'), plainTile('green'));

// generate an svg string from a tile
const tileToSvg = (tile) => {
    switch (tile._tag) {
        case 'Plain':
            const {color} = tile;
            return `<rect x="0" y="0" width="1" height="1" fill="${color}" />`;
        case 'fliph':
            const {tile} = tile;
            return `<g transform="scale(-1, 1) translate(-1, 0)">${tileToSvg(tile)}</g>`;
        case 'clockwise':
            const {tile: tileToRotate} = tile;
            return `<g transform="rotate(90) translate(0, -1)">${tileToSvg(tileToRotate)}</g>`;
    }
};

tileToSvg(plainTile('red'));