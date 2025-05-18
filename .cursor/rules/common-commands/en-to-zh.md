---
description: Convert English text to Chinese
globs:
alwaysApply: false
---

# English to Chinese Conversion Rules

## Description

This rule allows Cursor to translate English text to Chinese directly.

## Usage

Simply invoke this rule when you need to translate English text to Chinese. No external API is needed as Cursor will handle the translation.

## Example

English:

```
This is a sample text that needs to be translated into Chinese.
```

Chinese:

```
这是一个示例文本，需要被翻译成中文。
```

## Command

To use this translation rule in Cursor:

```
@en-to-zh
```

Then provide the English text you want to translate.

## Best Practices

- Specify whether you need Simplified Chinese (默认) or Traditional Chinese if necessary
- For technical terms, you may want to provide glossary references
- Review the translation for accuracy and cultural appropriateness
- Consider the target audience's regional preferences
