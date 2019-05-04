import * as fs from 'fs'
import path from 'path'
import changeCase from 'change-case'

/** Read an individual book txt file, and extract the title, author, and paragraphs */
function formatBookFile(filePath) {
    // Read text file
    const book = fs.readFileSync(filePath, 'utf8')

    // Find book title and author
    const title = book.match(/^Title:\s(.+)$/m)[1]
    const authorMatch = book.match(/^Author:\s(.+)$/m)
    const author = !authorMatch || authorMatch[1].trim() === ''
        ? 'Unknown Author'
        : authorMatch[1]

    // Find Guttenberg metadata header and footer
    const startOfBookMatch = book.match(
        /^\*{3}\s*START OF (THIS|THE) PROJECT GUTENBERG EBOOK.+\*{3}$/m
    )
    const startOfBookIndex = startOfBookMatch.index + startOfBookMatch[0].length
    const endOfBookIndex = book.match(
        /^\*{3}\s*END OF (THIS|THE) PROJECT GUTENBERG EBOOK.+\*{3}$/m
    ).index

    // Clean book text and split into array of paragraphs
    const body = book
        .slice(startOfBookIndex, endOfBookIndex) // Remove Guttenberg header and footer

    const reNamePath = `./books/formated/${changeCase.snakeCase(title)} - ${author}.txt`

    fs.writeFileSync(reNamePath, body, (err) => {
        if (err) {
            // eslint-disable-next-line no-console
            console.error(err)
        }
    })
}


async function readBook() {
    try {
        // Reading file from directory
        const files = fs
            .readdirSync('./books/raw')
            .filter(file => file.slice(-4) === '.txt')
        // eslint-disable-next-line no-console
        console.log(`Found ${files.length} Files`)

        // Formatting each book
        // eslint-disable-next-line no-restricted-syntax
        for (const file of files) {
            // eslint-disable-next-line no-console
            console.log(`Formating File - ${file}`)
            const filePath = path.join('./books/raw', file)

            formatBookFile(filePath)
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
    }
}

readBook()
