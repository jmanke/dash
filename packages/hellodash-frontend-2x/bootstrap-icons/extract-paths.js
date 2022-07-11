const fs = require('fs')

const iconsDir = 'icons';
const pathsDir = '../src/assets/icon-paths';

// delete directory recursively
fs.rmdir(pathsDir, { recursive: true }, (err) => {
    if (err) {
        throw err;
    }

    console.log(`${pathsDir} is deleted!`);
    fs.mkdir(pathsDir, (err) => {
        if (err) {
            throw err;
        }

        console.log(`${pathsDir} is created!`);
        const svgPaths = JSON.parse(fs.readFileSync('./include-icons.json').toString()).icons.map(icon => `${icon}.svg`);
        const pathPattern = /<path(.*)\/>/gm;

        svgPaths.forEach(svgPath => {
            const contents = fs.readFileSync(`${iconsDir}/${svgPath}`).toString();
            let paths = [];
            let match;
            while ((match = pathPattern.exec(contents)) != null) {
                paths.push(match[1]);
            }

            paths = paths.map(path => {
                const dPattern = /d="(.*)"/;
                const fillRulePattern = /fill-rule="(.*)"/;

                let obj = {};

                const matchD = dPattern.exec(path);
                const matchFillRule = fillRulePattern.exec(path);

                if (matchD) {
                    obj.d = matchD[1];
                }

                if (matchFillRule) {
                    obj.fillRule = matchFillRule[1];
                }

                return obj;
            });


            const fileName = svgPath.substring(0, svgPath.length - 4);

            fs.writeFileSync(`${pathsDir}/${fileName}.json`, JSON.stringify({ paths }, null, 2));
            console.log(`${svgPath} converted into paths`);
        });
    });
});