export default async (includeFile) => `<!DOCTYPE html>
<html>
    <head>
        <style>
${await includeFile("src/style.css")}
        </style>
        <script>
${await includeFile("src/index.ts")}
        </script>
    </head>
    <body>
${await includeFile("src/body.html")}

${await includeFile("src/templates.html")}
    </body>
</html>
`;
