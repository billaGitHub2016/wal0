import pug from 'pug';
import fs from 'fs';
import path from 'path';

export function renderPreviewPage(componentData: any) {
  // 读取模板文件
  const templateContent = fs.readFileSync(
    path.join(process.cwd(), 'public', 'templates', 'test.pug'),
    'utf-8'
  );
  
  // 编译并渲染模板
  const compiledFunction = pug.compile(templateContent);
  return compiledFunction({
    componentData
  });
}