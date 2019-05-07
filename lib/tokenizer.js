export default class Tokenizer {
    constructor() {
        this._pattern = /[^A-Za-zА-Яа-я0-9_]+/
    }

    /** *
    * A tokenizer that divides a text into sequences of alphabetic and
    * non-alphabetic characters.  E.g.:
    *      Tokenizer.tokenizer('She said hello')
    *      ['She', 'said', 'hello']
    * */
    tokenizer(str) {
        return str.split(this._pattern)
    }
}
