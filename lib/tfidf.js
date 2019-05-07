import * as fs from 'fs'
import isArray from 'lodash/isArray'
import Tokenizer from './tokenizer'
import { words as stopwords } from './ulti/stopword'

const tokenizer = new Tokenizer()

function buildDocument(text, key) {
    let stopOut
    if (typeof text === 'string') {
        text = tokenizer.tokenizer(text.toLowerCase())
        stopOut = true
    } else if (!isArray(text)) {
        stopOut = false
        return text
    }

    return text.reduce(
        (document, term) => {
            if (typeof document[term] === 'function') document[term] = 0
            if (!stopOut || stopwords.indexOf(term) < 0) { document[term] = document[term] ? document[term] + 1 : 1 }
            return document
        },
        { __key: key }
    )
}

export default class Tfidf {
    constructor() {
        this.documents = []
    }


    addDocumentFile(path, encoding, key) {
        if (!encoding) {
            encoding = 'utf8'
        }

        const document = fs.readFileSync(path, encoding)

        this.documents.push(buildDocument(document, key))
    }
}
