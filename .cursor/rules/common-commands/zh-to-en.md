---
description: Convert Chinese text to English
globs:
alwaysApply: false
---

# Chinese to English Conversion Rules

## Description

This rule allows Cursor to translate Chinese text to English directly.

## Usage

Simply invoke this rule when you need to translate Chinese text to English. No external API is needed as Cursor will handle the translation.

## Example

Chinese:

```
这是一个示例文本，需要被翻译成英文。
```

English:

```
This is a sample text that needs to be translated into English.
```

## Command

To use this translation rule in Cursor:

```
@zh-to-en
```

Then provide the Chinese text you want to translate.

## Best Practices

- For better translation quality, provide clear and complete sentences
- Include context when necessary
- Review the translation for accuracy
- For technical content, consider providing domain-specific information
