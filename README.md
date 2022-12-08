# svg-captcha training server

This project can be used to generate a machine learning dataset for svg-captcha.

By navigating to http://localhost:3000/, you will receive a JSON blob containing:

- `img`: base64 encoded SVG image
- `answer`: the correct captcha answer

Navigating to http://localhost:3000/?view=1, you will receive an HTML page containing:

- the correct captcha solution
- svg image of the captcha
- PNG image of the captcha (converted from the SVG using `sharp`)

Finally, http://localhost:3000/login provides a demonstration login page that can be used to test the CAPTCHA defeat solution.

- If the username is `admin`, password is `crabmin` and the captcha solution is correct you will receive a `200 OK`.
- Otherwise, you will receive a `403 Forbidden`.
