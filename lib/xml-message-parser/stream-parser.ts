export interface CompoderArtifactData {
  id: string
  title: string
}

export type ActionType = "file" | "shell" | "changeFile"

export interface BaseAction {
  content: string
}

export interface FileAction extends BaseAction {
  type: "file"
  fileName: string
}

export interface ChangeFileAction extends BaseAction {
  type: "changeFile"
  fileName: string
}

// error action
export interface ErrorAction extends BaseAction {
  type: "error"
}

export interface ShellAction extends BaseAction {
  type: "shell"
}

export type CompoderAction =
  | FileAction
  | ShellAction
  | ChangeFileAction
  | ErrorAction

export type CompoderActionData = CompoderAction | BaseAction

const ARTIFACT_TAG_OPEN = "<CompoderArtifact"
const ARTIFACT_TAG_CLOSE = "</CompoderArtifact>"
const ARTIFACT_ACTION_TAG_OPEN = "<CompoderAction"
const ARTIFACT_ACTION_TAG_CLOSE = "</CompoderAction>"

export interface ArtifactCallbackData extends CompoderArtifactData {
  messageId: string
}

export interface ActionCallbackData {
  artifactId: string
  messageId: string
  actionId: string
  action: CompoderAction
}

export type ArtifactCallback = (data: ArtifactCallbackData) => void
export type ActionCallback = (data: ActionCallbackData) => void

export interface ParserCallbacks {
  onArtifactOpen?: ArtifactCallback
  onArtifactClose?: ArtifactCallback
  onActionOpen?: ActionCallback
  onActionClose?: ActionCallback
  onActionContentUpdate?: (data: ActionCallbackData) => void
}

interface ElementFactoryProps {
  messageId: string
}

type ElementFactory = (props: ElementFactoryProps) => string

export interface StreamingMessageParserOptions {
  callbacks?: ParserCallbacks
  artifactElement?: ElementFactory
}

interface MessageState {
  position: number
  insideArtifact: boolean
  insideAction: boolean
  currentArtifact?: CompoderArtifactData
  currentAction: CompoderActionData
  actionId: number
}

export class StreamingMessageParser {
  private messages = new Map<string, MessageState>()

  constructor(private _options: StreamingMessageParserOptions = {}) {}

  parse(messageId: string, input: string) {
    // console.log('parse', messageId, input);
    let state = this.messages.get(messageId)
    if (!state) {
      state = {
        position: 0,
        insideAction: false,
        insideArtifact: false,
        currentAction: { content: "" },
        actionId: 0,
      }

      this.messages.set(messageId, state)
    }

    let output = ""
    let i = state.position
    let earlyBreak = false

    while (i < input.length) {
      // 在artifact内部
      if (state.insideArtifact) {
        const currentArtifact = state.currentArtifact!

        // 在action内部
        if (state.insideAction) {
          const closeIndex = input.indexOf(ARTIFACT_ACTION_TAG_CLOSE, i)
          const currentAction = state.currentAction

          // 检测到action的结束标签
          if (closeIndex !== -1) {
            // 先添加从当前位置到结束标签之前的内容
            const newContent = input.slice(i, closeIndex)
            currentAction.content += newContent

            // 如果有新内容，触发 onActionContentUpdate 回调
            if (newContent) {
              this._options.callbacks?.onActionContentUpdate?.({
                artifactId: currentArtifact.id,
                messageId,
                actionId: String(state.actionId - 1),
                action: currentAction as CompoderAction,
              })
            }

            let content = currentAction.content.trim()

            if ("type" in currentAction && currentAction.type === "file") {
              content += "\n"
            }

            currentAction.content = content

            this._options.callbacks?.onActionClose?.({
              artifactId: currentArtifact.id,
              messageId,
              actionId: String(state.actionId - 1),
              action: currentAction as CompoderAction,
            })

            state.insideAction = false
            state.currentAction = { content: "" }

            i = closeIndex + ARTIFACT_ACTION_TAG_CLOSE.length
          } else {
            // 如果遇到可能的结束标签开始
            if (input[i] === "<") {
              let j = i
              let potentialCloseTag = ""

              // 逐字符检查是否匹配 ARTIFACT_ACTION_TAG_CLOSE ('</promaxAction>')
              while (
                j < input.length &&
                potentialCloseTag.length < ARTIFACT_ACTION_TAG_CLOSE.length
              ) {
                potentialCloseTag += input[j]

                // 如果当前积累的字符串不是结束标签的开始部分，就退出检查
                if (!ARTIFACT_ACTION_TAG_CLOSE.startsWith(potentialCloseTag)) {
                  break
                }

                // 如果完全匹配到了结束标签，就退出整个处理
                if (potentialCloseTag === ARTIFACT_ACTION_TAG_CLOSE) {
                  break
                }

                j++
              }

              // 如果积累的字符串是结束标签的一部分，就不要继续处理
              if (ARTIFACT_ACTION_TAG_CLOSE.startsWith(potentialCloseTag)) {
                break
              }
            }

            // 不是结束标签的一部分，添加到内容中
            currentAction.content += input[i]
            i++

            // 触发 onActionContentUpdate 回调
            this._options.callbacks?.onActionContentUpdate?.({
              artifactId: currentArtifact.id,
              messageId,
              actionId: String(state.actionId - 1),
              action: currentAction as CompoderAction,
            })
          }
        } else {
          // 在action外部
          const actionOpenIndex = input.indexOf(ARTIFACT_ACTION_TAG_OPEN, i)
          const artifactCloseIndex = input.indexOf(ARTIFACT_TAG_CLOSE, i)

          // 检测到action的开始标签 && 未检测到artifact的结束标签
          if (
            actionOpenIndex !== -1 &&
            (artifactCloseIndex === -1 || actionOpenIndex < artifactCloseIndex)
          ) {
            const actionEndIndex = input.indexOf(">", actionOpenIndex)

            if (actionEndIndex !== -1) {
              state.insideAction = true

              state.currentAction = this.parseActionTag(
                input,
                actionOpenIndex,
                actionEndIndex,
              )

              this._options.callbacks?.onActionOpen?.({
                artifactId: currentArtifact.id,
                messageId,
                actionId: String(state.actionId++),
                action: state.currentAction as CompoderAction,
              })

              i = actionEndIndex + 1
            } else {
              break
            }
          } else if (artifactCloseIndex !== -1) {
            this._options.callbacks?.onArtifactClose?.({
              messageId,
              ...currentArtifact,
            })

            state.insideArtifact = false
            state.currentArtifact = undefined

            i = artifactCloseIndex + ARTIFACT_TAG_CLOSE.length
          } else {
            break
          }
        }
      } else if (input[i] === "<" && input[i + 1] !== "/") {
        // 在artifact外部，检测到新的artifact的开始标签
        let j = i
        let potentialTag = ""

        while (
          j < input.length &&
          potentialTag.length < ARTIFACT_TAG_OPEN.length
        ) {
          potentialTag += input[j]

          if (potentialTag === ARTIFACT_TAG_OPEN) {
            const nextChar = input[j + 1]

            if (nextChar && nextChar !== ">" && nextChar !== " ") {
              output += input.slice(i, j + 1)
              i = j + 1
              break
            }

            const openTagEnd = input.indexOf(">", j)

            if (openTagEnd !== -1) {
              const artifactTag = input.slice(i, openTagEnd + 1)

              const artifactTitle = this.extractAttribute(
                artifactTag,
                "title",
              ) as string
              const artifactId = this.extractAttribute(
                artifactTag,
                "id",
              ) as string

              if (!artifactTitle) {
              }

              if (!artifactId) {
              }

              state.insideArtifact = true

              const currentArtifact = {
                id: artifactId,
                title: artifactTitle,
              } satisfies CompoderArtifactData

              state.currentArtifact = currentArtifact

              this._options.callbacks?.onArtifactOpen?.({
                messageId,
                ...currentArtifact,
              })

              const artifactFactory =
                this._options.artifactElement ?? createArtifactElement

              output += artifactFactory({ messageId })

              i = openTagEnd + 1
            } else {
              earlyBreak = true
            }

            break
          } else if (!ARTIFACT_TAG_OPEN.startsWith(potentialTag)) {
            output += input.slice(i, j + 1)
            i = j + 1
            break
          }

          j++
        }

        if (j === input.length && ARTIFACT_TAG_OPEN.startsWith(potentialTag)) {
          break
        }
      } else {
        // 在artifact外部，检测到非标签字符
        output += input[i]
        i++
      }

      if (earlyBreak) {
        break
      }
    }

    state.position = i

    return output
  }

  reset() {
    this.messages.clear()
  }

  private parseActionTag(
    input: string,
    actionOpenIndex: number,
    actionEndIndex: number,
  ) {
    const actionTag = input.slice(actionOpenIndex, actionEndIndex + 1)

    const actionType = this.extractAttribute(actionTag, "type") as ActionType

    const actionAttributes = {
      type: actionType,
      content: "",
    }

    if (actionType === "file" || actionType === "changeFile") {
      const fileName = this.extractAttribute(actionTag, "fileName") as string

      if (!fileName) {
      }

      ;(actionAttributes as FileAction).fileName = fileName
    } else if (actionType !== "shell") {
    }

    return actionAttributes as FileAction | ShellAction
  }

  private extractAttribute(
    tag: string,
    attributeName: string,
  ): string | undefined {
    const match = tag.match(new RegExp(`${attributeName}="([^"]*)"`, "i"))
    return match ? match[1] : undefined
  }
}

const createArtifactElement: ElementFactory = props => {
  const elementProps = [
    'class="__CompoderArtifact__"',
    ...Object.entries(props).map(([key, value]) => {
      return `data-${camelToDashCase(key)}=${JSON.stringify(value)}`
    }),
  ]

  return `<div ${elementProps.join(" ")}></div>`
}

function camelToDashCase(input: string) {
  return input.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
}
