import * as fs from 'fs';
import path from 'path';
import Tfidf from '../lib/tfidf';

const tfidf = new Tfidf();

export default function main(input) {
    const files = fs.readdirSync('./books/formated');

    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
        const filePath = path.join('./books/formated', file);
        tfidf.addDocumentFile(filePath);
    }

    fs.writeFileSync(
        './books/data/count-word.txt',
        JSON.stringify(tfidf.showDocuments()),
        err => {
            if (err) {
                // eslint-disable-next-line no-console
                console.error(err);
            }
        }
    );

    return tfidf.run(input);
}
