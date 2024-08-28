const addBlog = async ( page, title, author, url ) => {

    await page.getByRole('button', { name: /new blog/i} ).click()

    const titleTB = page.getByTestId('title')
    const authorTB = page.getByTestId('author')
    const urlTB = page.getByTestId('url')

    await titleTB.fill(title)
    await authorTB.fill(author)
    await urlTB.fill(url)
    
    await page.getByRole('button', { name: /create new blog/i }).click()
}

export default addBlog