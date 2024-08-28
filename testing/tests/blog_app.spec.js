const { describe, test, expect, beforeEach } = require('@playwright/test')
import addBlog from './helper.js'

describe('Blog app', () => {

    beforeEach( async ({ page, request }) => {

        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
              name: 'Radu Tudor',
              username: 'RaduTudor1',
              password: 'parola'
            }
        })

        await page.goto('/')
    })

    test('front page can be opened', async ({ page }) => {
    
        const locator = await page.getByText('Blogs')
    
        await expect(locator).toBeVisible()
    
        await expect(page.getByText('Blogs App')).toBeVisible()
    })

    describe('when logged in', () => {

        beforeEach( async ({ page }) => {

            await page.getByRole('button', { name: 'log in'} ).click()

            const usernameTB = await page.getByTestId('username')
            const passwordTB = await page.getByTestId('password')

            await usernameTB.fill('RaduTudor1')
            await passwordTB.fill('parola')
            
            await page.getByRole('button', { name: 'Login'} ).click()
        })
    
        test('blog can be created', async ({ page }) => {

            addBlog(page, 'Blog#11', 'RaduTudor', 'https://google.com')
        })

        test('blogs are sorted', async ({ page }) => {

            await addBlog(page, 'Blog#11', 'RaduTudor', 'https://google.com')
            await addBlog(page, 'Blog#12', 'RaduTudor', 'https://google.com')
            await addBlog(page, 'Blog#13', 'RaduTudor', 'https://google.com')
            await addBlog(page, 'Blog#14', 'RaduTudor', 'https://google.com')

            await page.reload()

            const blogs = await page.getByTestId(/^blog$/).all()

            await expect(blogs.length).toBe(4)
        })
    })
})