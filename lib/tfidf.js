import * as fs from 'fs';
import _ from 'lodash';
import Tokenizer from './tokenizer';
import { words as stopwords } from './ulti/stopword';

const tokenizer = new Tokenizer();

function buildDocument(text, key) {
    if (typeof text === 'string') {
        text = tokenizer.tokenizer(text.toLowerCase());
    } else if (!_.isArray(text)) {
        return text;
    }

    return text.reduce(
        (document, term) => {
            if (typeof document[term] === 'function') {
                document[term] = 0;
            }
            if (stopwords.indexOf(term) < 0) {
                document[term] = document[term] ? document[term] + 1 : 1;
            }
            return document;
        },
        { __key: key }
    );
}

function documentHasTerm(term, document) {
    return document[term] && document[term] > 0;
}

function tfByTerm(term, document) {
    return document[term] ? document[term] : 0;
}

function printResult(value) {
    let data = [];
    const files = fs.readdirSync('./books/formated');
    const filesLength = files.length;

    for (let index = 0; index < filesLength; index++) {
        const fileName = files[index];
        const tfidfValue = value[index];

        data.push({
            fileName,
            tfidfValue
        });
    }
    return _.orderBy(data, ['tfidfValue','asc']);
}

export default class Tfidf {
    constructor() {
        this.documents = [];
    }

    addDocumentFile(path, encoding, key) {
        if (!encoding) {
            encoding = 'utf8';
        }

        const document = fs.readFileSync(path, encoding);

        this.documents.push(buildDocument(document, key));
    }

    showDocuments() {
        return this.documents;
    }

    run(text) {
        const terms = tokenizer.tokenizer(
            text
                .trim()
                .toString()
                .toLowerCase()
        );
        const array = _.remove(_.uniq(terms), n => stopwords.indexOf(n) < 0);

        const tfidfs = new Array(this.documents.length);
        for (let i = 0; i < this.documents.length; i++) {
            tfidfs[i] = this.tfidf(array, i);
        }
        fs.writeFileSync('./books/data/result.txt', tfidfs, err => {
            if (err) {
                // eslint-disable-next-line no-console
                console.error(err);
            }
        });

        return printResult(tfidfs);
    }

    idf(term) {
        const docsWithTerm = this.documents.reduce(
            (count, document) =>
                count + (documentHasTerm(term, document) ? 1 : 0),
            0
        );

        const idf = 1 + Math.log(this.documents.length / (1 + docsWithTerm));
        return idf === Infinity ? 0 : idf;
    }

    tfidf(terms, i) {
        const _this = this;
        const arr = Object.values(this.documents[i]);
        const max = _.max(arr);

        return terms.reduce((value, element) => {
            const idf = _this.idf(element);
            const tf = tfByTerm(element, this.documents[i]) / max;

            return value + idf * tf;
        }, 0.0);
    }
}
