import { TEMPLATES } from "../scripts/compile.mjs";

export default async (includeItem) => `<!DOCTYPE html>
<html>
    <head>
${await includeItem("src/head.html")}
        <style>
${await includeItem("src/style.css")}
        </style>
        <script>
${await includeItem("src/index.ts")}
        </script>
    </head>
    <body>
        <main>
            <diary-nav></diary-nav>
            <article>Blah blah</article>
        </main>

${await includeItem(TEMPLATES)}
    </body>
</html>
`;
