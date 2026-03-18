const fs = require('fs');
const path = require('path');
const ts = require('typescript');

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      processFile(fullPath);
    }
  }
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true
  );

  const typesToExtract = [];
  const typeNames = [];

  ts.forEachChild(sourceFile, node => {
    if (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) {
      const typeText = content.substring(node.pos, node.end).trim();
      const typeName = node.name.text;
      
      const isExported = node.modifiers && node.modifiers.some(m => m.kind === ts.SyntaxKind.ExportKeyword);
      
      typesToExtract.push({
        name: typeName,
        text: isExported ? typeText : `export ${typeText}`,
        origText: content.substring(node.getFullStart(), node.end) // keep leading comments/trivia
      });
      typeNames.push(typeName);
    }
  });

  if (typesToExtract.length > 0) {
    console.log(`Extracting from ${filePath}: ${typeNames.join(', ')}`);
    
    // Remove types from original file
    let newContent = content;
    for (const t of Object.values(typesToExtract).reverse()) {
      // safely replace by exact string
      newContent = newContent.replace(t.origText, '');
    }

    // Attempt to add import statement after existing imports
    const dir = path.dirname(filePath);
    const typesFilePath = path.join(dir, 'types.ts');
    
    // add import statement to top if not exist
    const importStatement = `import type { ${typeNames.join(', ')} } from './types'\n`;
    newContent = importStatement + newContent.replace(/^\s+/, '');

    fs.writeFileSync(filePath, newContent);

    // Append to types.ts
    const typesContent = typesToExtract.map(t => t.text).join('\n\n') + '\n\n';
    if (fs.existsSync(typesFilePath)) {
      fs.appendFileSync(typesFilePath, typesContent);
    } else {
      fs.writeFileSync(typesFilePath, typesContent);
    }
  }
}

processDirectory(path.join(__dirname, 'src/components'));
