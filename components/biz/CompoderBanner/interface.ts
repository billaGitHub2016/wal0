export interface CompoderBannerProps {
  title?: string
  subtitle?: string
  description?: string
  showGithubStar?: boolean
  githubUrl?: string
  tagline?: string
  className?: string
  cyberpunkLevel?: "low" | "medium" | "high" // 控制赛博朋克效果的强度
  matrixDensity?: number // 控制矩阵字符的密度，默认50
  glowColor?: string // 自定义发光效果的颜色
  actionButtonLabel?: string // 自定义按钮文本
  cornerStyle?: "squared" | "angled" | "rounded" // 控制角落风格
  colorTheme?: "blue" | "purple" | "blueviolet" // 颜色主题，默认为蓝紫混合(blueviolet)
  enableFlickerEffect?: boolean // 是否启用闪烁效果
  enableNeonTextEffect?: boolean // 是否启用霓虹文字效果
}
