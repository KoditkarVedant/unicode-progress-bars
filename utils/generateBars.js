const BAR_TYPE = {
    Circle: {
        id: "circle",
        barStyle: ["⚪", "⚫"],
    },
};

function repeat(str, count) {
    return str.repeat(count);
}

const generateBar = (percentage, barStyle, minSize, maxSize) => {
    const fullSymbol = barStyle[barStyle.length - 1];

    if (percentage == 100) {
        return { str: repeat(fullSymbol, maxSize), delta: 0 };
    }

    if (Math.ceil(percentage) === 0) {
        return { str: repeat(barStyle[0], maxSize), delta: 0 };
    }

    let minDelta = Number.POSITIVE_INFINITY;
    const n = barStyle.length - 1;
    let barString;

    for (let i = maxSize; i >= minSize; i--) {
        const percentPerBlock = 100 / i;
        const blocksWithValues = percentage / percentPerBlock;

        const fullBlocks = Math.floor(blocksWithValues);

        let middle = Math.floor((blocksWithValues % 1) * n);

        if (fullBlocks == 0 && middle == 0) {
            middle = 1;
        }

        const remainingBlocks = i - fullBlocks - 1;

        const delta =
            Math.abs(percentage / 100 - (fullBlocks + middle / 1) / i) * 100;

        if (delta < minDelta) {
            minDelta = delta;

            let middleSymbol = barStyle[middle];
            if (fullBlocks == i) {
                middleSymbol = "";
            }

            barString =
                repeat(fullSymbol, fullBlocks) +
                middleSymbol +
                repeat(barStyle[0], remainingBlocks);
        }
    }

    return { str: barString, delta: minDelta };
};

export function generateBars(percentage, blocks) {
    const bars = [];
    for (const key of Object.keys(BAR_TYPE)) {
        const barInfo = BAR_TYPE[key];
        const barString = generateBar(
            percentage,
            barInfo.barStyle,
            1,
            blocks
        ).str;

        bars.push(barString);
    }
    return bars;
}
