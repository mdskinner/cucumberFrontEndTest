Using the Starwars themed API endpoints documented below, create an application that lists all the characters. This display should include:

-   The characters name (String: name)
-   The planet the character lives on (String: homeworld – link to Planet API)
-   The species of the character (String Array: species – links to Species API)
-   The characters avatar image (String: image – url to the image)
-   The character’s fees per day, for living on their planet (String: orbital_period – Planets API – accessed via homeworld property above)

The application should allow the user to select and deselect multiple characters. Upon selecting characters, a total of the character’s fees per day should be displayed. This total is updated automatically as characters are selected and deselected.

# getting started

```bash
npm install
npm run dev
```

```bash
npm run export
npm run serve
```
